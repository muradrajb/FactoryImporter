'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HospitalLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HospitalLog.init({
    file_name: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
   }, {
    sequelize,
    modelName: 'HospitalLog',
    tableName:'hospital_log'
  });
  return HospitalLog;
};