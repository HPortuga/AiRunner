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
  size: 30,
  speedY: 0,
  distances: {
    top: 0,
    bottom: 0
  },
  update: function() {
    gameArea.context.fillStyle = "black";
    gameArea.context.fillRect(this.x, this.y, this.size, this.size);
  },
  newPos: function() {
    if (this.y < 280)
      this.speedY = 2;
    
    this.y = this.y + this.speedY;

    if (this.speedY === 2 && this.y === 470)
      this.speedY = 0;
  },
  crashWith: function(obs) {
    if (this.x + 30 > obs.x && this.x < obs.x + obs.width && this.y + 30 > obs.y)
      return true;
    return false;
  }
};

var scoreText = {
  x: 900,
  y: 50,
  update: function(text) {
    gameArea.context.fillStyle = "gray";
    gameArea.context.font = "30px Consolas";
    gameArea.context.fillText(text, this.x, this.y);
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
    this.score = 0;
    scoreText.update("Score: " + Math.floor(this.score));
    this.interval = setInterval(this.updateGameArea, 5);
    window.addEventListener("keydown", jump);
  },
  updateGameArea: function() {
    myObstacles.forEach((item, index) => {
      if (player.crashWith(item)) {
        gameArea.stop();
        return;
      }

      if (item.x < -(player.x * 2))
        myObstacles.splice(index, 1);
    });

    gameArea.clear();

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
    gameArea.frame += 1;
    gameArea.score += 0.01;
    scoreText.update("Score: " + Math.floor(gameArea.score));

    player.distances.bottom = Math.floor(Math.sqrt(Math.pow(myObstacles[0].x - (player.x + player.size),2)));
    player.distances.top = Math.floor(Math.sqrt(Math.pow(myObstacles[0].x - (player.x + player.size),2) + Math.pow(myObstacles[0].y - 500,2)));

    //drawSensors();

    var spanDis = document.getElementById("logDis");
    spanDis.innerText = player.distances.bottom;
    var spanAlt = document.getElementById("logAlt");
    spanAlt.innerText = player.distances.top;

  },
  clear: function() {
    gameArea.context.clearRect(0,0,this.canvas.width, this.canvas.height);
  },
  stop: function() {
    clearInterval(this.interval);
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
    gameArea.context.fillStyle = "black";
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

function drawSensors() {
  gameArea.context.beginPath();
  gameArea.context.moveTo(player.x + player.size, player.y + player.size);
  gameArea.context.lineTo(myObstacles[0].x, 500);
  gameArea.context.stroke();
  gameArea.context.closePath();

  gameArea.context.beginPath();
  gameArea.context.moveTo(player.x + player.size, player.y + player.size);
  gameArea.context.lineTo(myObstacles[0].x, myObstacles[0].y);
  gameArea.context.stroke();
  gameArea.context.closePath();
}

startGame();