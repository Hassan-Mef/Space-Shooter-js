var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var Score = 0 ;

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
}

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

    Delete(){
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}

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
        ctx.clearRect(this.x, this.y, this.size, this.size);
    }
}

const bullets = []; // creating an array for bullets
const enemies = []; // creating an array for enemies
const enemies_bullets = []; // creating an array for enemies

function createEnemy() {
    const enemy = new Enemy((Math.random() * canvas.width) - 15, 50, 50, 50); // creating an object of enemy
    enemies.push(enemy);
    console.log("New enemy created");
}

// Initially creating an enemy
createEnemy();

// creating an object of the player
var player = new Player((canvas.width / 2) - 25, canvas.height - 150, 50, 50); // creating an object of the player 

function bulletFired() {
    const bullet = new Bullet(player.x + player.width / 2, player.y, 5);
    bullets.push(bullet);
}

function renderBullets() {
    for (const bullet of bullets) {
        bullet.Draw();
        bullet.y -= bullet.velocity;
        if (bullet.y < 0) {
            bullets.splice(bullets.indexOf(bullet), 1);
            console.log("Bullet deleted");
        }
    }
}

function checkCollision(bullet, enemy) {
    if (bullet && enemy) {
        if (bullet.x >= enemy.x && bullet.x <= enemy.x + enemy.width &&
            bullet.y >= enemy.y && bullet.y <= enemy.y + enemy.height) {
            console.log("Collision detected!");
            enemy.Delete();
            bullets.splice(bullets.indexOf(bullet), 1);
            console.log("Bullet deleted");
            enemies.splice(enemies.indexOf(enemy), 1);
            Score++;
            console.log("Enemy deleted");
        }
    }
}

function Collision_Ship_Boundry() {
    if (player.x <= 0) {
        player.x = 0;
    }
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
}

function checkDeath() {
    for (const bullet of bullets) {
        for (const enemy of enemies) {
            checkCollision(bullet, enemy);
        }
    }
}

function regenerateEnemy() {
    if (enemies.length === 0) {
        createEnemy();
    }
}

function ScreenGUI() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${Score}`, 10, 540);
    
}

function bulletFired_enemy(enemy) {
    const bullet = new Bullet(enemy.x + enemy.width / 2, enemy.y + enemy.height, 5);
    enemies_bullets.push(bullet);
}

function checkCollision_enemy(bullet, player) {
    if (bullet) {
        if (bullet.x >= player.x && bullet.x <= player.x + player.width &&
            bullet.y >= player.y && bullet.y <= player.y + player.height) {
            console.log("Collision detected! You lose!!!");
            return true;
        }
    }
    return false;
}

function renderBullets_enemy() {
    for (let i = enemies_bullets.length - 1; i >= 0; i--) {
        const bullet = enemies_bullets[i];
        bullet.Draw();
        bullet.y += bullet.velocity;

        // Remove bullets when they go out of bounds
        if (bullet.y > canvas.height) {
            enemies_bullets.splice(i, 1);
        }

        // Check collision with player
        if (checkCollision_enemy(bullet, player)) {
            // Handle player hit action here
            // For now, let's log a message
            console.log("Player hit by enemy bullet!");
        }
    }
}

function EnemyFire() {
    for (const enemy of enemies) {
        bulletFired_enemy(enemy);
    }
}

function NextLevel() {  // level check 
    if (Score === 2) {
        console.log("Next Level!");
        createEnemy();
        Score++;
    }
    if (Score === 5) {
        EnemyFire();
        renderBullets_enemy();
        checkCollision_enemy();
    }
}


document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        player.update(-10);
        Collision_Ship_Boundry();
    }
    if (event.key === "ArrowRight") {
        player.update(10);
        Collision_Ship_Boundry();
    }
    if (event.key === " ") {
        bulletFired();
    }
});

function StartGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.Draw();
    for (const enemy of enemies) {
        enemy.Draw();
    }
    checkDeath();
    renderBullets();
    regenerateEnemy();
    NextLevel();
    ScreenGUI()
    requestAnimationFrame(StartGame);
}

StartGame();
