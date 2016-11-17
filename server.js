var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http)

// viewed at http://localhost:8080
app.use(express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/node_modules'));

io.on('connection', function(socket){
  console.log('a user connected');
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


http.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
