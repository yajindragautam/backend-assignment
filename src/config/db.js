require("dotenv").config();
const connectUrl = process.env.DBURL;
const Sequelize = require('sequelize'), postgres = new Sequelize(connectUrl, {
  logging: false,
  dialect: 'postgres',
  connectionTimeout: 0,
  dialectOptions: {
    useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: function (field, next) { // for reading from database
      if (field.type === 'DATETIME') {
        return field.string();
      }
      return next();
    }
  },
  timezone: 'Asia/Kathmandu', //for writing to database
});
postgres.authenticate().then(() => {
  console.log('Database connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
    
module.exports = {postgres};