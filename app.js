"user strict";
const https = require( 'https' );
const express = require('express');
const fs = require( 'fs' );
const morgan = require( 'morgan' );
const compression = require( 'compression' );
const bodyParser = require('body-parser');
const env = require('node-env-file');

const bannerprint = require( './app/bannerprint.js' );
const pocketsphinx = require( './app/stt.js' );

env('.env');

var app = express();  

if(!process.env.MODEL_DIR || 
   !process.env.DICT_TO_USE || 
   !process.env.KEYPHRASE_FILE || 
   !process.env.POCKETSPHINX_LOG) {
    console.log("Error: Missing one of the environment variables. Check your .env file!");
    process.exit(1);
}

const privateKey  = fs.readFileSync( __dirname + '/https/server-key.pem', 'utf8' );
const certificate = fs.readFileSync( __dirname + '/https/server-crt.pem', 'utf8' );
const credentials = {
  key: privateKey,
  cert: certificate
};

const server = https.createServer(credentials, app).listen(3000, function() {
	console.log("listening on https://*:3000");
	bannerprint.write('DOMINO');
});

var io = require('socket.io')( server );

app.use( '/bower_components', express.static(__dirname + '/bower_components'));
app.use( express.static( __dirname + '/public' ));
app.use( morgan( 'dev' ) );
app.use( compression() );
app.use( bodyParser.urlencoded({ extended: false } ));
app.use( express.static('static') );
require('./app/routes.js')( app );

pocketsphinx.init(io);

io.on('connection', function( client ) {
	console.log('client connected');
});

