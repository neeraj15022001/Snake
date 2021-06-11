var NUM_INITIAL_SECTIONS = 3;
// Directions
var UP = 0;
var UP_KEY_CODE = 38;
var DOWN = 1;
var DOWN_KEY_CODE = 40;
var LEFT = 2;
var LEFT_KEY_CODE = 37;
var RIGHT = 3;
var RIGHT_KEY_CODE = 39;

function Snake() {
  this.img = document.createElement('img'); //creating img container for snake
  this.img.src = '../images/snake2.png'; //setting value of img container to snake2
  this.sections = [];
}

Snake.prototype = new SnakeWorldObject();

Snake.prototype.setupSnake = function(maxX, maxY) {
  // Set snake's starting coordinates
  this.setX(maxX/2)
  this.setY(maxY/2)
  for(let i = 0; i < NUM_INITIAL_SECTIONS; i++) {
    this.sections.push(this.img)
  }
  console.log(this.sections)
  // create initial number of snake sections (snake length)
};
Snake.prototype.hasCollided = function(maxX, maxY) {
  // Check if snake has collided with itself or board boundaries.
  if(this.getX() === maxX || this.getY() === maxY) {
    return true
  } else {
    return false
  }
};

Snake.prototype.endMove = function(didGrow) {
  if (!didGrow) {
    this.sections.shift(); //pop first entry from sections array
  }
};

Snake.prototype.startMove = function() {
  this.direction = this.nextDirection;
  // Move snake here
  // console.log(this.direction)
  console.log(`Current value of this.nextDirection ${this.nextDirection}`)
  switch(this.direction){ 
    case UP:
      this.setY(this.getY() - 1)
      break
    case DOWN: 
      this.setY(this.getY() + 1)
      break
    case LEFT:
      this.setX(this.getX() + 1)
      break
    case RIGHT:
      this.setX(this.getX() - 1)
  }
};

Snake.prototype.draw = function(context, spacing) {
  // Draw the complete snake
  DrawUtil.drawImage(
    context,
    this.img,
    spacing * this.getX(),
    spacing * this.getY(),
    spacing,
    spacing
  );
};

Snake.prototype.init = function(maxX, maxY) {
  this.setupListeners();
  this.setupSnake(maxX, maxY);
};

Snake.prototype.setupListeners = function() {
  this.direction = UP;
  this.nextDirection = UP;
  document.addEventListener('keydown', function(e) {
    // Set snake's nextDirection based on keypress.
    const currentKeyCode = e.keyCode
    switch(currentKeyCode) {
      case 37:
        this.nextDirection = LEFT
        break
      case 38:
        this.nextDirection = UP
        break
      case 39:
        this.nextDirection = RIGHT
        break
      case 40:
        this.nextDirection = DOWN
    }
    console.log(`Current value of this.nextDirection ${this.nextDirection}`)
    e.preventDefault();
  });
};
