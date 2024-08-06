pipeline {
    agent any

    tools {
        nodejs 'nodejs'
        dockerTool 'docker'
    }

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials-id')
        DEPLOY_SERVER_CREDENTIALS = credentials('deploy-server-credentials-id')
        FTP_SERVER = credentials('ftp-server')
        DEPLOY_SERVER_USER = credentials('deploy-server-user')
        DEPLOY_SERVER_HOST = credentials('deploy-server-host')
        JASYPT_ENCRYPTOR_PASSWORD = credentials('jasypt-encrypt-password')
    }

    stages {
    //   stage('Build Frontend') {
    //     steps {
    //       script {
    //         dir('frontend/pitter-patter') {
    //           sh 'npm install'
    //           sh 'npm run build'
    //         }
    //       }
    //     }
    //     post {
    //       success {
    //         archiveArtifacts artifacts: 'frontend/dist/**', allowEmptyArchive: true
    //       }
    //     }
    //   }

    // stage('Deploy Frontend') {
    //     steps {
    //       script {
    //         withCredentials([usernamePassword(credentialsId: 'ftp-server-credentials-id', passwordVariable: 'FTP_PASSWORD', usernameVariable: 'FTP_USERNAME')]) {
    //           sh """
    //                     lftp -c "set ftp:ssl-allow no; set ftp:passive-mode yes; open -u ${FTP_USERNAME},${FTP_PASSWORD} ${FTP_SERVER}; mirror -R frontend/dist/ ./; bye"
    //                   """
    //         }
    //       }
    //     }
    // }

    stage('Build Backend') {
      steps {
        script {
          dir('backend/pitterpatter') {
            sh 'sed -i "s/ENV JASYPT_ENCRYPTOR_PASSWORD=.*/ENV JASYPT_ENCRYPTOR_PASSWORD=${JASYPT_ENCRYPTOR_PASSWORD}/" Dockerfile'
            sh """
              docker build -t ssafy-common-backend .
              docker login -u ${DOCKER_HUB_CREDENTIALS_USR} -p ${DOCKER_HUB_CREDENTIALS_PSW}
              docker tag ssafy-common-backend ${DOCKER_HUB_CREDENTIALS_USR}/ssafy-common-backend:latest
              docker push ${DOCKER_HUB_CREDENTIALS_USR}/ssafy-common-backend:latest
            """
          }
        }
      }
    }

    stage('Deploy Backend') {
      steps {
        script {
          withCredentials([sshUserPrivateKey(credentialsId: 'deploy-server-credentials-id', keyFileVariable: 'DEPLOY_KEY')]) {
            def deploy_script = sh(
              script: 'cat backend/pitterpatter/k8s/deployment.yaml',
              returnStdout: true
            ).trim()

            sh """
              ssh -i ${DEPLOY_KEY} ${DEPLOY_SERVER_USER}@${DEPLOY_SERVER_HOST} "docker login -u ${DOCKER_HUB_CREDENTIALS_USR} -p ${DOCKER_HUB_CREDENTIALS_PSW}"
              ssh -i ${DEPLOY_KEY} ${DEPLOY_SERVER_USER}@${DEPLOY_SERVER_HOST} "docker pull ${DOCKER_HUB_CREDENTIALS_USR}/ssafy-common-backend:latest"
              ssh -i ${DEPLOY_KEY} ${DEPLOY_SERVER_USER}@${DEPLOY_SERVER_HOST} "docker tag ${DOCKER_HUB_CREDENTIALS_USR}/ssafy-common-backend:latest ssafy-common-backend"

              ssh -i ${DEPLOY_KEY} ${DEPLOY_SERVER_USER}@${DEPLOY_SERVER_HOST} "
              echo ${deploy_script} > /tmp/deployment-backend.yaml;
              kubectl apply -f /tmp/deployment-backend.yaml -n pitter-patter;
              if kubectl get deployment backend -n pitter-patter; then
                  echo "deployment exists"
                  kubectl rollout restart deployment backend -n pitter-patter;
              fi;"

              ssh -i ${DEPLOY_KEY} ${DEPLOY_SERVER_USER}@${DEPLOY_SERVER_HOST} "kubectl apply -f /tmp/cors-middleware.yaml -n pitter-patter"
              ssh -i ${DEPLOY_KEY} ${DEPLOY_SERVER_USER}@${DEPLOY_SERVER_HOST} "kubectl apply -f /tmp/ingress-pitter-patter.yaml -n pitter-patter"
            """
          }
        }
      }
    }

    stage('Clean up Directory') {
      steps {
        script {
          sh '''
            rm -rf ./*
            rm -rf .git
            rm .gitignore
          '''
        }
      }
    }
  }
}
