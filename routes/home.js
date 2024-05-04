var express = require('express');
var router = express.Router();
const db = require('../db/database');
const { query } = require('../db/database');
var loginHelper= require('../helpers/login_helpers');
const { log } = require('handlebars');

/* GET users listing. */

const verifyLogin = (req, res, next) => {
  if (req.session.loggedIn) {
     next();
  } else {
     res.redirect('/');
  }
};
 //login
router.get('/', function(req, res, next) {

  
    if(req.session.loggedIn){


      if(req.session.user.role=="advisor")
        res.redirect('/advisor');

  else  if(req.session.user.role=="faculty")
           res.redirect('/faculty'); 
          
  else  if(req.session.user.role=="admin")
            res.redirect('/admin');

    } 
   

  else{
    res.render('login',{loginErr: req.session.loginErr})
    req.session.loginErr=false;
  }

});

router.post('/', (req, res) => {
  loginHelper.doLogin(req.body).then((response) => {
     if (response.status) {
       req.session.loggedIn = true;
       req.session.user = response.user;
       user = req.session.user ;
       if(req.session.user.role=="advisor")
             res.redirect('/advisor');

       else  if(req.session.user.role=="faculty")
                res.redirect('/faculty'); 
               
       else  if(req.session.user.role=="admin")
                 res.redirect('/admin');

     } else {
      req.session.loginErr= true;
       res.redirect('login');
     }
  });
 });

 router.get('/logout',(req,res)=>{
   req.session.destroy()
   res.redirect('/')
 })

 
module.exports ={ router,verifyLogin};
