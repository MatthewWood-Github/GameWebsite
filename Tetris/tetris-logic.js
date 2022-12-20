const piece_T = {
    shape: [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 0] 
    ],

    sprite: 'block-cyan.png',
    rotation: [
        [[1,-1], [1,1], [-1,1], [-1,-1]],
        [[0,0], [0,0], [0,0], [0,0]],
        [[-1,-1], [1,-1], [1,1], [-1,1]],
        [[-1,1], [-1,-1], [1,-1], [1,1]]
    ]
};

const piece_I = {
    shape: [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0]
    ],

    sprite: 'block-gold.png',
    rotation: [
        [[2,-1], [1,2], [-2,1], [-1,-2]],
        [[1,0], [0,1], [-1,0], [0,-1]],
        [[0,1], [-1,0], [0,-1], [1,0]],
        [[-1,2], [-2,-1],[1,-2], [2,1]]
    ]
};

const piece_J = {
    shape: [
    [0, 0],
    [0, 1],
    [1, 1],
    [2, 1]
    ],

    sprite: 'block-green.png',
    rotation: [
        [[2,0], [0,2], [-2,0], [0,-2]],
        [[1,-1], [1,1], [-1,1], [-1,-1]],
        [[0,0], [0,0], [0,0], [0,0]],
        [[-1,1], [-1,-1], [1,-1], [1,1]]
    ]
};

const piece_Z = {
    shape: [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1]
    ],

    sprite: 'block-red.png',
    rotation: [
        [[2,0], [0,2], [-2,0], [0,-2]],
        [[1,1], [-1,1], [-1,-1], [1,-1]],
        [[0, 0], [0, 0], [0, 0], [0, 0]],
        [[-1,1], [-1,-1], [1,-1], [1,1]]
    ]
};

const piece_S = {
    shape: [
    [0, 1],
    [1, 1],
    [1, 0],
    [2, 0]
    ],

    sprite: 'block-blue.png',
    rotation: [
        [[1,-1], [1,1], [-1,1], [-1,-1]],
        [[0,0], [0,0], [0,0], [0,0]],
        [[1,1], [-1,1], [-1,-1], [1,-1]],
        [[0,2], [-2,0], [0,-2], [2,0]]
    ]
};

const piece_O = {
    shape: [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
    ],
    
    sprite: 'block-pink.png',
    rotation: [
        [[0, 0], [0, 0], [0, 0], [0, 0]],
        [[0, 0], [0, 0], [0, 0], [0, 0]],
        [[0, 0], [0, 0], [0, 0], [0, 0]],
        [[0, 0], [0, 0], [0, 0], [0, 0]]
    ]
};

const piece_L = {
    shape: [
    [0, 1],
    [1, 1],
    [2, 1],
    [2, 0],
    ],
    
    sprite: 'block-yellow.png',
    rotation: [
        [[1,-1], [1,1], [-1,1], [-1,-1]],
        [[0,0], [0,0], [0,0], [0,0]],
        [[-1,1], [-1,-1], [1,-1], [1,1]],
        [[0,2], [-2,0], [0,-2], [2,0]]
    ]
};

var possiblePieces = [piece_I, piece_L, piece_O, piece_T, piece_Z, piece_S, piece_J];

var pieceCount = 0;
var pieces = [];

var grid = document.getElementById("grid");

var currentKey;

function createBoard(width, height)
{
    var output = [];
    for (var i = 0; i < width; i++)
    {
        output[i] = [];

        for (var j = 0; j < height; j++)
            output[i][j] = "_";
    }
        
    return output;
} 

function drawPieces()
{
    grid.innerHTML = "";

    for (let i = 0; i < board.length; i++)
    {
        for (let j = 0; j < board[i].length; j++)
        {
            if (notEmptySpace(board[i][j]))
            {
                let piece = pieces[board[i][j]-1];
                let elem = document.createElement("img");
                elem.setAttribute("src", `${piece.sprite}`);
                elem.setAttribute("alt", "block");
                elem.style.position = "absolute";

                let blockX = i * blockWidth;
                let blockY = j * blockWidth;

                elem.style.transform = `translate(${blockX}px, ${blockY}px`;
                grid.append(elem);
            }
        }
    }
}

