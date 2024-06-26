var canvjas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Initialize the square's position
let square = {
    x: canvas.width / 2 - 25, // Centered horizontally
    y: 100, // Initial vertical position
    size: 50, // Square size
};

function drawSquare() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(square.x, square.y, square.size, square.size);
}

var speed =10;
function moveDown() {
    
    if(square.y >= canvas.height-50) speed *= -1;
    else if (square.y == 0 ) speed *= -1;
    square.y += speed;
    
    requestAnimationFrame(moveDown);
    drawSquare();
}


document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowDown') {
        moveDown();
    }
});


