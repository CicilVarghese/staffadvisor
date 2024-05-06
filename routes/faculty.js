var express = require('express');
var router = express.Router();
const { verifyLogin } = require('../routes/home');
const facultyHelper = require('../helpers/faculty-helpers');

/* GET faculty portal. */
router.get('/', verifyLogin, async function(req, res, next) {
    try {
        const facultyData = await facultyHelper.getFacultyData(req.session.user);
        const allStudents = await facultyHelper.getAllStudents(req.session.user);
        const courses = await facultyHelper.getAllCourses(req.session.user);
        const semesters = await facultyHelper.getAllSem(req.session.user);
        const departments = await facultyHelper.getAllDept(req.session.user);
        
        
        res.render('faculty/portal', { Faculty: true, user: facultyData.details, allStudents ,courses,semesters,departments});
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("An error occurred.");
    }
});
router.get('/searchStudents', verifyLogin, async function(req, res, next) {
    try {
       const searchText = req.query.query;
        const facultyId = req.query.facultyId;
        const courseId =req.query.courseId;
        const semId =req.query.semId;
        const deptId =req.query.deptId; // Get advisorId from query parameters
        const allStudents = await facultyHelper.searchStudents(req.query.deptId,req.query.semId,req.query.courseId,searchText,req.session.user);
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
