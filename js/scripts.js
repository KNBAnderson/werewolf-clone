$(function(){
var playerTurn = [1, 2, 3, 4]
var location = 0
  // var newGame = new Game();
  $('form').submit(function(e) {
   e.preventDefault();
   for (let i = 1; i <= 4; i++) {
     var name = $('input#name' + i).val();
     // var player = new Player(name);
     // newGame.addPlayer();
   }
   // newGame.assignRole(4);

   window.location.href = "../werewolf-clone/night.html"
  });

  // $('.img').html('<img src="img/player' + i + '.png" alt="an avatar for player '+ i + '">')

  $('button.next-role').on('click',function(){
    console.log('you got here');
    $('#night-intro').hide();
    $('#night-begin-roles #night-player-intros').show();
    //This playerTurn array should actually be newGame.roleIds
    $('span.img').html('<img src="img/player' + playerTurn[location] + '.png" alt="an avatar for player" id="player-' + playerTurn[location] + '-img">');

  });

  $('#night-begin-roles').on('click', function(){
    $('button#continue-night').show();
  });

  $('button.continue-role').on('click', function() {
    //in real life playerTurn here should be newGame.player v
    if (playerTurn[location].role === 'Dev') {
      $('#night-begin-roles').hide();
      $('#developer').show();
      location++;
    } else if (playerTurn[location].role === 'Bug') {
      $('#night-begin-roles').hide();
      $('#bug').show();
      location++;
    } else if (!playerTurn[location].role) {
      location = 0;
      $('#night-player-intros').hide();
      $('#night-end-roles').show();
    }
  })

  $('button#begin-day').on('click', function() {
    window.location.href = "../werewolf-clone/day.html"
  })

});
