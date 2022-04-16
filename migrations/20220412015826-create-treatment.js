'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('treatment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      treatment_id: {
        type: Sequelize.STRING
      },
      patient_id: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('active','inactive','ordered'),
      },
      start_date: {
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
      },
      display_name: {
        type: Sequelize.STRING
      },
      diagnoses: {
        type: Sequelize.STRING
      },

      protocol_id: {
        type: Sequelize.INTEGER
      },
  
      treatment_line: {
        type: Sequelize.STRING
      },

      number_of_cycles:{
        type: Sequelize.INTEGER

      },
      cycles_days:{
        type: Sequelize.STRING

      },
     
      days_per_cycle: {
        type: Sequelize.INTEGER
      },
      // patient_record_id:{FOREN KEY to corrosponding hospital patient // 
      //   type: Sequelize.INTEGER,
      //     references: {
      //       model: 'patient', // name of Target model
      //       key: 'id', // key in Target model that we're referencing
      //     },
      //     onUpdate: 'CASCADE',
      //     onDelete: 'SET NULL',

      // }
 
    },{  timestamps: false });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('treatment');
  }
};