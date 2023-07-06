'use strict';

const bcrypt = require('bcryptjs');
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) =>{
    let moduleDefination = {
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
    }

    let modelOptions = {
        hooks: {
          // afterFind: imageUrl,
          beforeUpdate: hashPassword,
          beforeCreate: createHashPassword
        }
    };
    
    async function hashPassword(user) {
      if (user.changed('password')) {
        user.password = generateHash(user.password);
      }
    }
    async function createHashPassword(user) {
      user.password = generateHash(user.password);
    }

    let generateHash = (password) => {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    };

    return  sequelize.define('Users', modelDefinition,modelOptions);
}


