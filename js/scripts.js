var newGame = new StartGame(4);

function StartGame(numberOfPlayers) {
  this.players = [],
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
  var location = 0
  var retrievedNewGame = localStorage.getItem('newGame');
  var newGame1 = JSON.parse(retrievedNewGame);
  var playerTurn = [1, 2, 3, 4];
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
    if(newGame1.players[location]) {
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
    // $('#victim').text(bugVote()[0]);
    console.log('test');
    // $('span.night-victim-img').append('<img src=' + (WHATEVER[1] + 1) + 'alt="victim image" id="victim-img">');
    window.location.href = "../werewolf-clone/day.html"
  })

  $('button#victim-accept').on('click', function() {
    $('#begin-discussion').show();
    $('#time').show();
    $('#bug-victim').hide();
    console.log('test');
  })


  $("#discussion").on("click", function() {

    var twoMinute = 1* 2,
        display = document.querySelector('#time');
    startTimer(twoMinute, display);
  })

  // $('button#begin-vote').on('click', function() {
  //   $('#day-player-img').html('<img src="img/player' + playerTurn[location] + '.png" alt="an avatar for player" id="player-' + playerTurn[location] + '-img" class="player-img">');
  //   $('span.img').append('<p>' + newGame1.players[location].name + '</p>');
  // })
});
