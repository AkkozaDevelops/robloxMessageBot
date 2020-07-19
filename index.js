var fs = require('fs');
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');
var fetch = require('node-fetch');

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

// socket + server shit

var io = require('socket.io').listen(server);

io.on('connection', (socket) => {

    socket.on("test", (info) => {
        console.log("monkey")
        message(2834200,"pog","poggers","_1484DD1F469AE4AE8A29645A849D67D4940AFE678998B9CBAB6B6FF9775CCD00E52EDFED27E6AF0A876AF48A6F3B3077B1646F0C0151AF2A79D76579AF088BC6156C0AAF912CF0947A7B9FEA74A2F5AE10FEEBD0DEE8A77411EEFB015FE0397BE2CE671F4C1360325989F1D810B134A19D46781A6357B82DBA8FD5DE18DB92E9343B3D4DB81FF45C6AACA05AFD4E4FF9E7D01A1E1E23D99AE81E0ECCF7ACF7194222155F81593EBF68EB19961A77EC1E4B82827CD55F99F0FF01D87C0DB1D01298DC9739E3063EDCC73435EF433CB3267AC4DBF695DC5D203F42539AB7C412F2B8EA8EA339ED3C4C9E2986A08F260C98EDEA6D93E733C3D348E7EEEF3B35B7F8C9581740F2086F6E90D1BC785148E6D0E1C55FCD74E4AF3206EFF83165FD32638DFD6C79");
    })
    //playerId, subject, message, robloxsec, xcsrf

})

// getting actual modules

var logUser = require(`${__dirname}/modules/logUsers.js`);
var message = require(`${__dirname}/modules/messageUser.js`)

// push stuff to global

    // npm modules + others
    global.fs = fs;
    global.https = https;
    global.fetch = fetch;
    global.mainDir = __dirname

    // script modules
    global.logUser = logUser;
    global.message = message;

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