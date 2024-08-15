#!/bin/bash

echo "#############################################"
echo "######### PitterPatter Setup Script #########"
echo "#############################################"

if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi

cd ../../
PWD=$(pwd)

echo "Do you want to resume from a specific step? (Y/n)"
read -r resume
if [ -z "$resume" ] || [[ "$resume" =~ ^[Yy]$ ]]; then
  echo "Enter the step number to resume from:"
  echo "1. Change data(e.g. email, domain, db, kakao, email service, jwt, 2fa) in the scripts directory"
  echo "2. Install k3s, docker, nodejs"
  echo "3. Deploy the MySQL database and Redis"
  echo "4. Deploy Certificate-related resources"
  echo "5. Build the backend image by Dockerfile and deploy reference to the image"
  echo "6. Run the NodeJS Socket.IO server"
  read -r step
  if ! [[ "$step" =~ ^[1-5]+$ ]]; then
    echo "Please enter a valid step number"
    exit 1
  fi
else
  step=1
fi

if [ "$step" -le 1 ]; then
  echo "#############################################"
  echo "#########           Step 1          #########"
  echo "#############################################"

  echo "Enter your email for letsencrypt:"
  read email
  if [ -z "$email" ]; then
    echo "Please enter a valid email"
    exit
  fi

  echo "Enter your domain for letsencrypt:"
  read domain
  if [ -z "$domain" ]; then
    echo "Please enter a valid domain"
    exit
  fi

  sed -i "s/shell_script_will_replace_this_email/$email/g" $PWD/S11P12E204/exec/scripts/letsencrypt-clusterissuer.yaml
  sed -i "s/shell_script_will_replace_this_domain/$domain/g" $PWD/S11P12E204/exec/scripts/pitter-patter-cert.yaml
  sed -i "s/shell_script_will_replace_this_domain/$domain/g" $PWD/S11P12E204/exec/scripts/ingress-pitter-patter.yaml
  sed -i "s/https:\/\/socket.picel.net/http:\/\/$domain:5000/g" $PWD/S11P12E204/frontend/pitter-patter/src/pages/Game/multiApi.js

  echo "Enter your new MySQL username:"
  read db_username

  echo "Enter your new MySQL password:"
  read -s db_password

  if [ -z "$db_username" ] || [ -z "$db_password" ]; then
    echo "Please enter a valid username and password"
    exit
  fi

  sed -i "s/shell_script_will_replace_this_db_username/$db_username/g" $PWD/S11P12E204/exec/scripts/mysql.yaml
  sed -i "s/shell_script_will_replace_this_db_username/$db_username/g" $PWD/S11P12E204/exec/scripts/application.yaml

  sed -i "s/shell_script_will_replace_this_db_password/$db_password/g" $PWD/S11P12E204/exec/scripts/mysql.yaml
  sed -i "s/shell_script_will_replace_this_db_password/$db_password/g" $PWD/S11P12E204/exec/scripts/application.yaml

  echo "Enter your Kakao client id:"
  read kakao_client_id

  echo "Enter your Kakao client secret:"
  read -s kakao_client_secret

  if [ -z "$kakao_client_id" ] || [ -z "$kakao_client_secret" ]; then
    echo "Please enter a valid Kakao client id and secret"
    exit
  fi

  sed -i "s/shell_script_will_replace_this_kakao_client_id/$kakao_client_id/g" $PWD/S11P12E204/exec/scripts/application.yaml

  sed -i "s/shell_script_will_replace_this_kakao_client_secret/$kakao_client_secret/g" $PWD/S11P12E204/exec/scripts/application.yaml

  echo "Enter your host for the email service:"
  read email_host

  echo "Enter your port for the email service:"
  read email_port

  echo "Enter your username for the email service:"
  read email_username

  echo "Enter your password for the email service:"
  read -s email_password

  if [ -z "$email_host" ] || [ -z "$email_port" ] || [ -z "$email_username" ] || [ -z "$email_password" ]; then
    echo "Please enter a valid email information"
    exit
  fi

  sed -i "s/shell_script_will_replace_this_email_host/$email_host/g" $PWD/S11P12E204/exec/scripts/application.yaml

  sed -i "s/shell_script_will_replace_this_email_port/$email_port/g" $PWD/S11P12E204/exec/scripts/application.yaml

  sed -i "s/shell_script_will_replace_this_email_username/$email_username/g" $PWD/S11P12E204/exec/scripts/application.yaml

  sed -i "s/shell_script_will_replace_this_email_password/$email_password/g" $PWD/S11P12E204/exec/scripts/application.yaml

  echo "Do you want to enable email auth? (Y/n)"
  read -r email_auth

  if [ -z "$email_auth" ] || [[ "$email_auth" =~ ^[Yy]$ ]]; then
    sed -i "s/shell_script_will_replace_this_email_auth/true/g" $PWD/S11P12E204/exec/scripts/application.yaml
  else
    sed -i "s/shell_script_will_replace_this_email_auth/false/g" $PWD/S11P12E204/exec/scripts/application.yaml
  fi

  echo "Do you want to enable email starttls? (Y/n)"
  read -r email_starttls

  if [ -z "$email_starttls" ] || [[ "$email_starttls" =~ ^[Yy]$ ]]; then
    sed -i "s/shell_script_will_replace_this_email_starttls/true/g" $PWD/S11P12E204/exec/scripts/application.yaml
  else
    sed -i "s/shell_script_will_replace_this_email_starttls/false/g" $PWD/S11P12E204/exec/scripts/application.yaml
  fi

  echo "Do you want to enable email starttls required? (Y/n)"
  read -r email_starttls_required

  if [ -z "$email_starttls_required" ] || [[ "$email_starttls_required" =~ ^[Yy]$ ]]; then
    sed -i "s/shell_script_will_replace_this_email_starttls_required/true/g" $PWD/S11P12E204/exec/scripts/application.yaml
  else
    sed -i "s/shell_script_will_replace_this_email_starttls_required/false/g" $PWD/S11P12E204/exec/scripts/application.yaml
  fi

  echo "Enter your JWT secret:"
  read jwt_secret

  if [ -z "$jwt_secret" ]; then
    echo "Please enter a valid JWT secret"
    exit
  fi

  sed -i "s/shell_script_will_replace_this_jwt_secret/$jwt_secret/g" $PWD/S11P12E204/exec/scripts/application.yaml

  echo "Enter your random 2fa:"
  read random_2fa

  if [ -z "$random_2fa" ]; then
    echo "Please enter a valid random 2fa"
    exit
  fi

  sed -i "s/shell_script_will_replace_this_random_2fa/$random_2fa/g" $PWD/S11P12E204/exec/scripts/application.yaml


  mv $PWD/S11P12E204/exec/scripts/application.yaml $PWD/S11P12E204/backend/pitterpatter/src/main/resources/application.yaml

  mv $PWD/S11P12E204/exec/scripts/Dockerfile $PWD/S11P12E204/backend/pitterpatter/Dockerfile

  echo "Step 1: Done"
