var path = require('path');
//var jade = require('jade');
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var pseudoArray = [];

app.set('views', __dirname+'/views');
//app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);
app.set("view options", { layout:false });

app.use(express.static(path.join(__dirname + '/public')));

app.get('/',function(req,res){
   res.render('home.html');
});
server.listen(3000);
var users = 0;
io.sockets.on('connection',function(socket){
   users+=1;
   reloadUsers();
   listUsers();
   socket.on('message', function (message) {
    socket.get('pseudo', function (error, name) {
        var data = { 'message' : message, pseudo : name };
        socket.broadcast.emit('message', data);
        console.log("user " + name + " send this : " + message);
    })
   });
   socket.on('setPseudo', function (data) { // Assign a name to the user
	if (pseudoArray.indexOf(data) == -1) // Test if the name is already taken
	{
		connectedUsers(data,true);
	    socket.set('pseudo', data, function(){
	    pseudoArray.push(data);
	    socket.emit('pseudoStatus', {'user':data,'status':'ok'});
	    console.log("user " + data + " connected");
	    });
	}
	else
	{
	    socket.emit('pseudoStatus', {'user':data,'status':'error'}) // Send the error
	}
   });
   socket.on('disconnect', function () { // Disconnection of the client
	users -= 1;
	if (pseudoSet(socket))
	{
	   var pseudo;
	   socket.get('pseudo', function(err, name) {
	   pseudo = name;
	   });
	   var index = pseudoArray.indexOf(pseudo);
	   pseudoArray.splice(index, 1);
	   connectedUsers(pseudo,false);
	}
	reloadUsers();
   });
});

function reloadUsers() { // Send the count of the users to all
	io.sockets.emit('nbUsers', {"nb": users});
}
function listUsers() { // Send the count of the users to all
	io.sockets.emit('listUsers', {"list": pseudoArray});
}
function connectedUsers(user, status){
	if(status){
		io.sockets.emit('userOn', {"user": user});
	}else{
		io.sockets.emit('userOff', {"user": user});
	}	
}
function pseudoSet(socket) { // Test if the user has a name
var test;
socket.get('pseudo', function(err, name) {
if (name == null ) test = false;
else test = true;
});
return test;
}
function returnPseudo(socket) { // Return the name of the user
var pseudo;
socket.get('pseudo', function(err, name) {
if (name == null ) pseudo = false;
else pseudo = name;
});
return pseudo;
}
