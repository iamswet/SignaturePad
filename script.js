document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('signatureCanvas');
    const context = canvas.getContext('2d');
    const clearButton = document.getElementById('clearButton');
    const downloadButton = document.getElementById('downloadButton');

    let drawing = false;

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);
    clearButton.addEventListener('click', clearCanvas);
    downloadButton.addEventListener('click', downloadImage);

    function startDrawing(event) {
        drawing = true;
        context.beginPath();
        context.moveTo(event.offsetX, event.offsetY);
    }

    function stopDrawing() {
        drawing = false;
        context.closePath();
    }

    function draw(event) {
        if (!drawing) return;
        context.lineTo(event.offsetX, event.offsetY);
        context.stroke();
    }

    function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function downloadImage() {
        const link = document.createElement('a');
        link.download = 'signature.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
});
