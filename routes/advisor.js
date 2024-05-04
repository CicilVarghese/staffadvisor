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
router.get('/searchStudents', verifyLogin, async function(req, res, next) {
  try {
      const searchText = req.query.query;
      const advisorData = await advisorHelper.getAdvisorData(req.session.user);
      const allStudents = await advisorHelper.searchStudents(req.session.user, searchText);
      res.json(allStudents); // Return JSON response
  } catch (err) {
      console.error("Error:", err);
      res.status(500).send("An error occurred.");
  }
});




router.get('/getMarks', verifyLogin, async function(req, res, next) {
  try {
    const advisorData = await advisorHelper.getAdvisorData(req.session.user);
    const allStudents =await advisorHelper.getAllStudentsByMarks(req.session.user);
    res.render('advisor/marks', { Advisor: true, user: req.session.user,allStudents });} catch (err) {
    console.error("Error:", err);
    res.status(500).send("An error occurred.");
}
  
 
});

router.get('/getAttendance', verifyLogin,async function(req, res, next) {
  try {
    const advisorData = await advisorHelper.getAdvisorData(req.session.user);
    const allStudents =await advisorHelper.getAllStudentsByMarks(req.session.user);
    res.render('advisor/attendance', { Advisor: true, user: req.session.user,allStudents });} catch (err) {
    console.error("Error:", err);
    res.status(500).send("An error occurred.");
}
  
});

module.exports = router;
