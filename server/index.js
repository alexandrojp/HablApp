
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [{
	id:1,
	text: "hola soy un mensaje",
	author: "Edwin"
}];

app.use(express.static('public'));

app.get("/", function(req, res) {
	res.status(200).send("Hola mundo!");
});

io.on('connection', function(socket) {
	console.log('Alguien se ha conectado con Sockets');
	socket.emit('messages', messages);

	socket.on('new-message', function(data) {
		messages.push(data);
		io.sockets.emit('messages', messages)
	})
});

server.listen(3001, function(){
	console.log('Servidor corriendo...')
});