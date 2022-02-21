
//declare our cells variable then use a query selector for all cells on the board
const cells = document.querySelectorAll(".cell"); //const used because they will not change. 


// define player X and player O.  
const player_x = "X";  // Const used because they will not change.
const player_o = "O";

// track turns as a let variable, not as a const, because it will change. 
let turn = player_x; // game will start as player_x. 

// define gameBoard array
const gameBoard = Array(cells.length);  // Array(cells.length) returns the length of our array
gameBoard.fill(null);  // .fill method used in order to fill the array elements. in this case (null) for empty 
//console.log(gameBoard);


// connect our HTML elements 
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
//playAgain.addEventListener("click", startNewGame);




//define variables for audio. const used as they will not change. 
const longBeep = new Audio("audio/clockbeep.mp3");
const winSound = new Audio("audio/tada.mp3");
const tieSound = new Audio("audio/tie.wav");


// add event listeners for each cell on the board
cells.forEach((cell) => cell.addEventListener('click', cellClick))  //loop through cells using forEach.  
        //call addEventListener for each cell, (adds 'click' event, then call cellClick (which is defined below))

// this function will display x or o text on hover. 
function hoverText() {
    // using forEach to loop through the cells, we will remove text
    cells.forEach(cell => {  //arrow function with code block that runs to remove x-hover or o-hover 
        cell.classList.remove("x-hover");  // using the classList property allows us to add or remove CSS classes on an element!
        cell.classList.remove("o-hover");
    });

    // hoverClass variable to define which classList to use based on who's turn it is
    const hoverClass = `${turn.toLowerCase()}-hover`;  
    //string template is used to change current turn to lower case letter using toLowerCase method (either o-hover, or x-hover)

    cells.forEach((cell) => {         //loop through the cells, use arrow function to run code block
        if (cell.innerText == "") {   //if the cell inner text is equal to "" (x-hover or o-hover), 
            cell.classList.add(hoverClass);  //using the classList property, adds the appropriate hoverClass defined above.
        }
    })
}
hoverText(); // call hoverText function so the first move letter of x displays on hover.
 


//define cellClick function. event paramater tells us which box was clicked.
function cellClick(event){
    if(gameOverArea.classList.contains('visible'))  {  //if game over area class list contains visible (x or o), 
        return;  // then return to stop function. (so you cannot click a cell while the game over message is displayed)
    }


    // event.target tells us which cell was clicked. 
    const cell = event.target;
    const cellNumber = cell.dataset.index; //access cell data-index from HTML document
    if(cell.innerText != "") { // if the cell inner text is not equal (!= non-strict inequality op) to "" (which is equal to false), then either x/o is already in the cell, or we
        return;                 // run code block of return to exit
    }

        //using if, else statements to alternate between x and o's turns.
    if(turn === player_x) {             // (the game starts as player x) if it's player_x's turn,  
        cell.innerText = player_x;      // update the cell text to player_x ("x") as defined at the top of this page,
        gameBoard[cellNumber-1] = player_x; // and update the gameBoard cell. Minus 1 because arrays start at 0, but data-index on our HTML div is labeled 1 through 9.
        turn = player_o;    //using our LET variable named turn, we then change to player_o
    }
    else {                          //else,
        cell.innerText = player_o;   //update the cell text to player_o ("o")
        gameBoard[cellNumber-1] = player_o;
        turn = player_x;  //back to player x
    }
    longBeep.play();  //calls our audio function and plays the sound with each move

    hoverText();  
    // call our hoverText function here so correct alternating turn letters display on hover, and not on cells that already have a letter. 

    checkWinner(); //calls our checkWinner function. Checks for a winner on each cell click
}

//define checkWinner function

function checkWinner(){
    for(const winCombos of winCombos) {
        console.log(combo);
}
}
// array for winning combinations
const winCombos = [   
    //row combos
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //column combos
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonal combos
    [0, 4, 8],
    [2, 4, 6]
    ]

