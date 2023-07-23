var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var box = 20;
var snake = [];
snake[0] = {x: 10 * box, y: 10 * box};

var food = {
  x: Math.floor(Math.random()*19+1) * box,
  y: Math.floor(Math.random()*19+1) * box
}

var direction = "";
var score = 0;
var highScore = 0;
var game;
var gameOver = false;

function resetGame() {
    snake = [];
    snake[0] = {x: 10 * box, y: 10 * box};
    direction = "";
    score = 0; // Reset score
    game = null;
    gameOver = false;
    food = {
        x: Math.floor(Math.random()*19+1) * box,
        y: Math.floor(Math.random()*19+1) * box
    }

    // Update score display
    document.getElementById('score').textContent = 'Score: ' + score;
}

function draw() {
  context.fillStyle = 'white';
  context.fillRect(0, 0, 20*box, 20*box);
  
  for(let i = 0; i < snake.length; i++){
    context.fillStyle = (i == 0)? 'black' : 'red';
    context.fillRect(snake[i].x, snake[i].y, box, box);

    // End game if snake runs into itself
    for(let j = i+1; j < snake.length; j++){
      if(snake[i].x == snake[j].x && snake[i].y == snake[j].y){
        gameOver = true;
      }
    }
  }
  
  context.fillStyle = 'green';
  context.fillRect(food.x, food.y, box, box);
  
  var snakeX = snake[0].x;
  var snakeY = snake[0].y;
  
  if(snakeX == food.x && snakeY == food.y){
    food = {
      x: Math.floor(Math.random()*19+1) * box,
      y: Math.floor(Math.random()*19+1) * box
    }
    score++;
    highScore = Math.max(score, highScore);

    // Update score and high score display
    document.getElementById('score').textContent = 'Score: ' + score;
    document.getElementById('high-score').textContent = 'High Score: ' + highScore;
  } else {
    snake.pop();
  }
  
  if(direction == "left") snakeX -= box;
  if(direction == "up") snakeY -= box;
  if(direction == "right") snakeX += box;
  if(direction == "down") snakeY += box;

  // Check for game over condition
  if(snakeX < 0 || snakeY < 0 || snakeX > 19 * box || snakeY > 19 * box){
    gameOver = true;
  }
  
  var newHead = {x: snakeX, y: snakeY}
  snake.unshift(newHead);

  if(gameOver){
    clearInterval(game);
    setTimeout(resetGame, 1000);
    setTimeout(draw, 1000);
  }
}

// Call draw function once to make game visible
draw();

document.addEventListener('keydown', directionChange);

function directionChange(event){
  if(!game) {
    game = setInterval(draw, 100);
  }
  
  if(snake.length > 1) {
    if(event.keyCode == 37 && direction != "right")
      direction = "left";
    else if(event.keyCode == 38 && direction != "down")
      direction = "up";
    else if(event.keyCode == 39 && direction != "left")
      direction = "right";
    else if(event.keyCode == 40 && direction != "up")
      direction = "down";
  } else {
    if(event.keyCode == 37)
      direction = "left";
    else if(event.keyCode == 38)
      direction = "up";
    else if(event.keyCode == 39)
      direction = "right";
    else if(event.keyCode == 40)
      direction = "down";
  }
}

document.getElementById('color-mode').addEventListener('change', function() {
  document.body.className = this.value + '-mode';
});
