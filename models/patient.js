'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Patient.init({
    patient_id: DataTypes.INTEGER,
    mrn: DataTypes.INTEGER,
    patient_dob: DataTypes.DATE,
    is_deceased: DataTypes.STRING,

    dod_ts: DataTypes.DATE,
    gender: DataTypes.ENUM('male-to-female','trans woman','transgender male'),
    sex: DataTypes.STRING,

    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    
    address_01: DataTypes.STRING,
    address_02: DataTypes.STRING,
    address_03: DataTypes.STRING,
    
    zip_code: DataTypes.STRING,
    Last_modified_date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Patient',
    tableName: 'patient',
    timestamps:false

  });
  return Patient;
};