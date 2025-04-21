# Node.js 베이스 이미지 사용
FROM node:22

# 컨테이너 안에 작업 디렉토리 만들기
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 나머지 소스 복사
COPY . .

# 서버가 열릴 포트 지정
EXPOSE 5425

# 서버 실행 명령어
CMD ["npm", "start"]
