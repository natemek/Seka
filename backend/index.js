var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

io.emit('chat message', 'HELLLEOO');

http.listen(4000, () => {
  console.log('listening on *:4000');
});