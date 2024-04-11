var express = require('express');
var router = express.Router();
const db = require('../db/database');
const { query } = require('../db/database');
var facultyHelper= require('../helpers/faculty-helpers');
const { log } = require('handlebars');
/* GET users listing. */
router.get('/login', function(req, res, next) {
    res.render('faculty/login')
    });
router.post('/login',(req,res)=>{
  facultyHelper.doLogin(req.body).then((response)=>{
    if(response.status){
      res.send('Succesfuly login');
    }
    else{
      res.render('faculty/login')
    }

  })
})
module.exports = router;
