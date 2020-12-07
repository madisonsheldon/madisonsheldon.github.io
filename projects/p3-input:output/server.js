// $('.word').click (function (){
//   $('.img').toggleClass('show');
// });


// $('.x').click (function (){
//   $('.card').addClass('hide');
// });


var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("My socket server is running");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
	console.log('new connection: ' + socket.id);

	socket.on('in', greetMsg);

	function greetMsg(data) {
		socket.broadcast.emit('in', data);
		console.log(data);
	}

	socket.on('other', boxSizer);

	function boxSizer(data) {
		socket.broadcast.emit('other', data);
		console.log(data);
	}

}