const  _  = require('lodash');

exports.getUser = function (socket, data) {

/*
security.verifyConnection(socket,data).then(function(result) {
   console.log('Access allowed to getUser()');
  if(!data.id) return socket.emit('user.success', null);
  const user = _.find(users,{id:data.id});
   var profile = (user)? {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user.id
    } : null;

  return socket.emit('user.success', profile);
}, function(err) {
  console.log('Access denied to getUser()'); return;
});
*/

  // Emit an error if the token is invalid
  if (!security.verifyConnection(socket,data)) { console.log('Access denied to getUser()'); return; }

  console.log('Access allowed to getUser()');
  
  if(!data.id) return socket.emit('user.success', null);

  const user = _.find(users,{id:data.id});
   var profile = (user)? {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user.id
    } : null;

  return socket.emit('user.success', profile);

};
