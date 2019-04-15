$(function(){

  // var newGame = new Game();
  $('form').submit(function(e) {
   e.preventDefault();
   for (let i = 1; i <= 4; i++) {
     var name = $('input#name' + i).val();
     // var player = new Player(name);
     // newGame.addPlayer();
   }
   // newGame.assignRole();
   // window.location.href = "../werewolf-clone/night.html"
  });

  // $('.img').html('<img src="img/player' + i + '.png" alt="an avatar for player '+ i + '">')

  $('button#begin-night').on('click',function(){
    $('#night-intro').hide();
    $('#night-begin-roles, #night-player-intros').show();

      $('span.img').html('<img src="img/player1.png" alt="an avatar for player" id="player-1-img">')
      $('img#player-1-img').on('click', function(){
        $('button#continue-night').show();
      });
      $('button#continue-night').on('click', function() {
        console.log('you got here');
      })

  })
var location = 0;
function playerTurn(player){
  location++;
  var role = player.role;
  if (role === 'Bug') {
    bugTurn();
  }  else if (role === 'Dev') {
    devTurn();
  }
  // click on start turn ->

}
playerTurn(newGame.players[location]);



});
