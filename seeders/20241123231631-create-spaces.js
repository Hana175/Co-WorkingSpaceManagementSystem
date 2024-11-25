'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.createTable("Spaces", {
     id: {
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull: false,
     },
     name: {
       type: Sequelize.STRING,
       allowNull: false,
     },
     type: {
       type: Sequelize.ENUM("private office", "meeting room", "hot desk"), // Replace with foreign key if using a separate SpaceType table
       allowNull: false,
     },
     capacity: {
       type: Sequelize.INTEGER,
       allowNull: false,
     },
     pricePerHour: {
       type: Sequelize.DECIMAL(10, 2),
       allowNull: false,
     },
     availability: {
       type: Sequelize.BOOLEAN,
       defaultValue: true,
     },
     createdAt: {
       type: Sequelize.DATE,
       allowNull: false,
       defaultValue: Sequelize.fn("NOW"),
     },
     updatedAt: {
       type: Sequelize.DATE,
       allowNull: false,
       defaultValue: Sequelize.fn("NOW"),
     },
   });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.dropTable("Spaces");
  }
};
