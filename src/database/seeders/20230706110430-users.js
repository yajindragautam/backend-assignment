'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
   
    await queryInterface.bulkInsert('Users', [{
      first_name: "Yajindra",
      last_name: "Gautam",
      email: "yaji@gmail.com",
      address:"Tikathali",
      nationality:"Nepal",
      password: "123456",
      verified: true,

      createdAt:DataTypes.fn('now'),
      updatedAt:DataTypes.fn('now'),
      deletedAt:DataTypes.fn('now'),
    }], {});
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
