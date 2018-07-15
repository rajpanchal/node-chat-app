const path = require('path');
const http = require('http');                   //CONFIGURING HTTP TO WORK ON SOCKET----------1
const express = require('express');
const socketIO = require('socket.io');          //To install web sockets dead easily

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);           //CONFIGURING HTTP TO WORK ON SOCKET-----2
var io = socketIO(server);


app.use(express.static(publicPath));           //LOADS INDEX.HTML FROM PUBLIC DIRECTORY

io.on('connection', (socket) => {              //io.on Lets u register an event listener, 'connection' - Listen for a new connection
    console.log('New user connected');

    socket.emit('newMessage', {                  //newEmail 1
      from: 'rajpanchal243@gmail.com',
      text: 'Hey dude whats up',
      createAt: 123
    });

    socket.on('createMessage', (message) => {           //createEmail 2
      console.log("createMessage", message);
    });

    socket.on('disconnect', () => {
      console.log('User was disconnected');
    });
});

server.listen(port, () => {                    //Server.listen instead of app.listen bcz of var server = http.createServer(app);
  console.log(`Server started on ${port}`);
});


/*
  IMP:-
    Client fires "Connected to the server" when connected
    Server fires "New user connected" when connected
    THIS MEANS CONNECTION BTW CLIENT & SERVER IS SUCCESSFULLY ESTABLISHED
*/
