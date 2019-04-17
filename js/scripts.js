var newGame = new StartGame(4);

function StartGame(numberOfPlayers) {
  this.players = [],
  this.deadPlayers = [],
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
      newGame.players[i].playerStatus = !newGame.players[i].playerStatus;
      var latestVictim = newGame.players.slice(i,i+1);
      // newGame.deadPlayers.unshift(latestVictim);
      // newGame.players.splice(i,1);
      newGame.playerTurns.splice(i,1);
    }
  }
  //this may need a line to update game???
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




//We could pop this function into the UI easily if it also returned a string of either '#vote-draw' or '#vote-victim'. Then we could just run the function, and whatever value it returned would be in $(returnedValue).show(); and the right div would show
function voteCount(){
  if (newGame.players[0].voteCount > newGame.players[1].voteCount && newGame.players[0].voteCount > newGame.players[2].voteCount && newGame.players[0].voteCount > newGame.players[3].voteCount) {
    newGame.players[0].playerStatus = !newGame.players[0].playerStatus;
    var latestVictim = newGame.players.slice(0,1);
    // newGame.deadPlayers.unshift(latestVictim);
    // newGame.players.splice(0,1);
    newGame.playerTurns.splice(0,1);
    resetVoteCount();
    return "#vote-victim";
  } else if (newGame.players[1].voteCount > newGame.players[0].voteCount && newGame.players[1].voteCount > newGame.players[2].voteCount && newGame.players[1].voteCount > newGame.players[3].voteCount) {
    newGame.players[1].playerStatus = !newGame.players[1].playerStatus;
    var latestVictim = newGame.players.slice(1,2);
    // newGame.deadPlayers.unshift(latestVictim);
    // newGame.players.splice(1,1);
    newGame.playerTurns.splice(1,1);
    resetVoteCount();
    return "#vote-victim";
  } else if (newGame.players[2].voteCount > newGame.players[0].voteCount && newGame.players[2].voteCount > newGame.players[1].voteCount && newGame.players[2].voteCount > newGame.players[3].voteCount) {
    newGame.players[2].playerStatus = !newGame.players[2].playerStatus;
    var latestVictim = newGame.players.slice(2,3);
    // newGame.deadPlayers.unshift(latestVictim);
    // newGame.players.splice(2,1);
    newGame.playerTurns.splice(2,1);
    resetVoteCount();
    return "#vote-victim";
  } else if (newGame.players[3].voteCount > newGame.players[0].voteCount && newGame.players[3].voteCount > newGame.players[2].voteCount && newGame.players[3].voteCount > newGame.players[1].voteCount) {
    newGame.players[3].playerStatus = !newGame.players[3].playerStatus;
    var latestVictim = newGame.players.slice(3,4);
    // newGame.deadPlayers.unshift(latestVictim);
    // newGame.players.splice(3,1);
    newGame.playerTurns.splice(3,1);
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
  // var retrievedNewGame = localStorage.getItem('newGame');
  // var newGame1 = JSON.parse(retrievedNewGame);
  // var playerTurn = [1, 2, 3, 4];
  $('form').submit(function(e) {
    e.preventDefault();
    // debugger;
    newGame.randomRoles(4);
    for (let i = 1; i <= 4; i++) {
      var name = $('input#name' + i).val();
      var player = new Player(name);
      player.addPlayer();
    }
    // localStorage.setItem('newGame', JSON.stringify(newGame));
    $('form').hide();
    $('#night-intro').show();
  });



  // $('.img').html('<img src="img/player' + i + '.png" alt="an avatar for player '+ i + '">')

  $('button.next-role').on('click',function(){
    console.log(newGame.playerTurns[location]);
    if(newGame.playerTurns[location] || newGame.playerTurns[location] === 0) {
      $('#night-intro').hide();
      $('.role').hide();
      $('button#continue-night').hide();
      $('span.img').html('<img src="img/player' + newGame.playerTurns[location] + '.png" alt="an avatar for player" id="player-' + newGame.playerTurns[location] + '-img" class="player-img">');
      $('span.img').append('<p>' + newGame.players[location].name + '</p>');
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
    if (newGame.players[location].roleId === 'Dev') {
      $('#night-player-intros').hide();
      $('#developer').show();
      location++;
    } else if (newGame.players[location].roleId === 'Bug') {
      let tempArray = newGame.playerTurns
      for (let i = 0; i <= newGame.playerTurns.length - 1; i++) {
        if (tempArray[i] !== newGame.playerTurns[location]) {
          $('.bug-candidates').append('<div class="d-inline-block"><img src="img/player' + newGame.playerTurns[i] + '.png" alt="an avatar for player' + newGame.playerTurns[i] + '" class="img-sm-bug" id="bug-candidate' + newGame.playerTurns[i] + '" value="' + newGame.playerTurns[i] + '"><br><span>' + newGame.players[i].name + '</span></div>');
          // $('.bug-candidates').append('<p>' + newGame.players[i].name + '</p>');
        }
      }
      $('img.img-sm-bug').on('click', function() {
        var candidate = parseInt($(this).attr('value'));
        bugPower(candidate);
        $('.bug-candidates').hide();

      });
      $('#night-player-intros').hide();
      $('#bug').show();
      location++;
    }
  })

  $('#bug-end-turn').on('click', function() {
    $('.bug-candidates').html("");
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

    var twoMinute = 1 * 2,
    display = document.querySelector('#time');
    startTimer(twoMinute, display);
  })

  $('button#begin-vote').on('click', function votePopulate() {
    $('#day-voting').hide();
    if(newGame.playerTurns[location] || newGame.playerTurns[location] === 0) {
      $('.player-vote').show();
      $('#day-player-img').html('<img src="img/player' + newGame.playerTurns[location] + '.png" alt="an avatar for player" id="player-' + newGame.playerTurns[location] + '-img" class="player-img">');
      //playerTurn link to status=employed array
      let tempArray = newGame.playerTurns;
      for (let i = 0; i <= newGame.playerTurns.length - 1; i++) {
        if (tempArray[i] !== newGame.playerTurns[location]) {
          $('.candidates').append('<img src="img/player' + newGame.playerTurns[i] + '.png" alt="an avatar for player' + newGame.playerTurns[i] + '" class="img-sm" id="candidate' + newGame.playerTurns[i] + '" value="' + newGame.playerTurns[i] + '">');
        }
      }
      $('img.img-sm').on('click', function() {
        var candidate = parseInt($(this).attr('value'));
        voteCollect(candidate);
        location++
        $('#day-player-img, .candidates').html('');
        votePopulate()
      });
    } else {
      console.log('all votes done');
      location = 0;
      $('.player-vote').hide();
      $('#vote-result').show();
      $(voteCount()).show();
    }
  })


  //
  // $('button.continue-role').on('click', function() {
  //
  //     let tempArray = newGame.playerTurns
  //     for (let i = 0; i <= newGame.playerTurns.length - 1; i++) {
  //       if (tempArray[i] !== newGame.playerTurns[location]) {
  //         $('.bug-candidates').append('<img src="img/player' + newGame.playerTurns[i] + '.png" alt="an avatar for player' + newGame.playerTurns[i] + '" class="img-sm" id="candidate' + newGame.playerTurns[i] + '" value="' + newGame.playerTurns[i] + '">');
  //
  // })




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
