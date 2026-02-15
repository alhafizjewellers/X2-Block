const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");
let score = 0;
let size = 4;
let board = [];

function createBoard() {
    board = [];
    grid.innerHTML = "";
    for (let i = 0; i < size * size; i++) {
        board.push(0);
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.innerText = "";
        grid.appendChild(tile);
    }
    generate();
    generate();
}

function generate() {
    let empty = board.map((val, idx) => val === 0 ? idx : null).filter(v => v !== null);
    if (empty.length === 0) return;
    let randomIndex = empty[Math.floor(Math.random() * empty.length)];
    board[randomIndex] = 2;
    updateBoard();
}

function updateBoard() {
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach((tile, index) => {
        tile.innerText = board[index] === 0 ? "" : board[index];
        tile.style.background = board[index] > 0 ? "#333" : "#2c2c2c";
    });
    scoreDisplay.innerText = score;
}

function slide(row) {
    row = row.filter(val => val);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            score += row[i];
            row[i + 1] = 0;
        }
    }
    row = row.filter(val => val);
    while (row.length < size) row.push(0);
    return row;
}

function moveLeft() {
    for (let i = 0; i < size; i++) {
        let row = board.slice(i * size, i * size + size);
        row = slide(row);
        for (let j = 0; j < size; j++) {
            board[i * size + j] = row[j];
        }
    }
    generate();
}

function moveRight() {
    for (let i = 0; i < size; i++) {
        let row = board.slice(i * size, i * size + size).reverse();
        row = slide(row);
        row.reverse();
        for (let j = 0; j < size; j++) {
            board[i * size + j] = row[j];
        }
    }
    generate();
}

function moveUp() {
    for (let i = 0; i < size; i++) {
        let col = [];
        for (let j = 0; j < size; j++) col.push(board[j * size + i]);
        col = slide(col);
        for (let j = 0; j < size; j++) board[j * size + i] = col[j];
    }
    generate();
}

function moveDown() {
    for (let i = 0; i < size; i++) {
        let col = [];
        for (let j = 0; j < size; j++) col.push(board[j * size + i]);
        col.reverse();
        col = slide(col);
        col.reverse();
        for (let j = 0; j < size; j++) board[j * size + i] = col[j];
    }
    generate();
}

document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") moveLeft();
    if (e.key === "ArrowRight") moveRight();
    if (e.key === "ArrowUp") moveUp();
    if (e.key === "ArrowDown") moveDown();
    updateBoard();
});

function restartGame() {
    score = 0;
    createBoard();
}

createBoard();
