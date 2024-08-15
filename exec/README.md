# 배포 가이드

이 문서는 Pitter-Patter 프로젝트를 배포하는 절차에 대해 설명합니다. 

백엔드 서버는 auto-setup.sh bash 스크립트에 따라 자동 진행되나, 프론트엔드 배포는 수동으로 진행해야 합니다.

## 주의사항
- scripts 디렉토리의 파일들을 임의로 수정하지 마십시오.
- 자동 설치 스크립트의 요구사항들을 숙지하시고, 모든 요구 데이터들을 빠짐없이 입력하십시오.

## 설치 서버 요구사항
- Ubuntu (22.04 LTS 버전 권장)
- X86_64 아키텍처 권장 (이외에는 확인되지 않음)
- 최소 2GB RAM
- 최소 2 Core CPU
- 최소 10GB Disk
- 방화벽 비활성화, 혹은 80, 443, 5000 포트 허용

## 설치 과정에서 요구되는 데이터

### 인증서 발급 정보
- 도메인 이름
- 이메일 주소

### 데이터베이스 정보
- MySQL 사용자 이름
- MySQL 사용자 비밀번호

### Kakao API 정보
- Kakao Client ID
- Kakao Client Secret

### SMTP 정보
- SMTP 서버 주소
- SMTP 서버 포트
- SMTP 사용자 이름
- SMTP 사용자 비밀번호
- 인증 활성화 여부
- StartTLS 활성화 여부
- StartTLS 필수 여부

### Docker Hub 정보
- Docker Hub 사용자 이름
- Docker Hub 비밀번호

### 기타 정보
- JWT Secret Key
- Random 2FA Secret Key

## 배포 절차
1. 타겟 서버에서 해당 프로젝트를 클론합니다.
2. root 사용자로 로그인합니다. (sudo su)
3. auto-setup.sh 파일에 실행 권한을 부여합니다. (chmod +x auto-setup.sh)
4. auto-setup.sh 파일을 실행합니다. (./auto-setup.sh)
5. 가이드에 따라 정보를 입력하고, 설치를 진행합니다.
6. 프론트엔드는 필요에 따라 S3에 업로드하거나, 타 서버에 빌드하여 배포합니다.