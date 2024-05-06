var express = require('express');
var router = express.Router();
const db = require('../db/database');
const { query } = require('../db/database');
const { verifyLogin } = require('../routes/home');
const advisorHelper=require('../helpers/advisor-helpers')
var homeRouter = require('../routes/home');

/* GET advisor portal. */
// 

router.get('/', verifyLogin,  async function(req, res, next) {

  try {
      const advisorData = await advisorHelper.getAdvisorData(req.session.user);
      const allStudents =await advisorHelper.getAllStudents(req.session.user);
      res.render('advisor/portal', { Advisor: true, user: advisorData.details,allStudents});
  } catch (err) {
      console.error("Error:", err);
      res.status(500).send("An error occurred.");
  }
});



// advisor.js




router.get('/getMarks', verifyLogin, async function(req, res, next) {
  try {
    const advisorData = await advisorHelper.getAdvisorData(req.session.user);
    const courses = await advisorHelper.getAllCourses(req.session.user);
    const allStudents = await advisorHelper.getAllStudentsByMarks(req.session.user); // Fetch all students
    
    res.render('advisor/marks', { Advisor: true, user: req.session.user, allStudents, courses });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("An error occurred.");
  }
});



router.get('/getAttendance', verifyLogin,async function(req, res, next) {
  try {
    const advisorData = await advisorHelper.getAdvisorData(req.session.user);
    const allStudents =await advisorHelper.getAllStudentsByMarks(req.session.user);
    const courses = await advisorHelper.getAllCourses(req.session.user);

    res.render('advisor/attendance', { Advisor: true, user: req.session.user,allStudents,courses });}
     catch (err) {
    console.error("Error:", err);
    res.status(500).send("An error occurred.");
}
  
});

router.get('/searchStudents', verifyLogin, async function(req, res, next) {
  try {
      const searchText = req.query.query;
      const allStudents = await advisorHelper.searchStudents(req.session.user, searchText);
      res.json(allStudents); // Return JSON response
  } catch (err) {
      console.error("Error:", err);
      res.status(500).send("An error occurred.");
  }
});



router.get('/searchStudentsByCourse', verifyLogin, async function(req, res, next) {
  try {
    
      const searchText = req.query.query;
      const advisorId = req.query.advisorId; // Get advisorId from query parameters
      const allStudents = await advisorHelper.searchStudentsByCourse(req.query.courseId, searchText, advisorId);
      res.json(allStudents); // Return JSON response
  } catch (err) {
      console.error("Error:", err);
      res.status(500).send("An error occurred.");
  }
});

router.post('/changeRole', verifyLogin, async function(req, res, next) {
  try {
      const { role } = req.body;
      // Update the role in the session
      req.session.userRoles = [role];
      res.sendStatus(200); // Send a success response
  } catch (err) {
      console.error("Error changing role:", err);
      res.sendStatus(500); // Send a server error response
  }
});


module.exports = router;
