var newGame = new StartGame(4);
var voteVictim;

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
    if (newGame.players[i].roleId === "Bug" && newGame.players[i].playerStatus) {
      bugCount += 1;
    }else if (newGame.players[i].roleId === "Dev" && newGame.players[i].playerStatus) {
      devCount +=1;
    }
  }
  console.log(bugCount, devCount)
  if (bugCount === 0) {
     console.log('Devs won! Go back to work')
     return [true, "#dev-win"];
  } else if (bugCount >= devCount) {
    console.log("Bugs won! Let's be fair, this company sucked anyway");
    return [true, "#bug-win"];
  } else {
    return [false, 'continue'];
  }
}

function Player(name, i) {
  this.name = name,
  this.playerId = 0,
  this.roleId = "",
  this.voteCount = 0,
  this.playerStatus = true
  // this.playerImage = "<img src='img/player" + i + ".png' alt='player image'>"
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

// function maxVote() {
//   var highVote = newGame.players.reduce(function(previous, current) {
//     return (previous.voteCount > current.voteCount) ? previous : current;
//   })
//   for (var i = 0; i < newGame.playerTurns.length; i++){
//     if (newGame.playerTurns[i] === highVote.playerId){
//       newGame.playerTurns.splice(i, 1);
//       resetVoteCount();
//     }else if (THERE IS A TIE) {
//
//     }
//   }
// }


function voteCount(){
  if (newGame.players[0].voteCount > newGame.players[1].voteCount && newGame.players[0].voteCount > newGame.players[2].voteCount && newGame.players[0].voteCount > newGame.players[3].voteCount) {
    newGame.players[0].playerStatus = !newGame.players[0].playerStatus;
    for (var j = 0; j < newGame.playerTurns.length; j++){
      if (newGame.playerTurns[j] === 0){
        newGame.playerTurns.splice(j,1);
      }
    }
    resetVoteCount();
    voteVictim = 0;
    return "#vote-victim";
  } else if (newGame.players[1].voteCount > newGame.players[0].voteCount && newGame.players[1].voteCount > newGame.players[2].voteCount && newGame.players[1].voteCount > newGame.players[3].voteCount) {
    newGame.players[1].playerStatus = !newGame.players[1].playerStatus;
    for (var j = 0; j < newGame.playerTurns.length; j++){
      if (newGame.playerTurns[j] === 1){
        newGame.playerTurns.splice(j,1);
      }
    }
    resetVoteCount();
    voteVictim = 1;
    return "#vote-victim";
  } else if (newGame.players[2].voteCount > newGame.players[0].voteCount && newGame.players[2].voteCount > newGame.players[1].voteCount && newGame.players[2].voteCount > newGame.players[3].voteCount) {
    newGame.players[2].playerStatus = !newGame.players[2].playerStatus;
    for (var j = 0; j < newGame.playerTurns.length; j++){
      if (newGame.playerTurns[j] === 2){
        newGame.playerTurns.splice(j,1);
      }
    }
    resetVoteCount();
    voteVictim = 2;
    return "#vote-victim";
  } else if (newGame.players[3].voteCount > newGame.players[0].voteCount && newGame.players[3].voteCount > newGame.players[2].voteCount && newGame.players[3].voteCount > newGame.players[1].voteCount) {
    newGame.players[3].playerStatus = !newGame.players[3].playerStatus;
    for (var j = 0; j < newGame.playerTurns.length; j++){
      if (newGame.playerTurns[j] === 3){
        newGame.playerTurns.splice(j,1);
      }
    }
    resetVoteCount();
    voteVictim = 3;
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

function randomPhoto() {

}

//Countdown functions
function startTimer(seconds) {
  var counter = seconds;
  var interval = setInterval(() => {
    counter--
    $("#discussion").hide();
    $("#timeClock").html(counter);

    if (counter <= 0) {
      $('#day-intro').hide();
      $('#day-begin-roles').hide();
      $('#day-begin-roles').show();
      $('#day-voting').show();
      $("#discussion").show();
      $("#timeClock").hide();
      clearInterval(interval);
      };
    }, 1000);
  };

$(function(){
  var candidate;
  var voteClick;
  var location = 0;
  var twoMinute = 10;
  $('form').submit(function(e) {
    e.preventDefault();
    newGame.randomRoles(4);
    for (let i = 1; i <= 4; i++) {
      var name = $('input#name' + i).val();
      var player = new Player(name);
      player.addPlayer();
    }
    $('body').addClass('nightime')
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
      $('body').removeClass('nightime');
      $('body').addClass('daytime');
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
          $('.bug-candidates').append('<div class="d-inline-block"><img src="img/player' + tempArray[i] + '.png" alt="an avatar for player' + tempArray[i] + '" class="img-sm-bug" id="bug-candidate' + tempArray[i] + '" value="' + tempArray[i] + '"><br><span class="name">' + newGame.players[tempArray[i]].name + '</span></div>');
        }
      }
      $('img.img-sm-bug').on('click', function() {
        candidate = parseInt($(this).attr('value'));
        $('#bug-end-turn').show();
        $('.bug-candidates').hide();

      });
      $('#night-player-intros').hide();
      $('#bug').show();
      location++;
    }
  })

  $('#bug-end-turn').on('click', function() {
    $('#bug-end-turn').hide();
    $('.bug-candidates').html("").show();
  })

  $('button#begin-day').on('click', function() {
    bugPower(candidate);
    $('#victim').text(newGame.players[candidate].name);
    $('span#bug-victim-img').html('<img src="img/player' + candidate + '.png" alt="victim image" class="player-img" id="victim-img">');
    $('#night-end-roles').hide();
    $('#day-intro').show();
    var twoMinute = 10;
    // startTimer(twoMinute);
    // display = document.querySelector('#time');
  })

  $('button#bug-victim-accept').on('click', function() {
    if(!newGame.gameOver()[0]) {
      $('#begin-discussion').show();
      $('#time').show();
      $('#bug-victim').hide();
    } else if (newGame.gameOver()[0]) {
      $('#vote-result').hide();
      $('#end-game, ' + newGame.gameOver()[1]).show();
    }
  })

  $("#discussion").on("click", function() {
    twoMinute = 10;
    $("#timeClock").show();
    display = document.querySelector('#timeClock');
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
        voteClick = parseInt($(this).attr('value'));
        console.log
        voteCollect(voteClick);
        location++
        $('#day-player-img, .candidates').html('');
        votePopulate()
      });
    } else {
      var voteOutcome = voteCount();
      if (voteVictim) {
        $(voteOutcome).show();
        $('#vote-victim-name').text(newGame.players[voteVictim].name);
        $('span#vote-victim-img').html('<img src="img/player' + voteVictim + '.png" alt="victim image" class="player-img" id="victim-img">');
      } else {
        $(voteOutcome).show();
      }
      console.log('all votes done', voteVictim);
      $('.player-vote').hide();
      $('#vote-result').show();
      location = 0;
    }
  })

  $('#day-end').on('click', function() {
    if(!newGame.gameOver()[0]) {
      $('body').addClass('nightime');
      $('#vote-result').hide();
      $('#day-end-roles').show();
    } else if (newGame.gameOver()[0]) {
      $('#vote-result').hide();
      $('#end-game, ' + newGame.gameOver()[1]).show();
    }
  })

  $('#day-end-begin-night').on('click', function() {
      $('#day-end-roles').hide();
      $('#night-intro').show();
  })

});
