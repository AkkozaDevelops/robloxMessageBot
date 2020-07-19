var fs = require('fs'); // read and write files
var https = require('https'); // used for POST requests
var express = require('express'); // used for the server
var bodyParser = require('body-parser'); // honestly no clue what this is for
var fetch = require('node-fetch'); // used instead of https for GET requests
var noblox = require('noblox.js'); // used for messaging api
var AccessControl = require('express-ip-access-control'); // used to whitelist ips

// setting up website app + server

var accessController = {
    mode: 'allow',
    denys: [],
    allows: require(__dirname + "/whitelisted_ips.json"),
    forceConnectionAddress: false,
    log: function (clientIp, access) {
        console.log(clientIp + (access ? ' accessed' : ' denied'))
    },

    statusCode: 401,
    redirectTo: '',
    message: `<head>  <!-- Coded by Akkoza#8767 || HTML and CSS by NovalFuzzy#9455 -->  <!-- Header -->  <title>Main Page</title><script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>  <!-- CSS Framework-->  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.2/css/bulma.min.css">  <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>  <style>    html, body {        height: 100%;        margin: 0;        font-family: "Roboto";    }    .wrapper {        min-height: 100%;        margin-bottom: -50px;    }    .footer, .push {        height: 50px;    }  </style>  <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>  <meta charset = "UTF-8" /></head><!-- Body --><body><!-- Statistics Banner -->    <article class="message is-dark">        <div class="message-header">            <div class="container has-text-centered"><p>Error</p>            </div>        </div>        <div class="message-body">            <div id="stats" class="container has-text-centered">                            </div>        </div>    </article>    <!-- Title Section -->    <section class="header">        <div class="container has-text-centered">        <h1 class="title is-1">Denied</h1>           <p>               You do not have access to this website.            </p>        </div>    </section>    <br></br><br><br><br><br><br><br><br><br><br><br> </body><!-- Footer --><footer style="margin-top:25px; margin-bottom: 0px;" class="footer">    <div class="container">      <div class="content has-text-centered">        <p>            <strong>Made for personal use.</strong> <br>            Coded by Akkoza#8767 | Website by NovalFuzzy#9455        </p>       </div></div></footer>`
    // denied page, very long lmao
}

var app = express();
app.use(AccessControl(accessController))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

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
        var dataResponse = null
        checkRap(2834200, function callback(data) {
            console.log(data)
            if (data >= 0) {
                message(2834200,"pog","poggers","_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_818E8CB4ACD73F97793DA993F86434B745C3662B68FB320B525793CC80317038B7B54FECDE6BC13FB10AA43F0864F1A34CE3C111600DD920DABE62FB8BD863A500F1965ECDD0EA3EECFD6666EEE4CB59E140C41096E90DA2C57BDB70EE4514B950A7676FD49825592166AFD7B9BD13498B7EA9D04565601E09BC5541D5AB300DCDD82B4BF95A2C84BF28AD45B2C13D82BB89E48EDC49BCA86E9C34C20760C606E5A884765E835223B99C08114857341F3DC0FDBBF003960B5186227AE53CD532DD363AB119BEC096B30C16E068D5D1AA42E686DD4FE13889AC4F64FE70698177E15905B101716F9A6767CF637C5318B27A96E28EAED3309226872A2F7B76378043C1AF2922DED4EED5AD2FACC7860E6A41DBC2B6D1911C6EC278EF33C3D4CD98791BF1B2")
            }
        })
        console.log(dataResponse)
        //findUsers();
        //message(2834200,"pog","poggers","_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_818E8CB4ACD73F97793DA993F86434B745C3662B68FB320B525793CC80317038B7B54FECDE6BC13FB10AA43F0864F1A34CE3C111600DD920DABE62FB8BD863A500F1965ECDD0EA3EECFD6666EEE4CB59E140C41096E90DA2C57BDB70EE4514B950A7676FD49825592166AFD7B9BD13498B7EA9D04565601E09BC5541D5AB300DCDD82B4BF95A2C84BF28AD45B2C13D82BB89E48EDC49BCA86E9C34C20760C606E5A884765E835223B99C08114857341F3DC0FDBBF003960B5186227AE53CD532DD363AB119BEC096B30C16E068D5D1AA42E686DD4FE13889AC4F64FE70698177E15905B101716F9A6767CF637C5318B27A96E28EAED3309226872A2F7B76378043C1AF2922DED4EED5AD2FACC7860E6A41DBC2B6D1911C6EC278EF33C3D4CD98791BF1B2");
    })
    //playerId, subject, message, robloxsec, xcsrf

})

// getting actual modules

var logUser = require(`${__dirname}/modules/logUsers.js`);
var message = require(`${__dirname}/modules/messageUser.js`)
var findUsers = require(`${__dirname}/modules/findUsers.js`)
var checkRap = require(`${__dirname}/modules/checkRap.js`)

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
global.findUsers = findUsers;

// have server use the website

app.use(express.static(`${global.mainDir}/site`), function (req, res) {
    var ip = req.ip;

    console.log(`User ${ip} has accessed site`)
});