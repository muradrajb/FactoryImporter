const PatientSuper =require('./PatientSuper');
module.exports =class Patient_2 extends PatientSuper {

    constructor(file_path) { // Patient-specific header  
        //PatientId	MRN	PatientDOB	IsPatientDeceased	DeathDate	LastName	FirstName	Gender	Sex	AddressLine	AddressCity	AddressState	AddressZipCode
        // const [patient_id, mrn, patient_dob,  is_deceased,   dod_ts, gender ,sex    ,first_name,last_name,address_01,address_02,address_03,zip_code,Last_modified_date]=header;
         super(['PatientID','MRN', 'PatientDOB','IsPatientDeceased',   'DeathDate','Gender','Sex',  'FirstName','LastName','AddressLine', 'AddressCity','AddressState','AddressZipCode','LastModifiedDate',null],file_path);
    
    }

    setDaysPerCycle( ) {
        this.data.forEach( ({days_per_cycle,end_date,start_date},index) => {
            if ( !days_per_cycle &&  end_date &&  start_date){
                const diffTime =  Math.abs(end_date - start_date)
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                this.data[index].days_per_cycle = diffDays
            }
            else{
                this.data[index].days_per_cycle = 2222
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

 