fi

if [ "$step" -le 2 ]; then
  echo "#############################################"
  echo "#########           Step 2          #########"
  echo "#############################################"
  if ! command -v k3s &> /dev/null; then
    curl -sfL https://get.k3s.io | sh -
    systemctl enable k3s
  fi

  if ! command -v docker &> /dev/null; then
    apt update
    apt install apt-transport-https ca-certificates curl gnupg-agent software-properties-common -y
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    apt update
    apt install docker-ce docker-ce-cli containerd.io -y
    systemctl enable docker
    systemctl start docker
  fi

  docker_status=$(systemctl is-active docker)
  if [ "$docker_status" != "active" ]; then
    echo "docker is not running. Exiting..."
    exit
  fi

  # install nodejs 18
  if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
  fi

  node_status=$(node -v)
  if [ -z "$node_status" ]; then
    echo "node is not installed. Exiting..."
    exit
  fi

  echo "Step 2: Done"
fi

if [ "$step" -le 3 ]; then
  echo "#############################################"
  echo "#########           Step 3          #########"
  echo "#############################################"

  kubectl create namespace pitter-patter

  kubectl apply -f $PWD/S11P12E204/exec/scripts/mysql.yaml
  kubectl apply -f $PWD/S11P12E204/exec/scripts/redis.yaml

  kubectl wait --namespace=pitter-patter --for=condition=ready pod --selector=app=mysql --timeout=120s
  kubectl wait --namespace=pitter-patter --for=condition=ready pod --selector=app=redis --timeout=120s

  mysql_status=$(kubectl get pods -n pitter-patter | grep mysql | awk '{print $3}')
  redis_status=$(kubectl get pods -n pitter-patter | grep redis | awk '{print $3}')

  if [ "$mysql_status" != "Running" ] || [ "$redis_status" != "Running" ]; then
    echo "MySQL or Redis is not running. Exiting..."
    exit
  fi

  echo "Step 3: Done"
fi

if [ "$step" -le 4 ]; then
  echo "#############################################"
  echo "#########           Step 4          #########"
  echo "#############################################"

  kubectl apply -f $PWD/S11P12E204/exec/scripts/letsencrypt-clusterissuer.yaml
  kubectl apply -f $PWD/S11P12E204/exec/scripts/pitter-patter-cert.yaml

  kubectl wait --for=condition=ready clusterissuer letsencrypt --timeout=120s
  kubectl wait --for=condition=ready certificate pitter-patter-cert --timeout=120s

  clusterissuer_status=$(kubectl get clusterissuer letsencrypt | grep letsencrypt | awk '{print $2}')
  certificate_status=$(kubectl get certificate pitter-patter-cert | grep pitter-patter-cert | awk '{print $2}')

  if [ "$clusterissuer_status" != "Ready" ] || [ "$certificate_status" != "Ready" ]; then
    echo "ClusterIssuer or Certificate is not ready. Exiting..."
    exit
  fi

  echo "Step 4: Done"
fi

if [ "$step" -le 5 ]; then
  echo "#############################################"
  echo "#########           Step 5          #########"
  echo "#############################################"

  echo "Enter your DockerHub username:"
  read username
  if [ -z "$username" ]; then
    echo "Please enter a valid username"
    exit
  fi

  echo "Enter your DockerHub password:"
  read -s password
  if [ -z "$password" ]; then
    echo "Please enter a valid password"
    exit
  fi

  echo "$password" | docker login -u "$username" --password-stdin

  cd $PWD/S11P12E204/backend/pitterpatter
  docker build -t ssafy-common-backend .
  docker tag ssafy-common-backend $username/ssafy-common-backend:latest
  docker push $username/ssafy-common-backend

  cd ../../
  cd $PWD/exec/scripts
  sed -i "s/shell_script_will_replace_this_username/$username/g" deployment-backend.yaml
  kubectl apply -f deployment-backend.yaml

  kubectl wait --namespace=pitter-patter --for=condition=ready pod --selector=app=backend --timeout=120s

  kubectl apply -f ingress-pitter-patter.yaml

  echo "Step 5: Done"
fi

if [ "$step" -le 6 ]; then
  echo "#############################################"
  echo "#########           Step 6          #########"
  echo "#############################################"

  cd $PWD/S11P12E204/backend/socket
  npm install
  nohup node server.js &
  disown -h

  echo "Step 6: Done"
fi

echo "#############################################"
echo "######### PitterPatter Setup Script #########"
echo "#########          Finished         #########"
echo "#############################################"