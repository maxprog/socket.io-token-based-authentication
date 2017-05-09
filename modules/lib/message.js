 const _  = require('lodash');

exports.broadcast = function(socket,data){
    
    security.verifyConnection(socket,data).then(function(result) {
  
    console.log('Access allowed to broadcast()');
        try{
        var obj = {org:data.org,topic:data.topic,message:data.message};
                console.log('socket.io broadcast:',obj);
                _.each(clients,function(client,index) {
                   
                    client.emit('message', obj);
                    }
                );
        }catch(ex){
                console.log('socket.io: Error during sending message to clients ');
            }

}, function(err) {
  console.log('Access denied to broadcast()'); return;
});

       
}


exports.sendError = function(socket, message) {
console.log('socket.io: send Error to socket client');
          socket.emit('error.messages', {
              message: message
          });
   

};