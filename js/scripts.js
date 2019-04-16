var player1 = new Player("qw")
var player2 = new Player("as")
var player3 = new Player("zx")
var player4 = new Player("nm")
var newGame = new StartGame(4);

StartGame.prototype.randomRoles = function(numberOfPlayers) {
  for (var i = 1; i <= numberOfPlayers; i++) {
    var randomRole = Math.floor(Math.random()* Math.floor(numberOfPlayers));
    if (this.roleIds.includes(randomRole)) {
      i --
    }else{this.roleIds.push(randomRole)
    }
  }
}

function StartGame(numberOfPlayers) {
  this.players = [],
  this.roleIds = randomRoles(numberOfPlayers),
  this.numberOfPlayers = numberOfPlayers
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
            alert("Count Down Done!!");
            votePhase();
        }
    }, 1000);
}

$(document).ready(function() {
  $("#discussion").on("click", function() {

    var twoMinute = 60* 2,
        display = document.querySelector('#time');
    startTimer(twoMinute, display);
  })
})
// window.onload = function () {
//     var twoMinute = 60* 2,
//         display = document.querySelector('#time');
//     startTimer(twoMinute, display);
// };
