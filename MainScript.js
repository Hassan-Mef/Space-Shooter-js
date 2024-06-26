let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let ship = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    width: 50,
    height: 50,

    DrawShip: function(){
        ctx.fillStyle = 'blue'; // Set ship color
        ctx.fillRect(ship.x, ship.y, ship.width, ship.height);
    }
};

let enemy = {
    x: Math.random() * canvas.width,
    y: 0,
    width: 50,
    height: 50,

    DrawEnemy: function(){
        ctx.fillStyle = 'red'; // Set enemy color
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }
};

let bullet = {
    x: ship.x + 25,
    y: ship.y,
    width: 5,
    height: 5,

    DrawBullet: function(){
        ctx.fillStyle = 'yellow'; // Set bullet color
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }
}

let isSpacePressed = false; // Flag to track spacebar input

function InputHandler(event) {
    if (event.key === 'ArrowLeft') {
        ship.x -= 10;
    }
    if (event.key === 'ArrowRight') {
        ship.x += 10;
    }
    if (event.key === "Space") {
        isSpacePressed = true; // Set the flag when spacebar is pressed
    }
}

document.addEventListener('keydown', InputHandler);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ship.DrawShip();
    enemy.DrawEnemy();

    if (isSpacePressed) {
        bullet.y -= 10; // Update bullet position if spacebar is pressed
    }

    bullet.DrawBullet();

    // Update enemy position (for continuous animation)
    // enemy.y += 1; // Adjust the speed as needed

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
