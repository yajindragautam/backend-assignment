'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface,DataTypes) {
    await queryInterface.createTable('Users',     { 
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      first_name: {type: DataTypes.STRING},
      last_name: {type: DataTypes.STRING},
      email: {type: DataTypes.STRING, unique: true, index: true},
      address:{type:DataTypes.STRING, defaultValue:''},
      nationality:{type:DataTypes.STRING, defaultValue:''},
      password: {type: DataTypes.STRING, require:true},
      resetPasswordToken: {type: DataTypes.STRING},
      resetPasswordExpires: {type: DataTypes.DATE},
      verified: {type: DataTypes.BOOLEAN, defaultValue: true},
      last_accessed_ip: {type: DataTypes.STRING, defaultValue: ''},

      createdAt:{type:DataTypes.DATE, defaultValue:DataTypes.fn('now')},
      updatedAt:{type:DataTypes.DATE, defaultValue:DataTypes.fn('now')},
      deletedAt:{type:DataTypes.DATE, defaultValue:DataTypes.fn('now')},

     }
    );
     
  },

  async down (queryInterface) {
    await queryInterface.dropTable('Users');     
  }
};
