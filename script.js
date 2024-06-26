var canvas = document.getElementById("canvas");
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

function moveDown() {
    square.y += 10;
    if(square.y >= canvas.height) square.y =0 ;
    requestAnimationFrame(moveDown);
    drawSquare();
}




