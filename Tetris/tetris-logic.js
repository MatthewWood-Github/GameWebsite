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

function drawPieces2()
{
    grid.innerHTML = "";

    for (let i = 0; i < pieces.length; i++)
    {
        for (let j = 0; j < pieces[i].blocks.length; j++)
        {
            let block = pieces[i].blocks[j];
            let elem = document.createElement("img");
            elem.setAttribute("src", `${pieces[i].sprite}`);
            elem.setAttribute("alt", "block");
            elem.style.position = "absolute";

            let blockX = block.x * blockWidth;
            let blockY = block.y * blockWidth;

            elem.style.transform = `translate(${blockX}px, ${blockY}px`;
            grid.append(elem);
        }
    }
}

function drawPieces()
{
    grid.innerHTML = "";

    for (let i = 0; i < board.length; i++)
    {
        for (let j = 0; j < board[i].length; j++)
        {
            if (board[i][j] != "_")
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

function playerInput()
{
    window.addEventListener("keydown", function (e) {
        currentKey = e.key.toUpperCase();
        //document.getElementById("keyboard-debug").innerHTML = currentKey;
    
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
    });
}

function validSpace(space)
{
    return space == "_";
}

function checkWin()
{
    for (let i = 0; i < board.length; i++)
    {
        if (board[i][0] != "_") return false; 
        if (board[i][1] != "_") return false; 
    }
    return true;
}


function getRow(row)
{
    output = [];
    for (let i = 0; i < board.length; i++)
    {
        for (let j = 0; j < row; j++)
        {
            output[i] = board[i][j];
        }
    }

    return output;
}

function destroyRow()
{
    if (!getRow(20).includes("_"))
    {
        
        for (let i = 0; i < board.length; i++)
        {
            for (let j = 0; j < 20; j++)
            {
                board[i][j] = "_";
            }
        }
        drawPieces();
        console.log(board);
    } 
}

function checkForRowClears()
{
    console.clear();
    for (let i = 0; i < 20; i++)
    {
        console.log(checkRow(i));
    }
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
            let spaceBelow = currentBlock.y+1;
            let belowValue = board[currentBlock.x][spaceBelow];
            
            if (belowValue === undefined) return false;
            
            if (belowValue != "_" && belowValue != currentBlock.id) return false;
        }

        return true;
    }
    moveDown()
    {
        if (!this.canMoveDown())
        {
            if (!checkWin())
            {
                playing = false;
                return;
            }

            destroyRow();

            let type = possiblePieces[Math.floor(Math.random() * possiblePieces.length)];
            currentPiece = new Piece(4, 0, type);
            return;
        } 

        for (let i = 0; i < this.blocks.length; i++)
        {
            this.blocks[i].moveDown();
        }
    }

    canMoveHorizontal(direction)
    {
        for (let i = 0; i < this.blocks.length; i++)
        {
            let currentBlock = this.blocks[i];           
            
            if (direction == -1 && currentBlock.x <= 0) return false;
            else if (direction == 1 && currentBlock.x >= board.length-1) return false;

            if (0 < currentBlock.x && currentBlock.x < board.length-1)
            {
                let leftX = board[currentBlock.x-1][currentBlock.y];
                let rightX = board[currentBlock.x+1][currentBlock.y];
    
                if (direction == -1 && leftX != "_" && leftX != currentBlock.id) return false;
    
                if (direction == 1 && rightX != "_" && rightX != currentBlock.id) return false;
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

    rotate()
    {
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

    moveDown()
    {
        this.y += 1;
    }
}

var board = createBoard(10,20);
var blockWidth = 30;
var startCoords = [4,0]
var currentPiece = new Piece(startCoords[0],startCoords[1],possiblePieces[Math.floor(Math.random() * possiblePieces.length)]);
var playing = true;

function main()
{
    currentPiece.moveDown();
    update();
    drawPieces();
}
playerInput();
main();
if (playing) setInterval(main, 300);
