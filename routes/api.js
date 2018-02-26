// requiring modules
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

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
            var currentMatchIndex = -1;
            var currentMatchScore = 99;
            var matchUserData = {};

            // reading friends data from the file
            fs.readFile(path.join(__dirname,'../data/friends.json'),"utf8", function(err, data) {
                if (err) {
                    throw err;
                    return;
                }
                var friendsList = JSON.parse((data));

                // calling function to find match
                friendsList.forEach((friend, index) => {
                    findMatch(friend["scores[]"] , req.body["scores[]"] , index);
                });

                // saving matched friend data into new object variable
                matchUserData = {
                    'name' : friendsList[currentMatchIndex].name,
                    'photo' : friendsList[currentMatchIndex].photo
                };

                // saving new user's data on to array
                friendsList.push(req.body);

                // writing updated friends list 
                fs.writeFile(path.join(__dirname, "../data/friends.json"), JSON.stringify(friendsList), function (err) {
                    if (err) {
                        throw err;
                        return;
                    }
                });

                //sending matched friend's data back to user
                res.send(matchUserData);
            });

            // this function compares scores with different friends and find the perfect match
            function findMatch(friendScores , userScores , index) {
                var scoreDiff=0;

                for (var i=0 ; i<10 ; i++) {
                    scoreDiff += Math.abs((friendScores[i]-userScores[i]));
                }

                if (scoreDiff < currentMatchScore) {
                    currentMatchIndex = index;
                    currentMatchScore = scoreDiff;
                }
            }
      });

module.exports = router;
