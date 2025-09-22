let dataset = [];
let maxIterations = 0;
let currentIteration = 0;
let low = 0;
let high = 0;

function startVoting() {
    dataset = document.getElementById('dataset').value.split(',').map(Number).sort((a,b) => a-b);
    maxIterations = parseInt(document.getElementById('iterations').value);
    
    low = 0;
    high = dataset.length - 1;
    currentIteration = 0;
    
    document.getElementById('setup').style.display = 'none';
    document.getElementById('voting').style.display = 'block';
    updateDisplay();
}

function vote(isGreater) {
    const mid = Math.floor((low + high) / 2);
    
    if (isGreater) {
        low = mid + 1;
    } else {
        high = mid;
    }
    
    currentIteration++;
    
    if (currentIteration >= maxIterations || low >= high) {
        showResult();
    } else {
        updateDisplay();
    }
}

function updateDisplay() {
    const guess = dataset[Math.floor((low + high) / 2)];
    document.getElementById('guess').textContent = guess;
    document.getElementById('range').textContent = `${dataset[low]} - ${dataset[high]}`;
    document.getElementById('iter').textContent = `${currentIteration}/${maxIterations}`;
}

function showResult() {
    document.getElementById('voting').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('finalRange').textContent = `${dataset[low]} - ${dataset[high]}`;
}

function reset() {
    document.getElementById('result').style.display = 'none';
    document.getElementById('setup').style.display = 'block';
}
