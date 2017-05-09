
/* 
Socket.io Authentication based on Local generated token
*/

const user = require('./lib/user'),
     socketio = require('socket.io');
     
     let clients  = {};
     

global.clients = clients;
global.users = require('../database/db.js');
global.message =  require('./lib/message');
global.security =  require('./lib/security');
global.jwtSecret = process.env.LOCAL_JWT_SECRET;
global.NumberOfConnections = function() {
    return Object.keys(clients).length;
}



exports.connect = function(server){
  
        var io = socketio.listen(server);
      
       
        io.on('connection', function (socket) {
            
            console.log('socket.io: new connection, current number of authorized connections:',NumberOfConnections());
              //Get User   
              socket.on('getUser', function (data) {
                   console.log('socket.io: call getUser');
                 user.getUser(socket, data);
               });

                socket.on('message', function (data) {
                 message.broadcast(socket,data);
               });

               // Login
                socket.on('login', function (data) {
                    security.authenticateUser(socket, data);
                });

                // Logout
                socket.on('logout', function (token) {
                      clients[socket.id] && delete clients[socket.id];
                     console.log('close connection, number of authorized connections:',NumberOfConnections());
                  
                });



            socket.on('disconnect', function () {
                 clients[socket.id] && delete clients[socket.id];
                console.log('close connection, number of authorized connections:',NumberOfConnections());
                

            });
        });

        io.on('end', function() {
            
            console.log('socket.io: terminate server socket.io', NumberOfConnections());

        });





  
}




