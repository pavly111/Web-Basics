const canvas = document.getElementById("canva");
const can = canvas.getContext("2d");
const button = document.getElementById("clear");

canvas.width = 600;
canvas.height = 400;

can.lineWidth = 3;
can.strokeStyle = 'black';

let isDrawing = false;
let X = 0;
let Y = 0;

function getCanvasPosition(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
}

function startDrawing(e) {
    if (e.shiftKey && e.metaKey && e.buttons === 1) { 
        isDrawing = true;
        const pos = getCanvasPosition(e);
        X = pos.x;
        Y = pos.y;
    }
}

function draw(e) {
    if (!isDrawing || !(e.shiftKey && e.metaKey && e.buttons === 1)) return;

    const pos = getCanvasPosition(e);
    can.beginPath();
    can.moveTo(X, Y);
    can.lineTo(pos.x, pos.y);
    can.stroke();
    X = pos.x;
    Y = pos.y;
}

function stopDrawing() {
    isDrawing = false;
}

function clearCanvas() {
    can.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);
button.addEventListener('click', clearCanvas);