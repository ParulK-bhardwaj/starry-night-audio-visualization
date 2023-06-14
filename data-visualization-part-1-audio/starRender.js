/**
 * 
 * @param {UINT8 0Array} frequencyArray 
 * @param {canvas context} ctx 
 * @param {number} centerX 
 * @param {number} centerY 
 */

function render(frequencyArray, ctx, centerX, centerY) {
    const bars = frequencyArray.length;
    const barWidth = ctx.canvas.width / bars;
    const colorStep = 600 / bars;

    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Render stars
    const starRadius = 1.5;
    const starCount = 35;
    ctx.fillStyle = 'white';
    for (let i = 0; i < starCount; i++) {
        const x = Math.random() * ctx.canvas.width;
        const y = Math.random() * centerY;
        ctx.beginPath();
        ctx.arc(x, y, starRadius, 0, 2 * Math.PI);
        ctx.fill();
    }

    // Render Peaks
    frequencyArray.forEach((f, i) => {
        const height = (f / 255) * 250;
        const x = barWidth * i;
        const y = centerY - height;

        ctx.beginPath();
        ctx.moveTo(x, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `hsla(${colorStep * i}, 100%, 50%, 0.25)`;
        ctx.stroke();
    });

    // Render Shadows
    ctx.beginPath();
    frequencyArray.forEach((f, i) => {
        const height = (f / 255) * 150;
        const x = barWidth * i;
        const y = centerY + height;

        ctx.lineTo(x, y);
        ctx.strokeStyle = `hsla(${colorStep * i}, 70%, 25%, 0.75)`;
        ctx.stroke();
    });
};

export default render;
