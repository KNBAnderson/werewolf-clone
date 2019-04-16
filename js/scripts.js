var newGame = new StartGame(4);
var player1 = new Player("q")
var player2 = new Player("w")
var player3 = new Player("e")
var player4 = new Player("r")


function StartGame(numberOfPlayers) {
  this.players = [],
  this.deadPlayers = [],
  this.roleIds = [],
  this.numberOfPlayers = numberOfPlayers
}

StartGame.prototype.randomRoles = function(numberOfPlayers) {
  for (var i = 1; i <= numberOfPlayers; i++) {
    var randomRole = Math.floor(Math.random()* Math.floor(numberOfPlayers));
    if (this.roleIds.includes(randomRole)) {
      i --
    } else{this.roleIds.push(randomRole)
    }
  }
}

function Player(name) {
  this.name = name,
  this.playerId = 0,
  this.roleId = "",
  this.voteCount = 0,
  this.playerStatus = true
}

Player.prototype.addPlayer = function () {
  this.playerId += newGame.players.length;
  newGame.players.push(this);
  this.assignRole();
}

Player.prototype.assignRole = function() {
  for (var i = 0; i <= this.playerId; i++) {
    if (this.playerId === newGame.roleIds[0]) {
      this.roleId = "Bug";
    }else {this.roleId = "Dev"};
  }
}
//Above starts game and assigns initial properties to players

//Function for the Bug to vote
function bugVote(playerId){
  for (i = 0; i < newGame.players.length; i++){
    if (newGame.players[i].playerId === playerId){
      newGame.players[i].playerStatus = !newGame.players[i].playerStatus;
      var latestVictim = newGame.players.slice(i,i+1);
      newGame.deadPlayers.unshift(latestVictim);
      newGame.players.splice(i,1);
    }
  }
  //this may need a line to update game???
}
//Player vote function
function voteCollect(playerId) {
  for (i = 0; i < newGame.players.length; i++) {
    if (newGame.players[i].playerId === playerId){
      newGame.players[i].voteCount += 1;
    }
  }
}

function voteCount(){
  if (newGame.players[0].voteCount > newGame.players[1].voteCount && newGame.players[0].voteCount > newGame.players[2].voteCount && newGame.players[0].voteCount > newGame.players[3].voteCount) {
    newGame.players[0].playerStatus = !newGame.players[0].playerStatus;
    var latestVictim = newGame.players.slice(0,1);
    newGame.deadPlayers.unshift(latestVictim);
    newGame.players.splice(0,1);
  } else if (newGame.players[1].voteCount > newGame.players[0].voteCount && newGame.players[1].voteCount > newGame.players[2].voteCount && newGame.players[1].voteCount > newGame.players[3].voteCount) {
    newGame.players[1].playerStatus = !newGame.players[1].playerStatus;
    var latestVictim = newGame.players.slice(1,2);
    newGame.deadPlayers.unshift(latestVictim);
    newGame.players.splice(1,1);
  } else if (newGame.players[2].voteCount > newGame.players[0].voteCount && newGame.players[2].voteCount > newGame.players[1].voteCount && newGame.players[2].voteCount > newGame.players[3].voteCount) {
    newGame.players[2].playerStatus = !newGame.players[2].playerStatus;
    var latestVictim = newGame.players.slice(2,3);
    newGame.deadPlayers.unshift(latestVictim);
    newGame.players.splice(2,1);
  } else if (newGame.players[3].voteCount > newGame.players[0].voteCount && newGame.players[3].voteCount > newGame.players[2].voteCount && newGame.players[3].voteCount > newGame.players[1].voteCount) {
    newGame.players[3].playerStatus = !newGame.players[3].playerStatus;
    var latestVictim = newGame.players.slice(3,4);
    newGame.deadPlayers.unshift(latestVictim);
    newGame.players.splice(3,1);
  }
}

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

$(function(){
  newGame.randomRoles(4);
  var location = 0
  var retrievedNewGame = localStorage.getItem('newGame');
  $('form').submit(function(e) {
   e.preventDefault();
   newGame.randomRoles(4);
   for (let i = 1; i <= 4; i++) {
     var name = $('input#name' + i).val();
     var player = new Player(name);
     player.addPlayer();
   }
   localStorage.setItem('newGame', JSON.stringify(newGame));
   window.location.href = "../werewolf-clone/night.html"
  });


  // $('.img').html('<img src="img/player' + i + '.png" alt="an avatar for player '+ i + '">')

  $('button.next-role').on('click',function(){
    console.log(JSON.parse(retrievedNewGame));
    console.log('you got here');
    $('#night-intro').hide();
    $('#night-begin-roles #night-player-intros').show();
    //This playerTurn array should actually be newGame.roleIds
    // $('span.img').html('<img src="img/player' + playerTurn[location] + '.png" alt="an avatar for player" id="player-' + playerTurn[location] + '-img">');

  });

  $('#night-begin-roles').on('click', function(){
    $('button#continue-night').show();
  });

  // $('button.continue-role').on('click', function() {
  //   //in real life playerTurn here should be newGame.player v
  //   if (playerTurn[location].role === 'Dev') {
  //     $('#night-begin-roles').hide();
  //     $('#developer').show();
  //     location++;
  //   } else if (playerTurn[location].role === 'Bug') {
  //     $('#night-begin-roles').hide();
  //     $('#bug').show();
  //     location++;
  //   } else if (!playerTurn[location].role) {
  //     location = 0;
  //     $('#night-player-intros').hide();
  //     $('#night-end-roles').show();
  //   }
  // })

  $('button#begin-day').on('click', function() {
    window.location.href = "../werewolf-clone/day.html"
  })

  $("#discussion").on("click", function() {

    var twoMinute = 60* 2,
        display = document.querySelector('#time');
    startTimer(twoMinute, display);

  })

});
