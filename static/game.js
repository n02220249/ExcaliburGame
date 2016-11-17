// game.js

// Create an instance of the engine.
var game = new ex.Engine({
    width: 800,
    height: 600
});

// Create an actor with x position of 150px,
// y position of 40px from the bottom of the screen,
// width of 200px, height and a height of 20px
var paddle = new ex.Actor(150, game.getHeight() - 40, 64, 64);

// Let's give it some color with one of the predefined
// color constants
paddle.color = ex.Color.Chartreuse;

// Make sure the paddle can partipate in collisions, by default excalibur actors do not collide
paddle.collisionType = ex.CollisionType.Fixed;
paddle.vel.setTo(0, 0);
// `game.add` is the same as calling
// `game.currentScene.add`
game.input.keyboard.on("press", function(evt) {
//paddle.vel.x = evt.x;
//alert(evt.key);
if(evt.key == 87 || evt.key == 38)  {   // w or up
	paddle.vel.y = -3;
   }  
if(evt.key == 83 || evt.key == 40)  {   // s or down
	paddle.vel.y = 3;
   }  
if(evt.key == 65 || evt.key == 37)  {   // a or left
	paddle.vel.x = -3;
   }     
if(evt.key == 68 || evt.key == 39)  {   // d or right
	paddle.vel.x = 3;
   }         
});

game.input.keyboard.on("release", function(evt) {
//paddle.vel.x = evt.x;
//alert(evt.key);
//alert(evt.key);
if(evt.key == 87 || evt.key == 38 || evt.key == 83 || evt.key == 40)  { 
	paddle.vel.y = 0;
   }  

if(evt.key == 65 || evt.key == 37 || evt.key == 68 || evt.key == 39)  { 
	paddle.vel.x = 0;
   }     
});


game.add(paddle);


paddle.on('update', function () {
this.pos.y += this.vel.y; 
this.pos.x += this.vel.x; 
});
// Add a mouse move listener
//game.input.pointers.primary.on('move', function (evt) {
 //   paddle.pos.x = evt.x;
//});
//paddle.on('update', function () {

//});



// Create a ball
var ball = new ex.Actor(100, 300, 20, 20);

// Set the color
ball.color = ex.Color.Red;

// Set the velocity in pixels per second
ball.vel.setTo(100, 100);

// Set the collision Type to elastic
ball.collisionType = ex.CollisionType.Elastic;

// Add the ball to the current scene
game.add(ball);

// Wire up to the update event
ball.on('update', function () {
    // If the ball collides with the left side
    // of the screen reverse the x velocity
    if (this.pos.x < (this.getWidth() / 2)) {
        this.vel.x *= -1;
    }

    // If the ball collides with the right side
    // of the screen reverse the x velocity
    if (this.pos.x + (this.getWidth() / 2) > game.getWidth()) {
        this.vel.x *= -1;
    }

    // If the ball collides with the top
    // of the screen reverse the y velocity
    if (this.pos.y < 0) {
        this.vel.y *= -1;
    }
});

// Draw is passed a rendering context and a delta in milliseconds since the last frame
ball.draw = function (ctx, delta) {
    // Optionally call original 'base' method
    // ex.Actor.prototype.draw.call(this, ctx, delta)

    // Custom draw code
    ctx.fillStyle = this.color.toString();
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

// Build Bricks

// Padding between bricks
var padding = 20; // px
var xoffset = 65; // x-offset
var yoffset = 20; // y-offset
var columns = 5;
var rows = 3;

var brickColor = [ex.Color.Violet, ex.Color.Orange, ex.Color.Yellow];

// Individual brick width with padding factored in
var brickWidth = game.getWidth() / columns - padding - padding/columns; // px
var brickHeight = 30; // px
var bricks = [];
for (var j = 0; j < rows; j++) {
    for (var i = 0; i < columns; i++) {
        bricks.push(new ex.Actor(xoffset + i * (brickWidth + padding) + padding, yoffset + j * (brickHeight + padding) + padding, brickWidth, brickHeight, brickColor[j % brickColor.length]));
    }
}


bricks.forEach(function (brick) {
    // Make sure that bricks can participate in collisions
    brick.collisionType = ex.CollisionType.Active;

    // Add the brick to the current scene to be drawn
    game.add(brick);
});

// On collision remove the brick
ball.on('collision', function (ev) {
    if (bricks.indexOf(ev.other) > -1) {
        // kill removes an actor from the current scene
        // therefore it will no longer be drawn or updated
        ev.other.kill();
    }
});

ball.on('exitviewport', function(){
    //alert('You lose!');
});


// Start the engine to begin the game.
game.start();
