//Records the player's score.  If the player reaches the water, a point is added, but if a bug hits the player, a point is subtracted.
var playerScore = 0;

function drawScore() {

    ctx.fillText(playerScore, 450, 100);
    ctx.font = "40px Verdana";
}

// Enemies our player must avoid
var Enemy = function(x, y, howFast) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.x = x;
    this.y = y;
    this.howFast = howFast;
    this.height = 50;
    this.width = 100;
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.howFast * dt);
    if (this.x > 505) {

        this.x = -100;

    }
    this.checkCollisions(player);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //enemyRect(this.x,this.y + 77,100,67,"red");
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.x = 205;
    this.y = 400;
    this.height = 50;
    this.width = 80;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {

    if (this.y < 50) {

        this.y = 400;
        this.x = 205;
        playerScore++;

    }

    if (this.y > 450) {

        this.y = 400;

    }

    if (this.x > 400) {

        this.x = 400;

    }

    if (this.x < 0) {

        this.x = 0;
    }

};

Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //playerRect(this.x,this.y + 63,95,80,"blue");
};
//
Enemy.prototype.checkCollisions = function(player) {
    //code based on axis-aligned bounding box from MDN 	https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

    var enemyRect1 = {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
    }
    var playerRect2 = {
        x: player.x,
        y: player.y,
        width: player.width,
        height: player.height
    }

    if (enemyRect1.x < playerRect2.x + playerRect2.width &&
        enemyRect1.x + playerRect2.width > playerRect2.x &&
        enemyRect1.y < playerRect2.y + playerRect2.height &&
        enemyRect1.height + enemyRect1.y > playerRect2.y) {
        // collision detected!

        player.x = 205;
        player.y = 400;
        playerScore--;
    }
};


Player.prototype.handleInput = function(keys) {

    if (keys === 'left') {

        this.x -= 100;
    }

    if (keys === 'up') {

        this.y -= 85;
    }

    if (keys === 'right') {

        this.x += 100;
    }

    if (keys === 'down') {

        this.y += 85;
    }



};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player;
var enemyOne = new Enemy(10, 58, 50);
var enemyTwo = new Enemy(10, 142, 100);
var allEnemies = [enemyOne, enemyTwo];
var enemyThree = new Enemy(10, 224, 75);
var enemyFour = new Enemy(-300, 58, 50);
var enemyFive = new Enemy(-150, 224, 75);
var enemySix = new Enemy(-250, 142, 100);
allEnemies.push(enemyThree, enemyFour, enemyFive, enemySix);




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});