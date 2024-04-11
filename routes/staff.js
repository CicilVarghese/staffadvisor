var express = require('express');
var router = express.Router();
const db = require('../db/database');
const { query } = require('../db/database');
var staffHelper= require('../helpers/staff-helpers');

const { log } = require('handlebars');
/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('staff/login')
  });


  router.post('/login',(req,res)=>{
    staffHelper.doLogin(req.body).then((response)=>{
      if(response.status){
        res.send('Succesfuly login');
      }
      else{
        res.render('staff/login')
      }
  
    })
  })
module.exports = router;
