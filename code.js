
//declare our cells variable then use a query selector for all cells on the board
const cells = document.querySelectorAll(".cell"); //const used because they will not change. 

// define player X and player O.  
const player_x = "X";  // Const used because they will not change.
const player_o = "O";

// track turns as a let variable, not as a const, because it will change. 
let turn = player_x; // game will start as player_x. 

// define gameBoard array
const gameBoard = Array(cells.length);  // gameBoard variable is now our Array with the property of (cells.length).

gameBoard.fill(null);  // .fill method used in order to fill the array elements. (null) to start the Array or board as empty.


// connect our HTML elements 
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);  //event listener for play again button. event of click, and run startNewGame function.

// this function will start our new game and reset everything. 
function startNewGame(){
    gameOverArea.className = "hidden";  //hides the game over area once new game begins
    gameBoard.fill(null);               // update the array to null using .FILL METHOD
    cells.forEach((cell) => (cell.innerText = "")); //loop through cells and update inner text to an empty string using .forEach and arrow function
    turn = player_x;   // begins new game as player_x turn regardless of end game result
}

//define variables for audio. const used as they will not change. 
const longBeep = new Audio("audio/clockbeep.mp3");
const winSound = new Audio("audio/tada.mp3");
winSound.volume = 0.2;        
const tieSound = new Audio("audio/tie.wav");
tieSound.volume = 0.2;

// add event listener for each cell on the board. forEach and arrow function is used here instead of adding event listeners to each cell individually
cells.forEach((cell) => cell.addEventListener('click', cellClick))  //loop through cells using forEach method.
//adds an addEventListener for each cell, (add 'click' event, then call cellClick (which is defined below))
// https://www.w3schools.com/jsref/jsref_forEach.asp
// https://www.w3schools.com/js/js_arrow_function.asp





//define cellClick function. event paramater for which box was clicked.
function cellClick(event){
    if(gameOverArea.classList.contains('visible'))  {  //if game over area class list contains visible (x or o), 
        return;  // then return to stop function. (so you cannot click a cell while the game over message is displayed)
    }


    // event.target returns the element that triggered a specific event. in this case the cell that is clicked
    const cell = event.target;          // event.target https://www.w3schools.com/jsref/event_target.asp
    const cellNumber = cell.dataset.index; //access cell data-index from HTML document
    if(cell.innerText != "") { // if the cell inner text is not equal (!= non-strict inequality op) to "" (which is equal to false), then either x/o is already in the cell, or we
        return;                 // run code block. return to exit
    }

    //using if, else statement to alternate between x and o's turns.
    if(turn === player_x) {             // (the game starts as player x) if it's player_x's turn,  
        cell.innerText = player_x;      // update the cell text to player_x ("x") as defined at the top of this page,
        gameBoard[cellNumber-1] = player_x; // and update the gameBoard cell. Minus 1 because arrays start at 0, but data-index on our HTML div is labeled 1 through 9.
        turn = player_o;    //using our LET variable named turn, we then change to player_o
    }
    else {                          //else,
        cell.innerText = player_o;   //update the cell text to player_o ("o")
        gameBoard[cellNumber-1] = player_o;  //update the gameBoard cell to player_o
        turn = player_x;  //back to player_x turn
    }
    longBeep.play();  //calls our audio function and plays the audio after each move

    checkWin(); //calls our checkWinner function. Checks for a winner on each cell click
}







//define checkWin function
function checkWin(){             // for-of statement is used to loop over all winning combinations
    for(const winCombo of winCombos) { // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of


// extract the combo from winCombos array below, using Object Destructuring: "The destructuring assignment syntax is a JavaScript expression that makes it possible to 
//unpack values from arrays, or properties from objects, into distinct variables." - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// also: https://www.javascripttutorial.net/es6/javascript-object-destructuring/
     const { combo } = winCombo;  //extracts the combo from our winCombos array below, and we turn it into variable winCombo
     const cellValue1 = gameBoard [combo[0] - 1];   //row array
     const cellValue2 = gameBoard [combo[1] - 1];   //column array
     const cellValue3 = gameBoard [combo[2] - 1];   //diagonal array
     // this stores each value in a variable. gameBoard is an array, and combo 
     // has three arrays of possible winning combos, so [0] [1] [2] are used, and
     // -1 is used because our three winning combo arrays each start with 1 (below)


// if cellValue1 is NOT equal to null, AND cellValue1 IS EQUAL to cellValue2 AND cellValue1 IS EQUAL to cellValue3, there is a winner.
     if (cellValue1 != null && cellValue1 === cellValue2 && cellValue1 === cellValue3) {
        // console.log('win test');  //test 
         gameOverScreen(cellValue1);  //game over screen function passing in the winner. (must be any of the three cellValues)
         return;    // return to end this statment
     }
 }

// function to check for a tie if every square is filled in without a win
    const allCellsFilled = gameBoard.every((cell) => cell !== null);  //checks all cells in gameBoard array using an arrow function to determine that they are all NOT EQUAL to null/empty
    if(allCellsFilled) {     //if allCellsFilled returns true, then..
        gameOverScreen();   //run gameOverScreen function 
    }
}






//game over screen function containing an if/else if statment to display the three possible outcomes
function gameOverScreen(winner) {   // gameOverScreen function that passes in (winner)
    let text = 'Tie!'            // text will be a tie by default          
    if(winner === player_o) {    // if the winner is player O,            
        text = 'Winner is O';     // display text 'winner is O'
    }else if (winner === player_x) { //else if the winner is player X,
        text = 'Winner is X'         // display text 'winner is X'
    }                                      
    gameOverArea.className = 'visible'; //replace hidden with visible on HTML element
    gameOverText.innerText = text;  //update the gameOverText.innerText on HTML element
    winSound.play();                //plays audio function
}






// arrays for all winning combinations 
const winCombos = [  // defines variable winCombos
    //row combos.         These are objects that contain our winning combinations
    {combo: [1, 2, 3] },  
    {combo: [4, 5, 6] },
    {combo: [7, 8, 9] },
    //column combos
    {combo: [1, 4, 7] },
    {combo: [2, 5, 8] },
    {combo: [3, 6, 9] },
    //diagonal combos
    {combo: [1, 5, 9] },
    {combo: [3, 5, 7] },
    ];

