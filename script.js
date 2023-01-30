const board = document.querySelector('.board');
const size = document.querySelector('#size');
const button = document.querySelector('button');
const color = document.querySelector('#color');
const erase = document.querySelector('.erase');
const changer = document.querySelector('.change');
const random = document.querySelector('.random');
const clear = document.querySelector('.clear-board');

color.disabled = true;

let colorVal = 'black'

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function colorSquare(e) {
    if(e.type === 'mouseover' && mouseDown) {
        this.style.backgroundColor = colorVal;
    }
    
}

function generateRandomColor(){
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    colorVal = `#${randColor.toUpperCase()}`
}


function createSquares() {
    let sq = document.createElement('div');
    sq.addEventListener('mouseover', colorSquare);
    sq.addEventListener('mousedown', colorSquare);
    board.appendChild(sq);
}

function createBoard(size) {
    let boardSize = size;
    board.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`
    board.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`

    let amount = boardSize * boardSize;

    for(let i = 0; i < amount; i++) {
        createSquares();
    }
}

function inputHandler() {


    let value = size.value;

    if(value >= 2 && value <= 100) {
        board.textContent = ''
        createBoard(value);
        color.disabled = false;
    }
    else {
        board.innerHTML = '<p>Too many squares or too little squares</p>'
    }

}





button.addEventListener('click', inputHandler);
changer.addEventListener('click', () => {
    colorVal = color.value;
})
erase.addEventListener('click', () => {
    colorVal = 'white';
})

random.addEventListener('click', generateRandomColor);

clear.addEventListener('click', () => {
    board.innerHTML = '';
    inputHandler();
})