function update()
{   
    board = createBoard(10, 20);
    for (let i = 0; i < pieces.length; i++)
    {
        let piece = pieces[i];

        for (let j = 0; j < piece.blocks.length; j++)
        {
            let block = piece.blocks[j];
            board[block.x][block.y] = piece.id;
        }
    }
}

function notEmptySpace(space)
{
    return (space != "_" && !(space === undefined));
}

function getRow(row)
{
    let output = [];
    for (let x = 0; x < 10; x++)
    {
        output[x] = board[x][row];
    }
    return output;
}

function checkAllRowsForClears()
{
    let rows = [];
    for (let x = 19; x >= 0; x--)
    {
        if (!getRow(x).includes("_"))  rows.push(x);
    }

    let start = rows[rows.length-1];
    let len = rows.length;
    rows.forEach(row => destroyRow(row));
    moveBlocks(start, len);
}

function getBlock(id, x, y)
{
    let piece = pieces[id-1];

    for (let j = 0; j < piece.blocks.length; j++)
    {
        let block = piece.blocks[j];
        if (block.x == x && block.y == y) return block;
    }

    return false;
}

function destroyRow(row)
{
    for (let x = 0; x < 10; x++)
    {
        if (board[x][row] != "_")
        {
            let piece = pieces[board[x][row]-1];
            let block = getBlock(board[x][row], x, row);
            piece.blocks.splice(piece.blocks.indexOf(block), 1);
        }
    }
}

function moveBlocks(start, amount)
{
    let blocks = [];
    for (let x = 0; x < 10; x++)
    {
        for (let y = start; y >= 0; y--)
        {
            if (board[x][y] != "_" && !(board[x][y] === undefined))
            {
                if (getBlock(board[x][y], x, y) != false) blocks.push(getBlock(board[x][y], x, y));
            } 
        }
    }

    blocks.forEach(block => block.moveDown(amount));
}

function inputEngine(e)
{
    currentKey = e.key.toUpperCase();

    switch(currentKey)
    {
        case("A"):
            currentPiece.moveHorizontal(-1);
            break;

        case("D"):
            currentPiece.moveHorizontal(1);
            break;
        
        case("S"):
            currentPiece.moveDown();
            break;

        case("E"):
            currentPiece.rotate();
            break;
    }
    update();
    drawPieces();
}

function playerInput()
{
    window.addEventListener("keydown", inputEngine);
}

function checkWin()
{
    for (let x = 0; x < 10; x++)
    {
        if (getRow(0)[x] != "_") return true;
        if (getRow(1)[x] != "_") return true;
    }

    return false;
}

function endGame()
{
    window.removeEventListener("keydown", inputEngine);
    clearInterval(game);
    let overlay = document.createElement("img");
    overlay.className = "overlay";
    grid.appendChild(overlay);

    let restartButton = document.createElement('button');
    restartButton.innerHTML = "<img src='retry-button.png' style='box-shadow: 5px 5px;' onclick='window.location.reload()'>";
    restartButton.className = "restart-button";
    grid.appendChild(restartButton);
}

class Piece {
    constructor(startX, startY, type) {
      this.startX = startX;
      this.startY = startY;
      this.id = ++pieceCount;

      this.type = type['shape'];
      this.sprite = type['sprite'];
      this.rotation = type['rotation'];
      this.rotationState = 4;
      this.blocks = this.createBlocks();

      this.moveable = this.canMoveDown();
      pieces.push(this);
    }

