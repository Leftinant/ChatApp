const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

let users = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (username) => {
    users[socket.id] = username;
    socket.broadcast.emit('user-connected', username);
    io.emit('online-users', Object.values(users));
  });

  socket.on('send-message', ({ username, message }) => {
    const timestamp = new Date().toLocaleTimeString();
    io.emit('receive-message', { username, message, timestamp });
  });

  socket.on('typing', (username) => {
    socket.broadcast.emit('user-typing', username);
  });

  socket.on('disconnect', () => {
    const username = users[socket.id];
    delete users[socket.id];
    socket.broadcast.emit('user-disconnected', username);
    io.emit('online-users', Object.values(users));
  });
});

server.listen(5000, () => {
  console.log('Server running on port 5000');
});
