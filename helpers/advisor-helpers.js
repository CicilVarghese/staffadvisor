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
       // console.log("Executing Query:",sql,values)
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
function getAllStudentsByMarks(data){
  const sql = "SELECT s.id AS student_id, s.student_name, s.department_id, s.semester_id, c.name AS course_name, im.total_marks AS total_marks, att.percentage AS attendance_percentage FROM students s JOIN semesters sem ON s.semester_id = sem.id JOIN departments d ON s.department_id = d.id LEFT JOIN student_course sc ON s.id = sc.student_id LEFT JOIN courses c ON sc.course_id = c.id AND c.semester_id = s.semester_id LEFT JOIN internal_marks im ON s.id = im.student_id AND im.course_id = c.id LEFT JOIN attendance att ON s.id = att.student_id AND att.course_id = c.id WHERE sem.advisor_id = 'advisor1'= ?;"
  const values=[data.userid]
  return new Promise((resolve,reject)=>{
    query(sql,values)
      .then(({results})=>{
        console.log("Executing Query:",sql,values)
        console.log("data fetched ",results)
        if(results.length){
            resolve({details:results});
            console.log("if true")
        }
      })
      .catch((error) => {
        console.error("Error fetching user from database:", error);
        reject(error);
    });
})
}








module.exports = {
   getAdvisorData,getAllStudents,getAllStudentsByMarks
};
// function searchStudents(user, searchText) {
//   const sql = `SELECT * FROM students WHERE semester_id=(SELECT semester_id FROM advisors WHERE user_id=?) AND student_name LIKE ?`;
//   const values = [user.userid, `%${searchText}%`];
//   return new Promise((resolve,reject)=>{
//     query(sql,values)
//       .then(({results})=>{
//         console.log("Executing Query:",sql,values)
//         console.log("searchtext:", results);
//         if(results.length){
//             resolve({details:results});
            
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching user from database:", error);
//         reject(error);
//     });
// })
// }