const express = require('express'),
    app = express(),
    dotenv = require('dotenv'),
    http = require('http'),
    port = process.env.PORT || 3000;
    

dotenv.load();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

const server = http.Server(app);
require('./modules/mainSocketLocalToken').connect(server);


server.listen(3000,function(){
   console.log('Server started on port: '+port);
});

