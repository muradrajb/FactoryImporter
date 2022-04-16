'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Treatment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Treatment.init({
    treatment_id: DataTypes.STRING,
    patient_id: DataTypes.INTEGER,
    status: DataTypes.ENUM('active','inactive','ordered'),
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    display_name: DataTypes.STRING,
    diagnoses: DataTypes.STRING,
    protocol_id: DataTypes.INTEGER,
    treatment_line: DataTypes.STRING,
    number_of_cycles:  DataTypes.INTEGER ,
    cycles_days: DataTypes.STRING,
    days_per_cycle:   DataTypes.INTEGER
     


  }, {
    sequelize,
    modelName: 'Treatment',
    tableName: 'treatment',
    timestamps:false

  });
  return Treatment;
};