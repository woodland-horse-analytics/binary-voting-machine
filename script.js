let dataset = [];
let maxIterations = 0;
let currentIteration = 0;
let i = 1;
let j = 1;
let canvas, ctx;

function startVoting() {
    const start = parseInt(document.getElementById('start').value);
    const end = parseInt(document.getElementById('end').value);
    maxIterations = parseInt(document.getElementById('iterations').value);
    
    dataset = [];
    for (let val = start; val <= end; val++) {
        dataset.push(val);
    }
    
    i = 1;
    j = dataset.length;
    currentIteration = 0;
    
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    document.getElementById('setup').style.display = 'none';
    document.getElementById('voting').style.display = 'block';
    updateDisplay();
}

function vote(isGreater) {
    if (isGreater) {
        i = Math.floor((i + j) / 2) + 1;
    } else {
        j = Math.floor((i + j) / 2);
    }
    
    currentIteration++;
    
    if (currentIteration >= maxIterations || i >= j) {
        showResult();
    } else {
        updateDisplay();
    }
}

function updateDisplay() {
    const m = Math.floor((i + j) / 2);
    const currentValue = dataset[m - 1];
    
    document.getElementById('guess').textContent = currentValue;
    document.getElementById('indexRange').textContent = `${i}, ${j}`;
    document.getElementById('valueRange').textContent = `${dataset[i-1]}, ${dataset[j-1]}`;
    document.getElementById('iter').textContent = `${currentIteration}/${maxIterations}`;
    document.getElementById('remaining').textContent = j - i + 1;
    
    drawVisualization();
}

function drawVisualization() {
    const width = canvas.width;
    const height = canvas.height;
    const margin = 40;
    const rectWidth = width - 2 * margin;
    const rectHeight = 50;
    const rectY = (height - rectHeight) / 2;
    
    ctx.clearRect(0, 0, width, height);
    
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;
    ctx.strokeRect(margin, rectY, rectWidth, rectHeight);
    
    const totalElements = dataset.length;
    const elementWidth = rectWidth / totalElements;
    
    // Eliminated areas
    if (i > 1) {
        ctx.fillStyle = '#fecaca';
        ctx.fillRect(margin, rectY, (i - 1) * elementWidth, rectHeight);
    }
    
    if (j < totalElements) {
        ctx.fillStyle = '#fecaca';
        ctx.fillRect(margin + j * elementWidth, rectY, (totalElements - j) * elementWidth, rectHeight);
    }
    
    // Remaining range
    ctx.fillStyle = '#bbf7d0';
    ctx.fillRect(margin + (i - 1) * elementWidth, rectY, (j - i + 1) * elementWidth, rectHeight);
    
    // Current guess
    const m = Math.floor((i + j) / 2);
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(margin + (m - 1) * elementWidth, rectY, elementWidth, rectHeight);
    
    // Labels
    ctx.fillStyle = '#374151';
    ctx.font = '14px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    
    ctx.fillText(dataset[0].toString(), margin, rectY - 12);
    ctx.fillText(dataset[dataset.length - 1].toString(), margin + rectWidth, rectY - 12);
    
    if (i <= j) {
        ctx.fillText(dataset[i-1].toString(), margin + (i - 0.5) * elementWidth, rectY + rectHeight + 20);
        ctx.fillText(dataset[j-1].toString(), margin + (j - 0.5) * elementWidth, rectY + rectHeight + 20);
    }
}

function showResult() {
    document.getElementById('voting').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('finalIndexRange').textContent = `${i}, ${j}`;
    document.getElementById('finalValueRange').textContent = `${dataset[i-1]}, ${dataset[j-1]}`;
    document.getElementById('rangeWidth').textContent = j - i + 1;
}

function reset() {
    document.getElementById('result').style.display = 'none';
    document.getElementById('setup').style.display = 'block';
}
