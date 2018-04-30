const https = require("https"),
  fs = require("fs"),
  helmet = require("helmet"),
  express = require("express"),
  app = express(),
  path    = require("path");

var port = process.env.PORT || 3080;
const options = {
  key: fs.readFileSync("/home/x240/junk/pwa-server/keys/key.pem"),
  cert: fs.readFileSync("/home/x240/junk/pwa-server/keys/cert.pem"),
  dhparam: fs.readFileSync("/home/x240/junk/pwa-server/keys/dh-strong.pem"),
    passphrase: '1234'
};
var server = https.createServer(options, app);
server.listen(port, function () {
  console.log('Server listening at port %d', port);
});
var io = require('socket.io').listen(server);

app.use(helmet());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static("."));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});
app.get('/car',function(req,res){
  res.sendFile(path.join(__dirname+'/public/carView.html'));
  //__dirname : It will resolve to your project folder.
});
app.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/about.html'));
});
app.get('/example',function(req,res){
  res.sendFile(path.join(__dirname+'/example.html'));
});

//app.listen(3000);
//https.createServer(options, app).listen(3080);

// Chatroom

var numUsers = 0;

io.on('connection', function (socket) {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});

console.log("Running at Port 3080");
