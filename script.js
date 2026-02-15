const board = document.getElementById("board");
const currentTileImg = document.getElementById("currentTile");
const scoreEl = document.getElementById("score");

let score = 0;
let columns = [];
let currentValue;

const values = [2,4,8,16,32,64,128];

function createBoard() {
    for(let i=0; i<5; i++) {
        const col = document.createElement("div");
        col.classList.add("column");
        col.addEventListener("click", () => dropTile(i));
        board.appendChild(col);
        columns.push([]);
    }
}

function randomTile() {
    return values[Math.floor(Math.random()*values.length)];
}

function setCurrentTile() {
    currentValue = randomTile();
    currentTileImg.src = `images/tile${currentValue}.png`;
}

function dropTile(colIndex) {

    let col = columns[colIndex];

    if(col.length >= 8) return; // limit height

    col.push(currentValue);
    mergeColumn(colIndex);
    render();
    setCurrentTile();
}

function mergeColumn(colIndex) {
    let col = columns[colIndex];

    for(let i=0; i<col.length-1; i++) {
        if(col[i] === col[i+1]) {
            col[i] *= 2;
            score += col[i];
            col.splice(i+1,1);
            mergeColumn(colIndex);
            break;
        }
    }
}

function render() {
    const colDivs = document.querySelectorAll(".column");
    colDivs.forEach((colDiv, index) => {
        colDiv.innerHTML = "";
        columns[index].forEach(value => {
            const img = document.createElement("img");
            img.src = `images/tile${value}.png`;
            img.classList.add("tile");
            colDiv.appendChild(img);
        });
    });
    scoreEl.innerText = score;
}

createBoard();
setCurrentTile();
