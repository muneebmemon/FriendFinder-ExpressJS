// requiring modules
var express = require('express');
var router = express.Router();
var path = require('path');

// setting up homepage route on '/' route
router.route('/')
      .get(function( req, res ) {
            res.sendFile(path.join(__dirname , "../public/home.html"));
      });

// setting up /survey route on '/' route     
router.route('/survey')
      .get(function( req, res ) {
            res.sendFile(path.join(__dirname, "../public/survey.html"));
      });

module.exports = router;