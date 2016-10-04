'use strict';
// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.xspeed = randomRangeNumber(150, 300);

    this.width = 40;
    this.height = 20;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Return true if enemy has reached limit x position
Enemy.prototype.offScreen = function() {
    if (this.x > 500) {
        return true;
    }
};
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    this.x = this.x + this.xspeed * dt;

    if (this.offScreen()) {
        var index = allEnemies.indexOf(this);
        allEnemies.splice(index, 1)
    }
};

function randomRangeNumber(min, max) {
    return Math.random() * (max - min) + min;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    if (allEnemies.length < 3) {
        var posRows = [50, 140, 220];
        var randomRow = posRows[Math.floor(Math.random() * posRows.length)];
        allEnemies.push(new Enemy(-100, randomRow));
    }

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 380;

    this.width = 15;
    this.height = 30;
};

// Reset player position if he reaches water blocks
Player.prototype.reset = function() {
    if (this.y === -45) {
      this.x = 200;
      this.y = 380;
    }
};

Player.prototype.update = function() {
    this.reset();
};

Player.prototype.move = function(dirX, dirY) {
    this.x += dirX;
    this.y += dirY;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPressed) {

    if (keyPressed === "left" && this.x > -2) {
        this.move(-101, 0);
    } else if (keyPressed === "right" && this.x <= 301) {
        this.move(101, 0);
    } else if (keyPressed === "down" && this.y < 380) {
        this.move(0, 85);
    } else if (keyPressed === "up" && this.y >= 40) {
        this.move(0, -85);
    }

};


// Bounding Box Collision Detection src: https://www.youtube.com/watch?v=8b_reDI7iPM
Enemy.prototype.checkCollision = function() { 
    if ((player.x + player.width) >= (this.x) && (player.x) <= (this.x + this.width) &&
        (player.y + player.height) >= (this.y) && (player.y) <= (this.y + this.height)) {
        player.reset();
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

var player = new Player();

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

// Change current image Player
var playerImages = document.querySelectorAll(".player-images img");
playerImages.forEach(function(image) {
    image.addEventListener('click', function() {
        var imgSrc = image.alt;
        player.sprite = imgSrc.toString();
    });
});
