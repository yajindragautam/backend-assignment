const env = require('dotenv');
env.config();
module.exports = {
  development : {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      useUTC: false
    },
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
      acquire: 20000
    }
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      useUTC: false
    },
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
      acquire: 20000
    }
  },

}