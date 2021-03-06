var playerXStart = 200;
var playerYStart = 375;


var Enemy = function(enemyX, enemyY) {
    //USER ADDED - Speed of enemy can be set
    this.x = enemyX;
    this.y = enemyY;
    this.setRandomSpeed();
    this.sprite = 'images/enemy-bug.png';
};


Enemy.prototype.update = function(dt) {
    //USER ADDED - If the enemy moves off screen they are teleported back to the other side.
    this.x = this.x += (this.speed * dt);  
    if(this.x > 500){
        this.x = -100;
    }
};


Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//USER ADDED - Creates a random speed between 100 and 300.
Enemy.prototype.setRandomSpeed = function(){
    var speedFloor = 100;
    var speedCeiling = 300;
    this.speed = Math.random() * (speedCeiling - speedFloor) + speedFloor;
};

//USER ADDED - 
var Player = function(startingX, startingY){
    this.x = startingX;
    this.y = startingY;
    this.sprite = 'images/char-boy.png';
};


Player.prototype.update = function(dt){
    this.checkCollisions();
};

//USER ADDED - Checks for a collision between player and enemy. If enemy and player collide
//the game resets. If the player reaches the end of the map the win function is called
Player.prototype.checkCollisions = function() {
    var enemyHitboxSize = 50;


    for(var i = 0; i < allEnemies.length; i++){
        if(this.x < allEnemies[i].x + enemyHitboxSize &&
            this.x + enemyHitboxSize > allEnemies[i].x &&
            this.y < allEnemies[i].y + enemyHitboxSize &&
            this.y + enemyHitboxSize > allEnemies[i].y) {
            this.x = playerXStart;
            this.y = playerYStart;
            score = 0;
            for(var z = 0; z < allEnemies.length; z++){
                allEnemies[z].setRandomSpeed();
            }
        }
    }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//USER ADDED - Checks if players next key press moves their character out of the game map.
//No action taken if the character can move off the map.
Player.prototype.handleInput = function(key){
    var xMove = 101;
    var yMove = 83;
    var maxMove = 450;
    var minMove = -2;

    switch(key){
        case 'left': 
            if(this.x - xMove < minMove){
                break;
            }
            this.x -= xMove;
        break;
        case 'right': 
            if(this.x + xMove > maxMove){
                break;
            }
            this.x += xMove;
        break;
        case 'up': 
                if(this.y - yMove < 0 ){
                this.win();
                break;  
            }
            this.y -= yMove;
        break;

        case 'down': 
            if(this.y + yMove > maxMove ){
                break;
            }
            this.y += yMove;
        break;
    }
};

//USER ADDED - Creates a new player at the provided X, Y coordinate
var player = new Player(playerXStart, playerYStart);



//USER ADDED - Creates the enemies and populates the gameboard
var enemy1 = new Enemy(300, 126);
var enemy2 = new Enemy(100, 209);
var enemy3 = new Enemy(200, 292);
var allEnemies = [enemy1, enemy2, enemy3]; 
var score = 0;

//USER ADDED - Moves player back to start, increases difficulty (enemy speed goes up), and
//ups the score by 10.
Player.prototype.win = function(){
    score += 10;
    for(var i = 0; i < allEnemies.length; i++){
        allEnemies[i].speed += 20;
    }
    this.x = 200;
    this.y = 375;
    return true;
};


document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});