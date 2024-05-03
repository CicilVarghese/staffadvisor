const { query } = require('../db/database');


function getAdminData(data){
    const sql = "SELECT * FROM admin WHERE user_id=?"
    const values=[data.userid]
     
    return new Promise((resolve,reject)=>{
        query(sql,values)
          .then(({results})=>{
            console.log("Executing Query:",sql,values)
    
            if(results.length){
                resolve({details:results[0]});
                console.log("data fetched")
            }
          })
          .catch((error) => {
            console.error("Error fetching user from database:", error);
            reject(error);
        });
    })
    
    }

function getAllAdvisors(){
        const sql = "SELECT * FROM advisors"
        return new Promise((resolve,reject)=>{
          query(sql)
            .then(({results})=>{
              console.log("Executing Query:",sql)
      
              if(results.length){
                  resolve({details:results[0]});
                  console.log("data fetched",results[0])
              }
            })
            .catch((error) => {
              console.error("Error fetching user from database:", error);
              reject(error);
          });
      })
      }
    

      function getAllFaculties(){
        const sql = "SELECT * FROM faculty"
        return new Promise((resolve,reject)=>{
          query(sql)
            .then(({results})=>{
              console.log("Executing Query:",sql)
      
              if(results.length){
                  resolve({details:results});
                  console.log("data fetched",results)
              }
            })
            .catch((error) => {
              console.error("Error fetching user from database:", error);
              reject(error);
          });
      })
      }
    
    module.exports = {
       getAdminData,getAllAdvisors,getAllFaculties
    };
    