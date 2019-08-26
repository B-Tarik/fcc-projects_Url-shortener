// server.js

// init project
const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');

const setUrl = require('./handlers/setUrl');
const getUrl = require('./handlers/getUrl');
const errorHandler = require('./handlers/error');

const cors = require('cors');

require('dotenv').config()

const app = express();

// Basic Configuration 
const port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
}, function(err){
  if(err){
    console.log(err);
  }else {
    console.log("Conected to DataBase.");
  }
});


app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/api/shorturl/:urlId", getUrl);

app.post("/api/shorturl/new", setUrl);

// http://expressjs.com/en/starter/basic-routing.html
app.get("*", function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.use(function(req, res, next) {
  const err = new Error('Not Found')
  next(err);
})

app.use(errorHandler);


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
