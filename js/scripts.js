
var newGame = new Game();

var player1 = new Player("one");
var player2 = new Player("two");
var player3 = new Player("three");
var player4 = new Player("four");

function Game() {
  this.players = [],
  this.roleIds = [],
  this.currentId = -1
}

function Player(name,roleId) {
  this.name = name,
  this.roleId = roleId,
  this.playerStatus = true
}

Game.prototype.addPlayer = function(player){
    player.id = this.assignId();
    this.players.push(player);
}

Game.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

Game.prototype.assignRole = function() {
  for (var i = 0; i <= newGame.currentId; i++) {
    if (newGame.players[i].id === newGame.roleIds[0]) {
      newGame.players[i].roleId = "Bug";
    }else {newGame.players[i].roleId = "Dev"};
  }
}

Game.prototype.randomRoles = function(playerNumber) {
  for (var i = 1; i <= playerNumber; i++) {
    var randomRole = Math.floor(Math.random()* Math.floor(playerNumber));
    if (newGame.roleIds.includes(randomRole)) {
      i --
    }else{this.roleIds.push(randomRole)}
  }
}

newGame.randomRoles(4);
//Above starts game and assigns initial properties to players


//Countdown functions
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
            alert("Count Down Done!!");
            votePhase();
        }
    }, 1000);
}

window.onload = function () {
    var twoMinute = 100000 * 2,
        display = document.querySelector('#time');
    startTimer(twoMinute, display);
};

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

