var minHeight = 20;
var maxHeight = 100;
var minWidth = 10;
var maxWidth = 20;
var minGap = 200;
var maxGap = 500;

var myObstacles = [];

var gameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.height = 500;
    this.canvas.width = 1200;
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.context = this.canvas.getContext("2d");
    myObstacles.push(new obstacle());
    this.interval = setInterval(this.updateGameArea, 5);
  },
  updateGameArea: function() {
    gameArea.clear()
    myObstacles[0].x -= 1;
    myObstacles[0].draw();
  },
  clear: function() {
    gameArea.context.clearRect(0,0,this.canvas.width, this.canvas.height);
  },
  stop: function() {

  }
};

function startGame() {
  gameArea.start();
}

function obstacle() {
  this.height = Math.floor(minHeight + Math.random() * (maxHeight - minHeight + 1));
  this.width = Math.floor(minWidth + Math.random() * (maxWidth - minWidth + 1));
  this.x = 1200;
  this.y = gameArea.canvas.height - this.height;
  this.draw = function() {
    gameArea.context.fillRect(this.x, this.y, this.width, this.height)
  };
}

startGame();