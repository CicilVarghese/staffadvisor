var express = require('express');
var router = express.Router();
const db = require('../db/database');
const { query } = require('../db/database');
const { verifyLogin } = require('../routes/home');
var facultyHelper= require('../helpers/faculty-helpers');
const { log } = require('handlebars');
var homeRouter = require('../routes/home');

/* GET users listing. */




router.get('/', verifyLogin,  async function(req, res, next) {

    try {
        const facultyData = await facultyHelper.getFacultyData(req.session.user);
        const allStudents =await facultyHelper.getAllStudents(req.session.user);
        console.log(allStudents);
        res.render('faculty/portal', { Faculty: true, user: facultyData.details,allStudents});
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("An error occurred.");
    }
  });

 
module.exports = router;
