const { query } = require('../db/database');



function getFacultyData(data){
const sql = "SELECT * FROM faculty WHERE user_id=?"
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
  const sql = "SELECT s.id AS student_id, s.student_name AS student_name, d.id AS department_id, sem.id AS semester_id, c.name AS course_name, im.total_marks AS total_marks, a.percentage AS attendance FROM students s JOIN semesters sem ON s.semester_id = sem.id JOIN departments d ON s.department_id = d.id JOIN student_course sc ON s.id = sc.student_id JOIN courses c ON sc.course_id = c.id LEFT JOIN internal_marks im ON s.id = im.student_id AND c.id = im.course_id LEFT JOIN attendance a ON s.id = a.student_id AND c.id = a.course_id JOIN faculty f ON c.faculty_id = f.user_id WHERE f.user_id = ?  "
  const values=[data.userid]
  return new Promise((resolve,reject)=>{
    query(sql,values)
      .then(({results})=>{
       // console.log("Executing Query:",sql,values)
       // console.log("data fetched ",results)
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


function searchStudents(deptId, semId, courseId, searchText, facultyId) {
  const sql = `
    SELECT s.id AS student_id, s.student_name, s.department_id, s.semester_id, 
           c.name AS course_name, im.total_marks AS total_marks, 
           a.percentage AS attendance_percentage 
    FROM students s 
    JOIN semesters sem ON s.semester_id = sem.id 
    JOIN departments d ON s.department_id = d.id 
    JOIN student_course sc ON s.id = sc.student_id 
    JOIN courses c ON sc.course_id = c.id 
    LEFT JOIN internal_marks im ON s.id = im.student_id AND im.course_id = c.id 
    LEFT JOIN attendance a ON s.id = a.student_id AND a.course_id = c.id 
    WHERE c.faculty_id like ? AND d.id LIKE ? AND sem.id LIKE ? AND c.id LIKE ? 
          AND (s.student_name LIKE ? OR s.id LIKE ?);`;
          console.log(facultyId)
  const values = [facultyId.userid, `%${deptId}%`, `%${semId}%`, `%${courseId}%`, `%${searchText}%`, `%${searchText}%`];
  return new Promise((resolve, reject) => {
    query(sql, values)
      .then(({ results }) => {
        console.log("Executing Query:", sql, values);
        console.log("Data fetched ", results,facultyId);
        resolve({ details: results });
      })
      .catch((error) => {
        console.error("Error searching students:", error);
        reject(error);
      });
  });
}


function getAllSem(data) {
  const sql = 'SELECT DISTINCT sem.id AS semester_id,sem.name AS semester_name FROM semesters sem JOIN courses c ON sem.id = c.semester_id JOIN faculty f ON c.faculty_id = f.user_id WHERE f.user_id = ? ;';
  const values=[data.userid]
  return new Promise((resolve, reject) => {
      query(sql,values)
          .then(({ results }) => {
              resolve(results);
          })
          .catch((error) => {
              console.error("Error fetching courses from database:", error);
              reject(error);
          });
  });
}

function getAllDept(data) {
  const sql = "SELECT DISTINCT d.id AS department_id, d.name AS department_name FROM departments d JOIN courses c ON d.id = c.department_id JOIN faculty f ON c.faculty_id = f.user_id WHERE f.user_id = ?;";
  const values=[data.userid]
  return new Promise((resolve, reject) => {
      query(sql,values)
          .then(({ results }) => {
              resolve(results);
          })
          .catch((error) => {
              console.error("Error fetching courses from database:", error);
              reject(error);
          });
  });
}

function getAllCourses(data) {
  const sql = "SELECT DISTINCT c.id AS course_id, c.name AS course_name FROM courses c JOIN faculty f ON c.faculty_id = f.user_id WHERE f.user_id = ?;";
  const values=[data.userid]
  return new Promise((resolve, reject) => {
      query(sql,values)
          .then(({ results }) => {
              resolve(results);
          })
          .catch((error) => {
              console.error("Error fetching courses from database:", error);
              reject(error);
          });
  });
}
module.exports = {
   getFacultyData,getAllStudents,searchStudents,getAllSem,getAllDept,getAllCourses
};
