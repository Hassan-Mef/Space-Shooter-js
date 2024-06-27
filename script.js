var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// creating player class 

class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    Draw () {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    // method for updating player position
    update(dx) {
        this.x += dx;
    }


};

class Enemy {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    Draw () {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

};

class Bullet {
    constructor(x, y, velocity) {
        this.x = x;
        this.y = y;
        this.size = 5;
        this.velocity = velocity;
    }

    Draw () {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    Delete(){
        ctx.clearRect(this.x, this.y, this.size , this.size);
    }
};

const bullets = [] ; // creating a an array for bullets



// creating an object of the player
var player = new Player((canvas.width/2)-25, canvas.height - 100 ,50 ,50); // creating an object of the player 
player.Draw();

// creating an object of enemy
var enemy = new Enemy((Math.random()* canvas.width) -25, 50 , 50 , 50); // creating an object of enemy
enemy.Draw();

function bulletFired(){
    const bullet = new Bullet(player.x + player.width/2, player.y, 5);
    bullets.push(bullet);
}

function renderBullets(){
    for(const bullet of bullets){
        bullet.Draw();
        bullet.y -= bullet.velocity;
        if(bullet.y < 0){
            bullets.splice(bullets.indexOf(bullet), 1);
            console.log("Bullet deleted");
        }   
    }
}

function checkCollision(bullet, enemy){
    if(enemy.x <= bullet.x && bullet.x <=enemy.x + enemy.width && enemy.y >= bullet.y && bullet.y <= enemy.y + enemy.height)
        {
            console.log("Collision");
            enemy.Delete();
            bullets.splice(bullets.indexOf(bullet), 1);
            console.log("Bullet deleted");
        }
}




document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        player.update(-10);
    }
    if (event.key === "ArrowRight") {
        player.update(10);
    }
    if (event.key === " ") {
        bulletFired();
    }
});

function StartGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.Draw();
    enemy.Draw();
    renderBullets();
    checkCollision(bullets[bullets.length - 1], enemy);
    requestAnimationFrame(StartGame);
}

StartGame();

