$(function(){

  // var newGame = new Game();
  $('form').submit(function(e) {
   e.preventDefault();
   for (let i = 1; i <= 4; i++) {
     var name = $('input#name' + i).val();
     // var player = new Player(name);
     // player.assignRole();
   }
   // window.location.href = "../werewolf-clone/night.html"
  });

  // $('.img').html('<img src="img/player' + i + '.png" alt="an avatar for player '+ i + '">')

});
