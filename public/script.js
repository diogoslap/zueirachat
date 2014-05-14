$(function() {
    $("#chatControls").hide();
    $("#Mensagens").hide();
    $("#pseudoSet").click(function() {setPseudo()});
    $("#submit").click(function() {sentMessage();});

    $("#messageInput").keypress(function(e){
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
             sentMessage();
        }
    });
});

var socket = io.connect();

socket.on('connect', function() {
	$("#statusServer").val('Conectado');
});

socket.on('userOn', function(data){
  var mensagens = $("#Mensagens");
  mensagens.html(mensagens.html()+'Usuário ' +data.user+' conectado\n');
});
socket.on('userOff', function(data){
  var mensagens = $("#Mensagens");
  mensagens.html(mensagens.html()+'Usuário ' +data.user+' desconectado\n');
});

socket.on('message', function(data){
   addMessage(data['message'],data['pseudo']);
});
socket.on('nbUsers', function(msg) {
	$("#nbUsers").html(msg.nb);
});

function addMessage(msg, pseudo){
   var mensagens = $("#Mensagens");
   mensagens.html(mensagens.html()+pseudo+' : '+msg+'\n');
   $('#Mensagens').scrollTop($('#Mensagens')[0].scrollHeight);
}

function sentMessage(){
   if($('#messageInput').val() != "")
   {
	socket.emit('message',$('#messageInput').val());
	addMessage($('#messageInput').val(),"Me",new Date().toISOString(),true);
	$('#messageInput').val('');
   }
}
function setPseudo(){
   if($("#pseudoInput").val() != ""){
	socket.emit('setPseudo', $("#pseudoInput").val());
	$('#chatControls').show();
  $('#Mensagens').show();
	$('#pseudoInput').hide();
	$('#pseudoSet').hide();
   }
}

