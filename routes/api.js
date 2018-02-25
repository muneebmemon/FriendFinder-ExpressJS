var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var router = express.Router();
var jsonParser = bodyParser.json();
 
// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// setting up /friends route on '/api' route
router.route('/friends')
      .get(function( req, res ) {
            res.sendFile(path.join(__dirname, "../data/friends.json"));
      })

      .post(urlencodedParser , function( req, res ) {

      });

module.exports = router;
