const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const port = process.env.PORT || '8080';


app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
  res.sendfile('socketio.html');
});

io.on('connection', function (socket){
  // // need to play around w/ this might have the IP :)
  var sHeaders = socket.handshake.headers['x-forwarded-for'];
  console.info('user connected: ', sHeaders);
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

