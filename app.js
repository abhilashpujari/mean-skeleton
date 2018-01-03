const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const dbConfig = require('./config/database');
const apiConfig = require('./config/api');
const auth = require("./middlewares/passport")();

const app = express();

// Port Number
const port = process.env.port || 3000;

// make bluebird default Promise
mongoose.Promise = require('bluebird');

// Connect To Database
mongoose.connect(dbConfig.dbpath, {
    useMongoClient: true
});

// On Connection
mongoose.connection.on('connected', function()  {
    console.log('Connected to database '+ dbConfig.dbpath);
});

// On Error
mongoose.connection.on('error', function(err) {
    console.log('Database error: '+ err);
});

const userRouter = require('./routes/user');

// CORS Middleware
app.use(cors());

// Set Static Folder
// Static folder contains css, js, images files
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(auth.initialize());
app.use(auth.session());

app.use(apiConfig.apiPrefix + '/user', userRouter);

// Index Route
app.get('/', function(req, res) {
    res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, function() {
    console.log('Server started on port ' + port);
});