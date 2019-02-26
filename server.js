var fs = require('fs');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
var listener = app.listen(8081, function() {
  console.log('Your app is listening on port 8081');
});

function update() {
  var date = new Date();
  var utcDate = new Date(date.toUTCString());
  utcDate.setHours(utcDate.getHours()-8);
  var pstDate = (new Date(utcDate).getDay());
  var day;
  switch (pstDate) {
    case 0:
      day = 'Sunday!';
      break;
    case 1:
      day = 'Monday!';
      break;
    case 2:
      day = 'Tuesday!';
      break;
    case 3:
      day = 'Wednesday!';
      break;
    case 4:
      day = 'Thursday!';
      break;
    case 5:
      day = 'Friday!';
      break;
    case 6:
      day = 'Saturday!';
      break;
  }
  return day;
}

function endGameSeed() {
  var endGameSeed = Math.ceil(Math.random() * 5);
  
  var endValue;
  switch (endGameSeed) {
    case 0:
      endValue = "Congratulations! You died.";
      break;
    case 1:
      endValue = "Slow down there, speed racer!";
      break;
    case 2:
      endValue = "Did you even try? Like at all?";
      break;
    case 3:
      endValue = "If your goal was to crash, A+!";
      break;
    case 4:
      endValue = "Please don't do this professionally.";
      break;
    case 5:
      endValue = "Tell me you don't have a real car.";
      break;
  } 
  return endValue;   
}

function hideCodes(){
  var fileContents = fs.readFileSync(__dirname +'/index.html','utf8');
  
  fileContents = fileContents.replace('$day',update());
  fileContents = fileContents.replace('$endValue', endGameSeed());
  return fileContents;
};

app.get("/", function (request,response){ 
  var fileContents = fs.readFileSync(__dirname +'/index.html','utf8');
  fileContents = hideCodes(fileContents);
  response.send(fileContents);
});