var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//setup the ardunio for connection:
var five = require( 'johnny-five' ),board,led;
board = new five.Board({ port : '\\\\.\\COM5' }); 
   board.on("ready", function() {
     led = new five.Led(13);
     console.log("board is ready");  
     

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//app.get request on /on triggers turning on the LED
app.get('/on',function(req,res){

console.log("led on");
 if(board.isReady){ led.on();}
        console.log("light is turned on");
    res.redirect('/');  
})   

//app.get request on /off triggers turning off the LED
app.get('/off',function(req,res){

console.log("led off");
 if(board.isReady){ led.off();}
        console.log("light is turned off");
    res.redirect('/');  
})   


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
