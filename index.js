var fs = require('fs');
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');
var fetch = require('node-fetch');
var noblox = require('noblox.js');

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
        message(2834200,"pog","poggers","_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_818E8CB4ACD73F97793DA993F86434B745C3662B68FB320B525793CC80317038B7B54FECDE6BC13FB10AA43F0864F1A34CE3C111600DD920DABE62FB8BD863A500F1965ECDD0EA3EECFD6666EEE4CB59E140C41096E90DA2C57BDB70EE4514B950A7676FD49825592166AFD7B9BD13498B7EA9D04565601E09BC5541D5AB300DCDD82B4BF95A2C84BF28AD45B2C13D82BB89E48EDC49BCA86E9C34C20760C606E5A884765E835223B99C08114857341F3DC0FDBBF003960B5186227AE53CD532DD363AB119BEC096B30C16E068D5D1AA42E686DD4FE13889AC4F64FE70698177E15905B101716F9A6767CF637C5318B27A96E28EAED3309226872A2F7B76378043C1AF2922DED4EED5AD2FACC7860E6A41DBC2B6D1911C6EC278EF33C3D4CD98791BF1B2");
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
    global.noblox = noblox;
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