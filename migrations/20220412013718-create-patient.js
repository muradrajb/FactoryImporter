'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('patient', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patient_id: {
        type: Sequelize.INTEGER
      },
      mrn: {
        type: Sequelize.INTEGER
      },
      patient_dob: {
        type: Sequelize.DATE
      },
      is_deceased: {
        type: Sequelize.STRING
      },
      dod_ts: {
        type: Sequelize.DATE
      },
      gender: {
        type: Sequelize.ENUM('male-to-female','trans woman','transgender male'),
          },
      sex: {
        type: Sequelize.STRING
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      address_01: {
        type: Sequelize.STRING
      },
      address_02: {
        type: Sequelize.STRING
      },
      address_03: {
        type: Sequelize.STRING
      },
      zip_code: {
        type: Sequelize.STRING
      },
      Last_modified_date: {
        type: Sequelize.DATE
      }
    },{  timestamps: false });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('patient');
  }
};