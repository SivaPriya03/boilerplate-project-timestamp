// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { 
  isUNIXFormat, 
  convertUTCToUnix, 
  convertToUTC, 
  isInvalidTime, 
  getCurrentTime,
  convertUnixToUTC 
} = require('./utils');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/api', (req, res) => {
  res.json(getCurrentTime());
})


// your first API endpoint... 
app.get("/api/:time", function (req, res) {
  const time = decodeURI(req.params.time);
  let isInvalid;
  const isUnix = isUNIXFormat(time);
  if(isUnix){
    isInvalid = isInvalidTime(Number(time));
  }
  else{
    isInvalid = isInvalidTime(time);
  }
  if(isInvalid){
    res.json({ error: 'Invalid Date' });
  }
  else{
    const jsonObj = {};
    if(isUnix){
      jsonObj.utc = convertUnixToUTC(time);
      jsonObj.unix = Number(time);
    }
    else{
      jsonObj.unix = convertUTCToUnix(time);
      jsonObj.utc = convertToUTC(time);
    }
    res.json(jsonObj);
  }
});

const invalidRequestMiddleware = (req, res, next) => {
  if(req.path !== '/' || req.path !== '/api'){
    res.json({ error: 'Invalid path' })
  }
  next();
}

app.use(invalidRequestMiddleware)

// listen for requests :)
app.listen(8080, function () {
  console.log('Your app is listening on port 8080');
});
