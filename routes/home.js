var express = require('express');
var router = express.Router();
const db = require('../db/database');
const { query } = require('../db/database');

const { log } = require('handlebars');
/* GET users listing. */
router.get('/', function(req, res, next) {
 res.render('login')
});

module.exports = router;
