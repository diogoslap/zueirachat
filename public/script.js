
$(function() {
  var listUsers = [];
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
    console.log(listUsers);
    
});

var socket = io.connect();
//Ainda a implementar
socket.on('connect', function() {
	$("#statusServer").val('Conectado');
});
//Indica qual usuário se conectou ao chat
socket.on('userOn', function(data){
  var mensagens = $("#Mensagens");
  mensagens.html(mensagens.html()+'Usuário ' +data.user+' conectado\n');
});
//Retorna lista de usuarios atuais
socket.on('listUsers', function(data){
  console.log(data)
  listUsers = data.list
});
//Indica qual usuário está off
socket.on('userOff', function(data){
  var mensagens = $("#Mensagens");
  mensagens.html(mensagens.html()+'Usuário ' +data.user+' desconectado\n');
});
//Recebe as mensagens do server
socket.on('message', function(data){
   newMessageComing();
   addMessage(data['message'],data['pseudo']);
});

socket.on('nbUsers', function(msg) {
	$("#nbUsers").html(msg.nb);
});
//Adiciona mensagens na box do chat
function addMessage(msg, pseudo){
   var mensagens = $("#Mensagens");
   mensagens.html(mensagens.html()+pseudo+' : '+msg+'\n');
   $('#Mensagens').scrollTop($('#Mensagens')[0].scrollHeight);
}

//Envia as mensagens pro server
function sentMessage(){
   if($('#messageInput').val() != "")
   {
	socket.emit('message',$('#messageInput').val());
	addMessage($('#messageInput').val(),"Me",new Date().toISOString(),true);
	$('#messageInput').val('');
   }
}
//Valida se apelido já existe
function setPseudo(){
  var pseudo = $.trim($("#pseudoInput").val());

  if(pseudo != "" && listUsers.indexOf(pseudo) == -1){
	socket.emit('setPseudo', $("#pseudoInput").val());
	$('#chatControls').show();
  $('#Mensagens').show();
	$('#pseudoInput').hide();
	$('#pseudoSet').hide();
  $("notify").html('');
  }else{
    $("#notify").html("Apelido já existe, escolha outro.");
  }
}
//Alerta nova mensagem no titulo do site
function newMessageComing(){
 
  var isOldTitle = true;
  title_text = $('title').text();
  var oldTitle = title_text;
  var newTitle = "Nova Mensagem";
  var interval = null;
  function changeTitle() {
      document.title = isOldTitle ? oldTitle : newTitle;
      isOldTitle = !isOldTitle;
  }
  interval = setInterval(changeTitle, 700);

  $(window).focus(function () {
      clearInterval(interval);
      $("title").text(oldTitle);
  });
}