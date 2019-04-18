var newGame = new StartGame(4);

function StartGame(numberOfPlayers) {
  this.players = [],
  this.roleIds = [],
  this.playerTurns = [],
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

StartGame.prototype.gameOver = function() {
    var bugCount = 0;
    var devCount = 0;
  for (let i = 0; i <= newGame.players.length - 1; i++) {
    if (newGame.players[i].roleId === "Bug") {
      bugCount += 1;
    }else if (newGame.players[i].roleId === "Dev" && newGame.players[i].playerStatus)
      devCount +=1;
  }
  if (bugCount === 0) {
     console.log('Devs won! Go back to work')
     return [true, "#bug-win"];
  } else if (bugCount >= devCount) {
    console.log("Bugs won! Let's be fair, this company sucked anyway");
    return [true, "#dev-win"];
  } else {
    return [false, 'continue'];
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
  newGame.playerTurns.push(this.playerId);
  this.assignRole();
}

Player.prototype.assignRole = function() {
  for (let i = 0; i <= this.playerId; i++) {
    if (this.playerId === newGame.roleIds[0]) {
      this.roleId = "Bug";
    }else {this.roleId = "Dev"};
  }
}
//Above starts game and assigns initial properties to players

//Function for the Bug to vote
function bugPower(playerId){
  for (let i = 0; i < newGame.players.length; i++){
    if (newGame.players[i].playerId === playerId){
      newGame.players[i].playerStatus = false;
      for (var j = 0; j < newGame.playerTurns.length; j++){
        if (newGame.playerTurns[j] === playerId){
          newGame.playerTurns.splice(j,1);

        }
      }
    }
  }
}
//Player vote function
function voteCollect(playerId) {
  for (let i = 0; i < newGame.players.length; i++) {
    if (newGame.players[i].playerId === playerId){
      newGame.players[i].voteCount += 1;
      console.log('vote counted');
    }
  }
}


function voteCount(){
  if (newGame.players[0].voteCount > newGame.players[1].voteCount && newGame.players[0].voteCount > newGame.players[2].voteCount && newGame.players[0].voteCount > newGame.players[3].voteCount) {
    newGame.players[0].playerStatus = !newGame.players[0].playerStatus;
    for (var j = 0; j < newGame.playerTurns.length; j++){
      if (newGame.playerTurns[j] === 0){
        newGame.playerTurns.splice(j,1);
      }
    }
    // newGame.playerTurns.splice(0,1);
    resetVoteCount();
    return "#vote-victim";
  } else if (newGame.players[1].voteCount > newGame.players[0].voteCount && newGame.players[1].voteCount > newGame.players[2].voteCount && newGame.players[1].voteCount > newGame.players[3].voteCount) {
    newGame.players[1].playerStatus = !newGame.players[1].playerStatus;
    for (var j = 0; j < newGame.playerTurns.length; j++){
      if (newGame.playerTurns[j] === 1){
        newGame.playerTurns.splice(j,1);
      }
    }
    // newGame.playerTurns.splice(1,1);
    resetVoteCount();
    return "#vote-victim";
  } else if (newGame.players[2].voteCount > newGame.players[0].voteCount && newGame.players[2].voteCount > newGame.players[1].voteCount && newGame.players[2].voteCount > newGame.players[3].voteCount) {
    newGame.players[2].playerStatus = !newGame.players[2].playerStatus;
    for (var j = 0; j < newGame.playerTurns.length; j++){
      if (newGame.playerTurns[j] === 2){
        newGame.playerTurns.splice(j,1);
      }
    }
    // newGame.playerTurns.splice(2,1);
    resetVoteCount();
    return "#vote-victim";
  } else if (newGame.players[3].voteCount > newGame.players[0].voteCount && newGame.players[3].voteCount > newGame.players[2].voteCount && newGame.players[3].voteCount > newGame.players[1].voteCount) {
    newGame.players[3].playerStatus = !newGame.players[3].playerStatus;
    for (var j = 0; j < newGame.playerTurns.length; j++){
      if (newGame.playerTurns[j] === 3){
        newGame.playerTurns.splice(j,1);
      }
    }
    // newGame.playerTurns.splice(3,1);
    resetVoteCount();
    return "#vote-victim";
  } else {
    resetVoteCount();
    return "#vote-draw";
  }
}
function resetVoteCount() {
  for (var i = 0; i < newGame.players.length; i++){
    newGame.players[i].voteCount = 0;
  }
}
//Countdown functions
function startTimer(seconds) {
  var counter = seconds;
  var interval = setInterval(() => {
    counter--
    $("#discussion").hide();
    $("#time").html(counter);
    if (counter < 0) {
      $('#day-intro').hide();
        $('#day-begin-roles').hide();
        $('#day-begin-roles').show();
        $('#day-voting').show();

        clearInterval(interval);
      };
    }, 1000);
  };

$(function(){
  var candidate;
  var location = 0;
  $('form').submit(function(e) {
    e.preventDefault();
    newGame.randomRoles(4);
    for (let i = 1; i <= 4; i++) {
      var name = $('input#name' + i).val();
      var player = new Player(name);
      player.addPlayer();
    }
    $('form').hide();
    $('#night-intro').show();
  });

  $('button.next-role').on('click',function(){
    // console.log(newGame.playerTurns[location]);
    if(newGame.playerTurns[location] || newGame.playerTurns[location] === 0) {
      $('#night-intro').hide();
      $('.role').hide();
      $('button#continue-night').hide();
      $('span.img').html('<img src="img/player' + newGame.playerTurns[location] + '.png" alt="an avatar for player" id="player-' + newGame.playerTurns[location] + '-img" class="player-img">');
      $('span.img').append('<p class="name">' + newGame.players[newGame.playerTurns[location]].name + '</p>');
      $('#night-begin-roles #night-player-intros').show();
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
    if (newGame.players[newGame.playerTurns[location]].roleId === 'Dev') {
      $('#night-player-intros').hide();
      $('#developer').show();
      location++;
    } else if (newGame.players[newGame.playerTurns[location]].roleId === 'Bug') {
      let tempArray = newGame.playerTurns
      for (let i = 0; i <= newGame.playerTurns.length - 1; i++) {
        if (tempArray[i] !== newGame.playerTurns[location]) {
          $('.bug-candidates').append('<div class="d-inline-block"><img src="img/player' + tempArray[i] + '.png" alt="an avatar for player' + tempArray[i] + '" class="img-sm-bug" id="bug-candidate' + tempArray[i] + '" value="' + tempArray[i] + '"><br><span class="name">' + newGame.players[i].name + '</span></div>');
          console.log(newGame.players[i].name);
        }
      }
      $('img.img-sm-bug').on('click', function() {
        candidate = parseInt($(this).attr('value'));
        $('.bug-candidates').hide();

      });
      $('#night-player-intros').hide();
      $('#bug').show();
      location++;
    }
  })

  $('#bug-end-turn').on('click', function() {
    $('.bug-candidates').html("").show();
  })

  $('button#begin-day').on('click', function() {
    bugPower(candidate);
    $('#victim').text(newGame.players[candidate].name);
    $('span#bug-victim-img').html('<img src="img/player' + candidate + '.png" alt="victim image" class="player-img" id="victim-img">');
    $('#night-end-roles').hide();
    $('#day-intro').show();
    var twoMinute = 4;
    display = document.querySelector('#time');
  })

  $('button#bug-victim-accept').on('click', function() {
    $('#begin-discussion').show();
    $('#time').show();
    $('#bug-victim').hide();
    startTimer(twoMinute);
  })

  $("#discussion").on("click", function() {
    var twoMinute = 4;
    display = document.querySelector('#time');
    startTimer(twoMinute);
  })

  $('button#begin-vote').on('click', function votePopulate() {
    $('#day-voting').hide();
    if(newGame.playerTurns[location] || newGame.playerTurns[location] === 0) {
      $('.player-vote').show();



      $('#day-player-img').html('<img src="img/player' + newGame.playerTurns[location] + '.png" alt="an avatar for player" id="player-' + newGame.playerTurns[location] + '-img" class="player-img">');
      $('#day-player-img').append('<p class="name">' + newGame.players[newGame.playerTurns[location]].name + '</p>');
      let tempArray = newGame.playerTurns;
      for (let i = 0; i <= newGame.playerTurns.length - 1; i++) {
        if (tempArray[i] !== newGame.playerTurns[location]) {
          $('.candidates').append('<div class="d-inline-block"><img src="img/player' + tempArray[i] + '.png" alt="an avatar for player' + tempArray[i] + '" class="img-sm" id="candidate' + tempArray[i] + '" value="' + tempArray[i] + '"><br><span class="name">' + newGame.players[tempArray[i]].name + '</span></div>');
        }
      }
      $('img.img-sm').on('click', function() {
        candidate = parseInt($(this).attr('value'));
        voteCollect(candidate);
        location++
        $('#day-player-img, .candidates').html('');
        votePopulate()
      });
    } else {
      console.log('all votes done');
      $('#vote-victim-name').text(newGame.players[candidate].name);
      $('span#vote-victim-img').html('<img src="img/player' + candidate + '.png" alt="victim image" class="player-img" id="victim-img">');
      $('.player-vote').hide();
      $('#vote-result').show();
      $(voteCount()).show();
      location = 0;
    }
  })

  $('#day-end').on('click', function() {
    newGame.gameOver();
    $('#vote-result').hide();
    $('#day-end-roles').show();
  })

  $('#day-end-begin-night').on('click', function() {
    if(!newGame.gameOver()[0]) {
      $('#day-end-roles').hide();
      $('#night-intro').show();
    } else if (newGame.gameOver()[0]) {
      $('#day-end-roles').hide();
      $('#end-game, ' + newGame.gameOver()[1]).show();
    }
  })

});