    createBlocks()
    {
        let out = [];
        for (let i = 0; i < this.type.length; i++)
        {
            out[i] = new Block(this.id, this.startX + this.type[i][0], this.startY + this.type[i][1]);
        }

        return out;
    }
    canMoveDown()
    {
        for (let i = 0; i < this.blocks.length; i++)
        {
            let currentBlock = this.blocks[i];
            if (!currentBlock.canMoveDown()) return false;
        }

        return true;
    }

    moveDown()
    {
        if (!this.canMoveDown())
        {
            if (checkWin() == true)
            {
                playing = false;
                return;
            } 

            checkAllRowsForClears();
            let type = possiblePieces[Math.floor(Math.random() * possiblePieces.length)];
            currentPiece = new Piece(4, 0, type);
            return;
            
        } 

        for (let i = 0; i < this.blocks.length; i++)
        {
            this.blocks[i].moveDown(1);
        }
    }

    canMoveHorizontal(direction)
    {
        // TODO Simplify
        for (let i = 0; i < this.blocks.length; i++)
        {
            let currentBlock = this.blocks[i];           
            
            if (direction == -1 && currentBlock.x <= 0) return false;
            else if (direction == 1 && currentBlock.x >= board.length-1) return false;

            if (0 < currentBlock.x && currentBlock.x < board.length-1)
            {
                let leftX = board[currentBlock.x-1][currentBlock.y];
                let rightX = board[currentBlock.x+1][currentBlock.y];
    
                if (direction == -1 && notEmptySpace(leftX)  && leftX != currentBlock.id) return false;
    
                if (direction == 1 && notEmptySpace(rightX) && rightX != currentBlock.id) return false;
            }
        }

        return true;
    }

    moveHorizontal(direction)
    {
        if (!this.canMoveHorizontal(direction)) return;

        for (let i = 0; i < this.blocks.length; i++)
        {
            this.blocks[i].moveHorizontal(direction);
        }
    }

    isNextRotationValid()
    {
        let nextRotationState = this.rotationState+1;
        if (nextRotationState >= 3) nextRotationState = 0;
        console.log(nextRotationState);

        for (let i = 0; i < this.blocks.length; i++)
        {
            let rotationSet = this.rotation[i];
            let currentBlock = this.blocks[i];

            let nextPos = board[currentBlock.x + rotationSet[nextRotationState][0]][(currentBlock.y + rotationSet[nextRotationState][1])];
            if(nextPos === undefined) return false; 
            if(nextPos != this.id && nextPos != "_") return false;
        }

        return true;
    }

    rotate()
    {
        console.log(this.isNextRotationValid());
        if (!this.isNextRotationValid()) return;
        
        if (this.rotationState < 3) this.rotationState++;
        else if (this.rotationState >= 3) this.rotationState = 0;

        for (let i = 0; i < this.blocks.length; i++)
        {
            let rotationSet = this.rotation[i];
            let currentBlock = this.blocks[i];

            currentBlock.x += rotationSet[this.rotationState][0];
            currentBlock.y += rotationSet[this.rotationState][1];
        }
    }
}

class Block {
    constructor(id, x, y) {
        this.x = x;
        this.y = y;
        this.id = id;
    }

    moveHorizontal(direction)
    {
        this.x += direction;
    }

    moveDown(amount)
    {
        this.y += amount;
    }
    
    getSpaceBelow()
    {
        return board[this.x][this.y+1];
    }

    canMoveDown()
    {
        if (this.getSpaceBelow() === undefined) return false;
        if (this.getSpaceBelow() != ("_") && this.getSpaceBelow() != this.id) return false;

        return true;
    }
}

var board = createBoard(10,20);
var blockWidth = 30;
var startCoords = [4,0]
var currentPiece = new Piece(startCoords[0],startCoords[1],possiblePieces[Math.floor(Math.random() * possiblePieces.length)]);
var playing = true;

function main()
{
    if (playing == false) endGame();
    else if (playing == true)
    {
        currentPiece.moveDown();
        update();
        drawPieces();
    }
}

playerInput();
main();

var game = setInterval(main, 300);
