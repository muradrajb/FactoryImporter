const path = require('path')
const fs = require("fs");
const { HospitalLog } = require('./models')

async function start() {
    //joining path of directory 
    const extractsPath = path.join(__dirname, 'extracts');

     // passsing extractsPath and callback function
    fs.readdir(extractsPath, async function(err, files) {

        //handling error
        if (err) {
            throw `Unable to scan directory:  \n  ${err} \n `;
         }

        // find if files has matching  classes  
        const files_meta=[]
        for (const file of files) {
            let hospital_id;

            // Populate treatment corresponding classes 
              if (file.slice(-13).toLocaleLowerCase()==="treatment.csv"){ 
                  hospital_id=file.slice(9,-14)
  
                  files_meta.push({   file_name:file,
                                      file_path:path.join(__dirname, 'extracts',file),
                                      class_file_path: `./treatments/Treatment_${hospital_id}` 
                                    })
              }
            
            // Populate  patient corresponding classes 
              if (file.slice(-11).toLocaleLowerCase()==="patient.csv"){
                hospital_id=file.slice(9,-12)
                 files_meta.push({
                    file_name:file,
                    file_path:path.join(__dirname, 'extracts',file),
                    class_file_path:  `./patients/Patient_${hospital_id}` 
                   })
            }
     }


    /*
      you can implement it to:
      either log(either to dataabase ot fileSystem) and continue processing other files for same hospital  : 
      or wrap EACH hospital files inserting process in a standalone transaction
    */

    /*
      now none of the above logic is implemented , i.e it will continue to import in case failiur of any files .
    */

    // for each file has corresponding class, instantiate an object
    // console.log(files_meta)
    
    for (const file of files_meta) {
      const{file_name, class_file_path,file_path}=file;

      try {
        let tempClass =require (class_file_path)
        await new tempClass(file_path).init()
        await HospitalLog.create({ file_name, status:true});
      } 
     catch (error) { 
          await HospitalLog.create({ file_name, status:false });
        //  process.exit(1)
     }
    }

    });
          
}
    
start()
// npx sequelize-cli model:generate --name file_inserts --attributes  file_name:string,status:boolean, model_name:enum:'{male,female,male,female}'
