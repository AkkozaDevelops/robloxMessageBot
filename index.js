var fs = require('fs'); // read and write files
var https = require('https'); // used for POST requests
var express = require('express'); // used for the server
var bodyParser = require('body-parser'); // honestly no clue what this is for
var fetch = require('node-fetch'); // used instead of https for GET requests
var noblox = require('noblox.js'); // used for messaging api
var AccessControl = require('express-ip-access-control'); // used to whitelist ips

global.rateLimited = false;

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
    global.rateLimited = true
    console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
    console.log(' The error was: ', error);
});

// functions

function unRequire(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
}

// socket + server shit

//accessController.allows = unRequire(__dirname + "/whitelisted_ips.json")

var io = require('socket.io').listen(server);

io.on('connection', (socket) => {

    socket.on("start", (info) => {

    })

})

// push stuff to global

// npm modules + others
global.fs = fs;
global.https = https;
global.fetch = fetch;
global.noblox = noblox;
global.mainDir = __dirname
global.app = app;

// functions
global.unRequire = unRequire;

// getting variables because yuh

// getting actual modules

var logUser = require(`${__dirname}/modules/logUsers.js`);
var message = require(`${__dirname}/modules/messageUser.js`)
var findUsers = require(`${__dirname}/modules/findUsers.js`)
var checkRap = require(`${__dirname}/modules/checkRap.js`)
var sitePostRequest = require(`${__dirname}/modules/sitePostRequest.js`)();

// script modules
global.logUser = logUser;
global.message = message;
global.findUsers = findUsers;
global.checkRap = checkRap;
global.sitePostRequest = sitePostRequest;

// have server use the website

app.use(express.static(`${global.mainDir}/site`), function (req, res) {
    var ip = req.ip;

    console.log(`User ${ip} has accessed site`)
});