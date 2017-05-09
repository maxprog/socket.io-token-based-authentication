
exports.broadcast = function(data){
    try{
    
        if (!security.verifyConnection(socket,data)) return;
        
        var obj = {org:data.org,topic:data.topic,message:data.message};
        console.log('socket.io broadcast:',obj);
        clients.forEach(function(client) {
            client.emit('message', obj);
            }
        );

    }catch(ex){
        console.log('socket.io: Error during sending message to clients ');
    }
}


exports.sendError = function(socket, message) {

          return socket.emit('error', {
              message: message
          });
   

};