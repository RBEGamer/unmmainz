var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
const httpsServer = https.createServer(credentials, app);
var io = require('socket.io')(server);
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var sessionstore = require('sessionstore');
var os = require("os");
var chalk = require('chalk');
var mqtt = require('mqtt');
var config = require('./config.json');
var uuidv1 = require('uuid/v1');
var got = require('got');
var mqtt = require('mqtt');
//var client = mqtt.connect(config.mqtt_server || 'mqtt://127.0.0.1');
var fs = require('fs');




const privateKey = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};


var port = process.env.PORT || config.webserver_default_port || 3000;
var port_sec = process.env.PORT_SEC || config.webserver_default_port_sec || 443;
//----------------------------- EXPRESS APP SETUP ------------------------------------------//
app.set('trust proxy', 1);
app.use(function (req, res, next) {
    if (!req.session) {
        return next(); //handle error
    }
    next(); //otherwise continue
});
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
// Routing
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'ssshhfddghjhgewretjrdhfsgdfadvsgvshthhh',
    store: sessionstore.createSessionStore(),
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

httpsServer.listen(port_sec, () => {
    console.log('HTTPS Server running on port ', port_sec);
});

var pub = null;





var last_update = Math.round(new Date().getTime() / 1000);


app.get('/', function (req, res) {
    sess = req.session;
    res.render('./public/index.html', {
    });
});





io.on('connection', (socket) => {
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });



    socket.on('event', function (_msg) {
        if (_msg.state == undefined){
            _msg.state = -1;
        }
        console.log(JSON.stringify(_msg )+ ' event');
        
    });


});


