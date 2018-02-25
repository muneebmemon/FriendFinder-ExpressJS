// requiring modules
var express = require('express');
var path = require('path');
var homeRouter = require('./routes/home');
var apiRouter = require('./routes/api');

// initializing express app
var app = express();                                    

// setting up port
app.set('port' , process.env.PORT || 3000);

// setting up routers 
app.use('/' , homeRouter);
app.use('/api' , apiRouter);

// setting up middleware to serve static files
app.use(express.static(path.join(__dirname , 'public')));

// listening to port
app.listen(app.get('port') , function() {
    console.log(`Listening on port: ${app.get('port')}`);
});