const express = require('express');
const sequelize = require('../dbconnection');  // 데이터베이스 연결 파일 로드

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

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
