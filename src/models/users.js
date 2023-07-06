'use strict';

const bcrypt = require('bcryptjs');
// const sequelizePaginate = require('sequelize-paginate');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:123@localhost:5432/backendAssignment');

const Users = sequelize.define('Users', {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  first_name: {type: DataTypes.STRING},
  last_name: {type: DataTypes.STRING},
  email: {type: DataTypes.STRING, unique: true, index: true},
  address:{type:String, defaultValue:''},
  nationality:{type:String, defaultValue:''},
  password: {type: String},
  resetPasswordToken: {type: String},
  resetPasswordExpires: {type: Date},
  verified: {type: Boolean, default: true},
  last_accessed_ip: {type: String, default: ''},

  createdAt:{type:Date, defaultValue:sequelize.fn('now')},
  updatedAt:{type:Date, defaultValue:sequelize.fn('now')},
  deletedAt:{type:Date, defaultValue:sequelize.fn('now')},
}, {
  // Other model options go here

});

module.exports = Users;

