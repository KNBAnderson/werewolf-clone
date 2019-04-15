var newGame = new Game();


function Game() {
  this.numOfPlayers = 0,
  this.players = [],
  this.day = false,
  this.currentId = 0,
  this.roles = []
}

function Player(name, statusEffects, roles) {
  this.name = name,
  this.employmentStatus = true,
  this.statusEffects = [],
  this.playerId = 0,
  this.roles = []
  this.addRoles(roles);
}

Player.prototype.addRoles = function(roles) {
this.playerId += newGame.players.length
for (var i = 0; i <= newGame.numOfPlayers; i++){
  this.roles.push(newGame.roles[VAR FROM OTHER]);
}


Game.prototype.addPlayer = function(playerObject) {
  playerObject.id = this.assignId();
  this.players.push(playerObject)
}

Game.prototype.changeTime = function() {
  this.day = !this.day;
}

Game.prototype.assignId() = function {

}

Game.prototype.rolesAvailable = function(game) {
      game.roles.push("Bug", "Dev", "Dev", "Dev");
}
