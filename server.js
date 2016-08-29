const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const request = require('request');

const port = process.env.PORT || '8080';

var allcities = {};

app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
  res.sendfile('socketio.html');
});

var requestIpLookup = 'http://ipinfo.io/'
io.on('connection', function (socket){

  var sHeaders = socket.handshake.headers['x-forwarded-for'];
  var requestIpLookup = 'http://ipinfo.io/' + sHeaders;
  request(requestIpLookup, function(error, res, body) {
    console.log(body);
    if (allcities[body.city] === undefined){
      allcities[body.city] = 1;
    } else {
      allcities[body.city]++;
    }
    console.log(JSON.stringify(allcities));
  });
  // console.info('user connected: ', sHeaders);
  // could try this too:
  // var fooBoo = socket.request.connection.remoteAddress;
  // var fooBoo = socket.request.connection._peername.address;
  // console.log('a user connected', fooBoo);
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});

