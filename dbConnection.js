const Sequelize = require('sequelize');
const config = require('./config/config.json');  // 외부 설정 파일 로드

const env = process.env.NODE_ENV || 'development';  // NODE_ENV로 환경 설정 구분
const dbConfig = config[env];  // 환경별 데이터베이스 설정

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect
});

module.exports = sequelize;
