var express = require('express');
var router = express.Router();
const db = require('../db/database');
const { query } = require('../db/database');
var adminHelper= require('../helpers/admin-helpers');
const { log } = require('handlebars');

/* GET users listing. */
router.get('/login', function(req, res, next) {
res.render('admin/login')
});

router.post('/login',(req,res)=>{
  adminHelper.doLogin(req.body).then((response)=>{
    if(response.status){
      res.send('Succesfuly login');
    }
    else{
      res.render('admin/login')
    }

  })
})
module.exports = router;
