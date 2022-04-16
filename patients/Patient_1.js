 const PatientSuper =require('./PatientSuper');
  module.exports =class Patient_1 extends PatientSuper {

    constructor(file_path) { // Patient-specific header  

        // PatientID  MRN PatientDOB	IsDeceased	DOD_TS	LastName	FirstName	Gender	Sex	Address	City	State	ZipCode	LastModifiedDate
        // const [patient_id, mrn, patient_dob,  is_deceased,  dod_ts,  gender ,sex    ,first_name,last_name,address_01,address_02,address_03,zip_code,Last_modified_date]=header;
         super(['PatientID', 'MRN', 'PatientDOB', 'IsDeceased','DOD_TS','Gender','Sex','FirstName','LastName','Address', 'City','State','ZipCode','LastModifiedDate' ],file_path);
    
        }

    setDaysPerCycle( ) {
        this.data.forEach( ({days_per_cycle,end_date,start_date},index) => {
            if ( !days_per_cycle &&  end_date &&  start_date){
                const diffTime =  Math.abs(end_date - start_date)
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                this.data[index].days_per_cycle = diffDays
            }
            else{
                this.data[index].days_per_cycle = 11111
            }
        })
    }

    async init() {
        try {
            await super.importFile();
            await super.processRows();
            await super.insert()
        } catch (error) {
               console.log(`ERROR : ${error}`);
        }
    }

}

 