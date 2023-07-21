var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var box = 20;
var snake1 = [];
var snake2 = [];
snake1[0] = {x: 10 * box, y: 10 * box}; // initial position of snake 1
snake2[0] = {x: 30 * box, y: 10 * box}; // initial position of snake 2

var food = {
  x: Math.floor(Math.random()*39+1) * box,
  y: Math.floor(Math.random()*19+1) * box
}

var direction1 = "";
var direction2 = "";
var score1 = 0;
var score2 = 0;
var game;
var gameOver = false;

function resetGame() {
    snake1 = [];
    snake1[0] = {x: 10 * box, y: 10 * box};
    snake2 = [];
    snake2[0] = {x: 30 * box, y: 10 * box};
    direction1 = "";
    direction2 = "";
    score1 = 0;
    score2 = 0;
    game = null;
    gameOver = false;
    food = {
        x: Math.floor(Math.random()*39+1) * box,
        y: Math.floor(Math.random()*19+1) * box
    }

    document.getElementById('score1').textContent = 'Score 1: ' + score1;
    document.getElementById('score2').textContent = 'Score 2: ' + score2;
}

function draw() {
  context.fillStyle = 'white';
  context.fillRect(0, 0, 40*box, 20*box);
  
  drawSnakeAndFood(snake1, 'blue', direction1, snake2);
  drawSnakeAndFood(snake2, 'red', direction2, snake1);

  // Draw food
  context.fillStyle = 'green';
  context.fillRect(food.x, food.y, box, box);

  if(gameOver){
    clearInterval(game);
    setTimeout(resetGame, 1000);
    setTimeout(draw, 1000);
  }
}

function drawSnakeAndFood(snake, snakeColor, direction, otherSnake) {
  for(let i = 0; i < snake.length; i++){
    context.fillStyle = (i == 0)? 'black' : snakeColor;
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // End game if snake runs into itself
  for(let i = 1; i < snake.length; i++){
    if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
      gameOver = true;
    }
  }

  // Check if the snake runs into the other snake
  for(let i = 0; i < otherSnake.length; i++){
    if(snake[0].x == otherSnake[i].x && snake[0].y == otherSnake[i].y){
      gameOver = true;
    }
  }

  if (!direction) {
    return;
  }

  var snakeX = snake[0].x;
  var snakeY = snake[0].y;
  
  if(direction == "left") snakeX -= box;
  if(direction == "up") snakeY -= box;
  if(direction == "right") snakeX += box;
  if(direction == "down") snakeY += box;
  
  // Check for game over condition
  if(snakeX < 0 || snakeY < 0 || snakeX > 39 * box || snakeY > 19 * box){
    gameOver = true;
  }
  
  // End game if snake runs into itself
  for(let i = 0; i < snake.length; i++){
    if(snakeX == snake[i].x && snakeY == snake[i].y){
      gameOver = true;
    }
  }
  
  // Check if the snake runs into the other snake
  for(let i = 0; i < otherSnake.length; i++){
    if(snakeX == otherSnake[i].x && snakeY == otherSnake[i].y){
      gameOver = true;
    }
  }

  // Check if the snake has eaten the food
  if(snakeX == food.x && snakeY == food.y){
    do {
        food.x = Math.floor(Math.random()*39+1) * box;
        food.y = Math.floor(Math.random()*19+1) * box;
    } while (foodIsOnSnake(food, snake1) || foodIsOnSnake(food, snake2));
    if(snake == snake1) {
        score1++;
        document.getElementById('score1').textContent = 'Score 1: ' + score1;
    } else {
        score2++;
        document.getElementById('score2').textContent = 'Score 2: ' + score2;
    }
  } else {
    snake.pop();
  }

  // Only add the new head if the game is not over
  if(!gameOver) {
    var newHead = {x: snakeX, y: snakeY};
    snake.unshift(newHead);
  }
}

function foodIsOnSnake(food, snake) {
    for(let i = 0; i < snake.length; i++){
        if(food.x == snake[i].x && food.y == snake[i].y){
            return true;
        }
    }
    return false;
}

document.addEventListener('keydown', directionChange);

function directionChange(event){
  if(!game) {
    game = setInterval(draw, 100);
  }
  
  // If snake is of size more than 1, it can't reverse its direction
  if(snake1.length > 1) {
    if(event.keyCode == 87 && direction1 != "down") direction1 = "up";
    if(event.keyCode == 65 && direction1 != "right") direction1 = "left";
    if(event.keyCode == 83 && direction1 != "up") direction1 = "down";
    if(event.keyCode == 68 && direction1 != "left") direction1 = "right";
  } else {
    if(event.keyCode == 87) direction1 = "up";
    if(event.keyCode == 65) direction1 = "left";
    if(event.keyCode == 83) direction1 = "down";
    if(event.keyCode == 68) direction1 = "right";
  }

  if(snake2.length > 1) {
    if(event.keyCode == 38 && direction2 != "down") direction2 = "up";
    if(event.keyCode == 37 && direction2 != "right") direction2 = "left";
    if(event.keyCode == 40 && direction2 != "up") direction2 = "down";
    if(event.keyCode == 39 && direction2 != "left") direction2 = "right";
  } else {
    if(event.keyCode == 38) direction2 = "up";
    if(event.keyCode == 37) direction2 = "left";
    if(event.keyCode == 40) direction2 = "down";
    if(event.keyCode == 39) direction2 = "right";
  }
}

draw();
