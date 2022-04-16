 const fs = require("fs");
const fastcsv = require("fast-csv");
const { Treatment } = require('../models')
  
module.exports = class TreatmentSuper { 
    schema={}
    constructor( header,file_path) {
        const [treatment_id,patient_id,status,start_date,end_date,display_name,protocol_id,diagnoses,treatment_line,number_of_cycles,cycles_days,days_per_cycle]=header;
            this.schema.treatment_id=treatment_id;
            this.schema.patient_id=patient_id ;
            this.schema.status =status;
            this.schema.start_date=start_date;
            this.schema.end_date=end_date;
            this.schema.display_name=display_name;
            this.schema.protocol_id=protocol_id;
            this.schema.diagnoses=diagnoses;
            this.schema.treatment_line=treatment_line;
            this.schema.number_of_cycles=number_of_cycles;
            this.schema.cycles_days=cycles_days;
            this.schema.days_per_cycle=days_per_cycle;

            this.file_path=file_path;
            this.data=[]
         }

    importFile ( ) {
    return new Promise((resolve, reject) => {

            fs.createReadStream(this.file_path)
            .on("error", (error) => {
                reject(error);
            })  
            .pipe(fastcsv.parse({
                headers: true
            })) // causion:  pipe will not pass error 
            .on("error", (error) => {

                reject(error);
            })
            .on("data", (row) => {
                this.data.push(row);
            }) 
            .on("end", () => {
                resolve(this.data);
                // const processedRows= processRows(_model, schema, data )
                // _model.bulkCreate(processedRows)
                //   .then(() =>  console.log(`\n data has been insertd successfully \n`))
                //   .catch((error) => {
                //     console.log(`${error}`)
                //   });
            });
        })
    

    }

    formatCell(cell,type) {
        let formatted;
        switch(type){
    
                case "DATE":
                     formatted=  new Date(cell).toISOString()
                     break;
                    
                case "INTEGER":
                    formatted= parseInt(cell)
                    break;
                    
                case "ENUM":
                    formatted= cell.toLowerCase()
                    break;
                default :
                    formatted= cell
                    break;
    
                }
                
        return formatted
      }

    processRows() {
        const newRows = []
        this.data.forEach(row => {
            let obj = {};
            for (const [baseColumn, corspondingColumn] of Object.entries(this.schema)) {
                obj[baseColumn] = (row[corspondingColumn] && row[corspondingColumn] != "NULL") ? this.formatCell( row[corspondingColumn], Treatment.rawAttributes[baseColumn].type.key) : null
            } 
            newRows.push(obj)
        });
 
        this.data= newRows

    }
    async insert() {
        try {
            await Treatment.bulkCreate(this.data ,{returning:['id']})
        } catch (error) {
            console.log(` error in bulk create :${error}`)
        }
    }
}
  
 
 



 