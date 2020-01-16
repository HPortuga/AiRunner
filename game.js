var minHeight = 20;
var maxHeight = 100;
var minWidth = 10;
var maxWidth = 20;
var minGap = 200;
var maxGap = 500;
var gap = randomGap();

var myObstacles = [];

var player = {
  x: 20,
  y: 470,
  speedY: 0,
  update: function() {
    gameArea.context.fillRect(this.x, this.y, 30, 30);
  },
  newPos: function() {
    if (this.y < 280)
      this.speedY = 2;
    
    this.y = this.y + this.speedY;

    if (this.speedY === 2 && this.y === 470)
      this.speedY = 0;
  }
};

var gameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.height = 500;
    this.canvas.width = 1200;
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.context = this.canvas.getContext("2d");
    this.frame = 0;
    this.interval = setInterval(this.updateGameArea, 5);
    window.addEventListener("keydown", jump);
  },
  updateGameArea: function() {
    gameArea.clear()

    if (everyInterval(gap)) {
      myObstacles.push(new obstacle());
      gap = randomGap();
      gameArea.frame = 0;
    }

    myObstacles.forEach((item) => {
      item.x -= 1;
      item.draw();
    });
    player.newPos();
    player.update();
    gameArea.frame += 1
  },
  clear: function() {
    gameArea.context.clearRect(0,0,this.canvas.width, this.canvas.height);
  },
  stop: function() {
    player.newPos();
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

function everyInterval(n) {
  if (gameArea.frame % n === 0) return true;
  return false;
}

function randomGap() {
  return Math.floor(minGap + Math.random() * (maxGap - minGap + 1));
}

function jump() {
  player.speedY = -2;
}

startGame();