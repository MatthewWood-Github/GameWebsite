var board = createBoard(10, 20);
var blockCount = 0;
var blockWidth = 30;

const piece_T = [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 0]
];

const piece_I = [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0]
];

const piece_L = [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 1]
];

const piece_Z = [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1]
];

const piece_O = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
]

var pieces = [];
var pieceCount = 0;

var debugMenu = document.getElementById("debug");

var currentKey;

function createBoard(width, height)
{
    var output = new Array(height);
    for (var i=0; i < output.length; i++)
    {
        output[i] = new Array(width);
        for (var x=0; x < output[i].length; x++)
            output[i][x] = "_";
    }
        
    return output;
} 

function outputHTML()
{   
    debugMenu.innerHTML="";
    var output = "";
    for (var i=0; i < 20; i++)
    {
        for (var j=0; j < 10; j++)
        {
            output+=board[i][j]+"&nbsp;&nbsp;&nbsp;&nbsp;";
        }

        debugMenu.innerHTML += output + "<br><br>";
        output=""
    }  
}

function outputBoard()
{   
    console.clear();
    var output = "";
    for (var i=0; i < 20; i++)
    {
        for (var j=0; j < 10; j++)
        {
            output+=board[i][j]+" ";
        }

        console.log(output);
        output=""
    }  
}

function updateBoard()
{
    board = createBoard(10, 20)
    for (var pieceCounter = 0; pieceCounter < pieces.length; pieceCounter++)
    {
        for (var blockCounter = 0; blockCounter < pieces[pieceCounter].blocks.length; blockCounter++)
        {
            board[pieces[pieceCounter].blocks[blockCounter].Y]
            [pieces[pieceCounter].blocks[blockCounter].X] = pieces[pieceCounter].id;
        }
    }

    outputBoard();
    outputHTML();
}

class Block {
    constructor(X, Y, id) {
        this.X = X;
        this.Y = Y;
        this.id = id;
    }

    moveDown() 
    {
        this.Y +=1;
    }

    moveHorizontal(direction) 
    {
        if (direction == "right")
            this.X += 1;
        else if (direction == "left")
            this.X -= 1;
    }
}

class Piece {
    constructor(startX, startY, type) {
        this.startX = startX;
        this.startY = startY;
        this.type = type;
        this.id = ++pieceCount;
        this.blocks = [];
        this.dead = false;

        this.instantiate();
        setInterval(moveDownPiece, 300, this);
    }

    instantiate()
    {
        this.addBlock(this.type);
        pieces.push(this);
    }

    addBlock(type)
    {
        for (var x = 0; x < type.length; x++)
        {
            var newBlock = new Block(this.startX + type[x][0], this.startY + type[x][1], this.id);
            this.blocks.push(newBlock);
        }
    }

    moveDown()
    {
        for (var x = 0; x < this.blocks.length; x++)
        {
            if (this.blocks[x].Y == board.length-1 || board[this.blocks[x].Y+1][this.blocks[x].X] != "_" && board[this.blocks[x].Y+1][this.blocks[x].X] != this.id)  
            {
                if (this.dead == false)
                {
                    newPiece = new Piece(4, 0, piece_O);
                    this.dead = true;
                }
            }     
            else if (this.dead == false)
                this.blocks[x].moveDown();
        }
    }
}

function moveDownPiece(piece)
{
    piece.moveDown();
}

function playerInput()
{
    window.addEventListener("keydown", function (e) {
        currentKey = e.key.toUpperCase();
        document.getElementById("keyboard-debug").innerHTML = currentKey;
    
        switch(currentKey)
        {
            case("A"):
            for (var x = 0; x < newPiece.blocks.length; x++)
            {
                newPiece.blocks[x].moveHorizontal("left");
                updateBoard();
            }
            break;
    
            case("D"):
            for (var x = 0; x < newPiece.blocks.length; x++)
            {
                newPiece.blocks[x].moveHorizontal("right");
                updateBoard();
            }
            break;
    
            case("S"):
            for (var x = 0; x < newPiece.blocks.length; x++)
            {
                newPiece.blocks[x].moveDown();
                updateBoard();
            }
            break;
        }
    });
}

setInterval(updateBoard, 300);

newPiece = new Piece(4, 0, piece_O);

playerInput();


