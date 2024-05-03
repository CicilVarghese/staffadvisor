const { query } = require('../db/database');


function getAdvisorData(data){
const sql = "SELECT * FROM advisors WHERE user_id=?"
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


function getAllStudents(data){
  const sql = "SELECT * FROM students WHERE semester_id=(SELECT semester_id FROM advisors WHERE user_id=?) "
  const values=[data.userid]
  return new Promise((resolve,reject)=>{
    query(sql,values)
      .then(({results})=>{
        console.log("Executing Query:",sql,values)
        if(results.length){
            resolve({details:results});
            
        }
      })
      .catch((error) => {
        console.error("Error fetching user from database:", error);
        reject(error);
    });
})
}

function searchStudents(user, searchText) {
  const sql = `SELECT * FROM students WHERE semester_id=(SELECT semester_id FROM advisors WHERE user_id=?) AND student_name LIKE ?`;
  const values = [user.userid, `%${searchText}%`];
  return new Promise((resolve,reject)=>{
    query(sql,values)
      .then(({results})=>{
        console.log("Executing Query:",sql,values)
        console.log("searchtext:", results);
        if(results.length){
            resolve({details:results});
            
        }
      })
      .catch((error) => {
        console.error("Error fetching user from database:", error);
        reject(error);
    });
})
}






module.exports = {
   getAdvisorData,getAllStudents,searchStudents
};
