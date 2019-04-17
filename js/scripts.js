var newGame = new StartGame(4);
var player1 = new Player("q")
var player2 = new Player("w")
var player3 = new Player("e")
var player4 = new Player("r")



function StartGame(numberOfPlayers) {
  this.players = [],
  this.deadPlayers = [],
  this.roleIds = [],
  this.voteCountRun = 0,
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

newGame.randomRoles(4);
player1.addPlayer();
player2.addPlayer();
player3.addPlayer();
player4.addPlayer();



//Function for the Bug to vote
function bugPower(playerId){
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
  newGame.voteCountRun += 1;
  if (newGame.players.length === newGame.voteCountRun) {
    voteCount();
  }
}




//We could pop this function into the UI easily if it also returned a string of either '#vote-draw' or '#vote-victim'. Then we could just run the function, and whatever value it returned would be in $(returnedValue).show(); and the right div would show
function voteCount(){
  if (newGame.players[0].voteCount > newGame.players[1].voteCount && newGame.players[0].voteCount > newGame.players[2].voteCount && newGame.players[0].voteCount > newGame.players[3].voteCount) {
    newGame.players[0].playerStatus = !newGame.players[0].playerStatus;
    var latestVictim = newGame.players.slice(0,1);
    newGame.deadPlayers.unshift(latestVictim);
    newGame.players.splice(0,1);
    newGame.voteCountRun = 0;
    return "#vote-victim";
  } else if (newGame.players[1].voteCount > newGame.players[0].voteCount && newGame.players[1].voteCount > newGame.players[2].voteCount && newGame.players[1].voteCount > newGame.players[3].voteCount) {
    newGame.players[1].playerStatus = !newGame.players[1].playerStatus;
    var latestVictim = newGame.players.slice(1,2);
    newGame.deadPlayers.unshift(latestVictim);
    newGame.players.splice(1,1);
    newGame.voteCountRun = 0;
    return "#vote-victim";
  } else if (newGame.players[2].voteCount > newGame.players[0].voteCount && newGame.players[2].voteCount > newGame.players[1].voteCount && newGame.players[2].voteCount > newGame.players[3].voteCount) {
    newGame.players[2].playerStatus = !newGame.players[2].playerStatus;
    var latestVictim = newGame.players.slice(2,3);
    newGame.deadPlayers.unshift(latestVictim);
    newGame.players.splice(2,1);
    newGame.voteCountRun = 0;
    return "#vote-victim";
  } else if (newGame.players[3].voteCount > newGame.players[0].voteCount && newGame.players[3].voteCount > newGame.players[2].voteCount && newGame.players[3].voteCount > newGame.players[1].voteCount) {
    newGame.players[3].playerStatus = !newGame.players[3].playerStatus;
    var latestVictim = newGame.players.slice(3,4);
    newGame.deadPlayers.unshift(latestVictim);
    newGame.players.splice(3,1);
    newGame.voteCountRun = 0;
    return "#vote-victim";
  } else {
    newGame.voteCountRun = 0;
    return "#vote-draw";
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
      $('#day-intro').hide();
      $('#day-begin-roles').show();
    }
  }, 1000);
}

$(function(){
  // newGame.randomRoles(4);
  var location = 0
  var retrievedNewGame = localStorage.getItem('newGame');
  var newGame1 = JSON.parse(retrievedNewGame);
  var playerTurn = [1, 2, 3, 4];
  $('form').submit(function(e) {
    e.preventDefault();
    // debugger;
    newGame.randomRoles(4);
    for (let i = 1; i <= 4; i++) {
      var name = $('input#name' + i).val();
      console.log(name);
      var player = new Player(name);
      player.addPlayer();
    }
    localStorage.setItem('newGame', JSON.stringify(newGame));
    $('form').hide();
    $('#night-intro').show();
  });



  // $('.img').html('<img src="img/player' + i + '.png" alt="an avatar for player '+ i + '">')

  $('button.next-role').on('click',function(){
    if(playerTurn[location]) {
      $('#night-intro').hide();
      $('.role').hide();
      $('button#continue-night').hide();
      $('#night-begin-roles #night-player-intros').show();
      //This playerTurn array should actually be newGame.roleIds
      $('span.img').html('<img src="img/player' + playerTurn[location] + '.png" alt="an avatar for player" id="player-' + playerTurn[location] + '-img" class="player-img">');
      $('span.img').append('<p>' + newGame1.players[location].name + '</p>');
    }
    else {
      location = 0;
      $('#night-end-roles').show();
      $('.role').hide();
    }
  });

  $('#night-player-img').on('click', function(){
    $('button#continue-night').show();
  });

  $('button.continue-role').on('click', function() {
    console.log(newGame1);
    //in real life playerTurn here should be newGame.player v

    if (newGame1.players[location].roleId === 'Dev') {
      console.log('dev');
      $('#night-player-intros').hide();
      $('#developer').show();
      location++;
    } else if (newGame1.players[location].roleId === 'Bug') {
      console.log('bug');
      $('#night-player-intros').hide();
      $('#bug').show();
      location++;
    }
  })

  $('button#begin-day').on('click', function() {
    // $('#victim').text(bugPower()[0]);
    console.log('test');
    // $('span.night-victim-img').append('<img src=' + (WHATEVER[1] + 1) + 'alt="victim image" id="victim-img">');
    $('#night-end-roles').hide();
    $('#day-intro').show();
  })

  $('button#bug-victim-accept').on('click', function() {
    $('#begin-discussion').show();
    $('#time').show();
    $('#bug-victim').hide();
  })


  $("#discussion").on("click", function() {

    var twoMinute = 1* 2,
    display = document.querySelector('#time');
    startTimer(twoMinute, display);
  })

  $('button#begin-vote').on('click', function votePopulate() {
    $('#day-voting').hide();
    if(playerTurn[location]) {
      $('.player-vote').show();
      $('#day-player-img').html('<img src="img/player' + playerTurn[location] + '.png" alt="an avatar for player" id="player-' + playerTurn[location] + '-img" class="player-img">');
      //playerTurn link to status=employed array
      for (let i = 1; i <= 4; i++) {
        if (i !== playerTurn[location]) {
          $('.candidates').append('<img src="img/player' + i + '.png" alt="an avatar for player' + i + '" class="img-sm" id="candidate' + i + '" value="' + i + '">');
        }
      }
      $('img.img-sm').on('click', function() {
        var candidate = $(this).attr('value');
//I need help getting this to work. I cant find if/where this is being updated. Minus 1 for 0 index ?
        voteCollect(candidate-1);
//^^^^
        location++
        $('#day-player-img, .candidates').html('');
        votePopulate()
      });
    } else {
      console.log('all votes done');
      location = 0;
      $('.player-vote').hide();
      $('#vote-result').show();
      // $(voteCount()).show();
    }
  })

  $('#day-end').on('click', function() {
    $('#vote-result').hide();
    $('#day-end-roles').show();
  })

  $('#day-end-begin-night').on('click', function() {
    $('#day-end-roles').hide();
    $('#night-intro').show();
  })







  // location++

});
