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
  this.roleId = roleId
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
