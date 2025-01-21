const express = require('express');
const sequelize = require('../dbconnection');  // 데이터베이스 연결 파일 로드
const apiRouter = require('./routes/routes');
const dotenv = require('dotenv'); // .env 파일에서 환경 변수 로드
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json()); // JSON 요청을 처리할 수 있도록 설정
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use('/api', apiRouter); // 모든 /api 요청을 apiRouter로 보냄

(async () => {
  try {
    await sequelize.authenticate();  // 데이터베이스 연결 테스트
    console.log('Connection has been established successfully.');

    // 서버 초기화 및 연결 후 실행
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
