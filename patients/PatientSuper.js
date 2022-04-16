 const fs = require("fs");
const fastcsv = require("fast-csv");
const { Patient } = require('../models')
  
module.exports = class PatientSuper { 
    schema={}
    constructor( header,file_path) {
        const [patient_id,mrn,patient_dob,is_deceased,dod_ts,gender,sex,first_name,last_name,address_01,address_02,address_03,zip_code,Last_modified_date]=header;
            this.schema.patient_id=patient_id;
            this.schema.mrn=mrn ;
            this.schema.patient_dob =patient_dob;
            this.schema.is_deceased=is_deceased;
            this.schema.dod_ts=dod_ts;
            
            this.schema.gender=gender;
            this.schema.sex=sex;

            this.schema.first_name=first_name;
            this.schema.last_name=last_name;

            this.schema.address_01=address_01;
            this.schema.address_02=address_02;
            this.schema.address_03=address_03;

            this.schema.zip_code=zip_code;

            this.Last_modified_date=Last_modified_date;

            this.file_path=file_path;
            this.data=[]
        }

    importFile ( ) {
    return new Promise((resolve, reject) => {

            fs.createReadStream(this.file_path)
            .pipe(fastcsv.parse({
                headers: true
            }))
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
                obj[baseColumn] = (row[corspondingColumn] && row[corspondingColumn] != "NULL") ? this.formatCell( row[corspondingColumn], Patient.rawAttributes[baseColumn].type.key) : null
            } 
            newRows.push(obj)
        });
 
        this.data= newRows

    }

    async insert() {
        try {
            await Patient.bulkCreate(this.data ,{returning:['id']})
        } catch (error) {
            console.log(` error in bulk create :${error}`)
        }
    }

}
  



 