var express = require('express');
var router = express.Router();
const db = require('../db/database');
const { query } = require('../db/database');
const { verifyLogin } = require('../routes/home');
var adminHelper= require('../helpers/admin-helpers');
const { log } = require('handlebars');
var homeRouter = require('../routes/home');

/* GET users listing. */


router.get('/',verifyLogin, async function(req, res, next) {
    try {
        const adminData = await adminHelper.getAdminData(req.session.user);
        const allAdvisors = await adminHelper.getAllAdvisors();
        const allFaculties =await adminHelper.getAllFaculties();
        console.log(allFaculties)
        res.render('admin/portal', { Admin: true, user: adminData.details, allAdvisors,allFaculties });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("An error occurred.");
    }
});
router.get('/addAdvisor',verifyLogin, async function(req, res, next) {
    const adminData = await adminHelper.getAdminData(req.session.user);
    const allAdvisors = await adminHelper.getAllAdvisors();
        res.render('admin/addAdvisor', { Admin: true, user: adminData.details, allAdvisors});

});

router.get('/addFaculty',verifyLogin, async function(req, res, next) {
    const adminData = await adminHelper.getAdminData(req.session.user);
    const allFaculties =await adminHelper.getAllFaculties();
        res.render('admin/addFaculty', { Admin: true, user: adminData.details, allFaculties});

});



 
module.exports = router;
