 const TreatmentSuper =require('./TreatmentSuper');
  module.exports =class Treatment_1 extends TreatmentSuper {

    constructor(file_path) { // hospital-specific header  

        //  PatientID	StartDate	EndDate	Active	DisplayName	Diagnoses	TreatmentLine	CyclesXDays	TreatmentID
         // const [treatment_id, patient_id, status,start_date,end_date, display_name,protocol_id,diagnoses,treatment_line,number_of_cycles,cycles_days,days_per_cycle]=header;
         super(['TreatmentID', 'PatientID', 'Active',  'StartDate',  'EndDate','DisplayName',null,'Diagnoses','TreatmentLine',null, 'CyclesXDays',null ],file_path);
    
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
            this.setDaysPerCycle ();
            await super.insert()
 
        } catch (error) {
               console.log(`ERROR : ${error}`);
        }
      
    }

}

 