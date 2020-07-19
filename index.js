var fs = require('fs');
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');

// setting up website app + server

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var server = app.listen(8080);
const http = require('http').createServer(app)

process.on('unhandledRejection', (error, promise) => {
    console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
    console.log(' The error was: ', error);
});

// getting actual modules

var logUser = require(`${__dirname}/modules/logUsers.js`);

// push stuff to global

    // npm modules + others
    global.fs = fs;
    global.https = https;
    global.mainDir = __dirname

    // script modules
    global.logUser = logUser;


// socket + server shit

var io = require('socket.io').listen(server);

io.on('connection', (socket) => {

    socket.on("test", (info) => {
        console.log("monkey")
    })

})

// have server use the website

app.use(express.static(`${global.mainDir}/site`), function (req, res) {
    // just getting the ip to log it
    var ip = req.ip;
    ip = ip.split("::ffff:");
    ip.shift();
    ip = ip.join("::ffff:");
    // removes the annoying ::ffff: at the begining of ips, probably did it a bad way lmao

    console.log(`User ${ip} has accessed site`)
});