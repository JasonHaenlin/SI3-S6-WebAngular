// index.js

'use strict';

// get all the tools we need
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql');
const fileUpload = require('express-fileupload');
const app = express();


// app configure
app.disable('x-powered-by');
app.use(cors());
app.use(bodyParser.json({}));
app.use(morgan('dev'));
app.use(fileUpload());

let port = process.env.PORT || 3000;

let incidentPool = mysql.createPool({
	multipleStatements: true, // enable multi queries
	port: 3306,
	host: 'webh.ddns.net', // can be changed e.g 'localhost'
	user: 'root',
	password: 'jareonWebh$*',
	database: 'ps6_web'
});

require('./app/routes.js')(app, incidentPool);

const server = app.listen(port, () => {
	console.log(
		'[' + new Date().toISOString() + '] Server launched on port ' + server.address().port + '!'
	);
});