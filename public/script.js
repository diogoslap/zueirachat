
$(function() {
  
    $("#chatControls").hide();
    $("#Mensagens").hide();
    $("#nbUsersDiv").hide();
    $("#pseudoSet").click(function() {setPseudo()});
    $("#submit").click(function() {sentMessage();});

    $("#messageInput").keypress(function(e){
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
             sentMessage();
        }
    });
    $("#pseudoInput").keypress(function(e){
      var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
             setPseudo();
      }
    });
});
//Pseudo
var pseudo = $.trim($("#pseudoInput").val());
//Socket
var socket = io.connect();
  //Ainda a implementar
  socket.on('connect', function() {
    console.log(pseudo);
    if(pseudo!= ""){
      socket.emit('reconnected',pseudo);
      showChat();
    }
    $("#statusServer").val('Conectado');
  });
  //Alert user connected
  socket.on('userOn', function(data){
    if(hasPseudo()){
      return false
    }
    var mensagens = $("#Mensagens");
    mensagens.html(mensagens.html()+'Usuário ' +data.user+' conectado\n');
  });

  //Return the Actual User list
  socket.on('listUsers', function(data){
    listUsers = data.list
  });

  //Alert user disconnect
  socket.on('userOff', function(data){
    if(hasPseudo()){
      return false
    }
    var mensagens = $("#Mensagens");
    mensagens.html(mensagens.html()+'Usuário ' +data.user+' desconectado\n');
  });

  //Receive the messages of users
  socket.on('message', function(data){
    if(hasPseudo()){
      return false
    }
    var window_focus = false;
    $(window).focus(function(){
      window_focus = true;
    });
    
    if(!window_focus){
      newMessageComing();
    }
     addMessage(data['message'],data['pseudo']);
  });
  //Users count
  socket.on('nbUsers', function(msg) {
    $("#nbUsers").html(msg.nb);
  });

//User List
var listUsers = [];

//Add messages in the chat box
function addMessage(msg, pseudo){
   var mensagens = $("#Mensagens");
   mensagens.html(mensagens.html()+pseudo+' : '+msg+'\n');
   $('#Mensagens').scrollTop($('#Mensagens')[0].scrollHeight);
}

//Sent Messages to the server
function sentMessage(){
   if($('#messageInput').val() != "")
   {
    socket.emit('message',$('#messageInput').val());
	  addMessage($('#messageInput').val(),pseudo.toString(),new Date().toISOString(),true);
	  $('#messageInput').val('');
   }
}
//Validate pseudo
function setPseudo(){
  pseudo = $.trim($("#pseudoInput").val());
    if(pseudo == ""){
       $("#notify").html("Insira um apelido.");
    }
    else if(listUsers.indexOf(pseudo) == -1){
      //Send pseudo to validate
    	socket.emit('setPseudo', $("#pseudoInput").val());
      //Return if the pseudo is avaible
      socket.on('pseudoStatus', function(data) {
        if(data.status=="ok"){
          $('#chatControls').show();
          $('#Mensagens').show();
          $('#nbUsersDiv').show();
          $('#pseudoInput').hide();
          $('#pseudoSet').hide();
          $("#notify").html('');
        }else{
          $("#notify").html("Apelido já existe, escolha outro.");
        }
      });
    }else{
      $("#notify").html("Apelido já existe, escolha outro.");
    }
}
//Alert new message in the title of the site
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

function initConnection(){
  return socket;
}

function hasPseudo(){
    return pseudo == "";
}

function showChat(){
  $('#chatControls').show();
  $('#Mensagens').show();
  $('#nbUsersDiv').show();
  $('#pseudoInput').hide();
  $('#pseudoSet').hide();
 $ ("#notify").html('');
}