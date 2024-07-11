document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('signatureCanvas');
    const context = canvas.getContext('2d');
    const clearButton = document.getElementById('clearButton');
    const downloadJPGButton = document.getElementById('downloadJPGButton');
    const downloadPNGButton = document.getElementById('downloadPNGButton');
    const bgColorSelect = document.getElementById('bgColor');
    const penColorSelect = document.getElementById('penColor');

    let drawing = false;
    let penColor = 'black';
    let bgColor = 'transparent';

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchmove', draw);
    clearButton.addEventListener('click', clearCanvas);
    downloadJPGButton.addEventListener('click', () => downloadImage('image/jpeg'));
    downloadPNGButton.addEventListener('click', () => downloadImage('image/png'));
    bgColorSelect.addEventListener('change', changeBackgroundColor);
    penColorSelect.addEventListener('change', changePenColor);

    function startDrawing(event) {
        drawing = true;
        context.beginPath();
        context.moveTo(getX(event), getY(event));
    }

    function stopDrawing() {
        drawing = false;
        context.closePath();
    }

    function draw(event) {
        if (!drawing) return;
        event.preventDefault();
        context.strokeStyle = penColor;
        context.lineTo(getX(event), getY(event));
        context.stroke();
    }

    function getX(event) {
        if (event.touches) {
            return event.touches[0].clientX - canvas.getBoundingClientRect().left;
        } else {
            return event.offsetX;
        }
    }

    function getY(event) {
        if (event.touches) {
            return event.touches[0].clientY - canvas.getBoundingClientRect().top;
        } else {
            return event.offsetY;
        }
    }

    function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (bgColor !== 'transparent') {
            context.fillStyle = bgColor;
            context.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

    function changeBackgroundColor() {
        bgColor = bgColorSelect.value;
        clearCanvas();
    }

    function changePenColor() {
        penColor = penColorSelect.value;
    }

    function downloadImage(format) {
        const link = document.createElement('a');
        link.download = `signature.${format === 'image/jpeg' ? 'jpg' : 'png'}`;
        link.href = canvas.toDataURL(format);
        link.click();
    }

    // Initialize with the default background color
    clearCanvas();
});
