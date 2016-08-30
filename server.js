const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const request = require('request');

const port = process.env.PORT || '8080';

var allcities = {};

//add some data for practice
allcities.Denver = 1;
allcities.Brandermill = 1;
allcities.Aurora = 1;
allcities.Boston = 1;
allcities.Portlan = 1;

app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
  res.sendfile('socketio.html');
});

app.get('/citidata', function (req, res) {
  res.send(allcities);
});

var requestIpLookup = 'http://ipinfo.io/'
io.on('connection', function (socket){

  // UNCOMMENT when working :) this just collects cities
  // var sHeaders = socket.handshake.headers['x-forwarded-for'];
  // var requestIpLookup = 'http://ipinfo.io/' + sHeaders;
  // request(requestIpLookup, function(error, res, body) {
  //   console.log(typeof body);
  //   var bodyR = JSON.parse(body)
  //   if (allcities[bodyR.city] === undefined){
  //     allcities[bodyR.city] = 1;
  //   } else {
  //     allcities[bodyR.city]++;
  //   }
  //   console.log(JSON.stringify(allcities));
  // });
  io.emit('cityList', allcities);

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});

exports.allcities = allcities;