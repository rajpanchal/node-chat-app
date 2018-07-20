const path = require('path');
const http = require('http');                   //CONFIGURING HTTP TO WORK ON SOCKET----------1
const express = require('express');
const socketIO = require('socket.io');          //To install web sockets dead easily
const {generateMessage, generateLoactionMessage} = require('./utils/message');
const{isRealString} = require('./utils/validation.js');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);           //CONFIGURING HTTP TO WORK ON SOCKET-----2
var io = socketIO(server);

app.use(express.static(publicPath));           //LOADS INDEX.HTML FROM PUBLIC DIRECTORY



io.on('connection', (socket) => {              //io.on Lets u register an event listener, 'connection' - Listen for a new connection
          console.log('New user connected');

          socket.on('join', (params, callback) => {
            if(!isRealString(params.name) || !isRealString(params.room)){
              callback('Name and room details are required');
            }
            socket.join(params.room);
            socket.emit('newMessage',generateMessage('Admin', 'Welcome to the chat app'));
            socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
            callback();
          });




          socket.on('createMessage', (message, callback) => {           //createEmail 2
            console.log("createMessage", message);
            io.emit('newMessage',generateMessage(message.from, message.text));
            callback();
          });

            socket.on('createLocationMessage', (coords) => {
              io.emit('newLocationMessage', generateLoactionMessage('Admin', coords.latitude, coords.longitude));
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
