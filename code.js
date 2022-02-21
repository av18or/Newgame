
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
playAgain.addEventListener("click", startNewGame);




//define variables for audio. const used as they will not change. 
const longBeep = new Audio("audio/clockbeep.mp3");
const winSound = new Audio("audio/tada.mp3");
winSound.volume = 0.2;        //adjust volume of audio so we don't scare people
const tieSound = new Audio("audio/tie.wav");
tieSound.volume = 0.2;


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
    // calls our hoverText function here so correct alternating turn letters display on hover, and not on cells that already have a letter. 

    checkWin(); //calls our checkWinner function. Checks for a winner on each cell click
}

//define checkWinner function
// loop over all winning combinations
function checkWin(){
    for(const winCombo of winCombos) {  // const winCombo of winCombos array
        //console.log(winCombo);           // console.log winCombo to see if it works.. so far so good.


     // extract the combo and winClass from winCombos array below, using Object Destructuring: "The destructuring assignment syntax is a JavaScript expression that makes it possible to 
     //unpack values from arrays, or properties from objects, into distinct variables." - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
     const { combo, winClass } = winCombo;  //extracts the combo and winClass from our winCombo
     const cellValue1 = gameBoard [combo[0] - 1];  // storing each value in an array (-1 as it's the first item in our array)
     const cellValue2 = gameBoard [combo[1] - 1];
     const cellValue3 = gameBoard [combo[2] - 1];  

        // if cellValue1 is NOT equal to null, AND cellValue1 IS EQUAL to cellValue2 AND cellValue1 IS EQUAL to cellValue3, we have a winner.
     if (cellValue1 != null && cellValue1 === cellValue2 && cellValue1 === cellValue3) {
        // console.log('win test');  //test 

         gameOverScreen(cellValue1);  //game over screen function passing in the winner
         return;    // return to end this statment
     }
 }

// function to check for a tie if every square is filled in without a win
    const allCellsFilled = gameBoard.every((cell) => cell !== null); 
    if(allCellsFilled) {                //if allCellsFilled returns true, then..
        gameOverScreen(null);
    }
}


//game over screen function
function gameOverScreen(winnerText) {  //pass in winnerText
    let text = 'Tie!'                  // let text = tie by default
    if(winnerText != null) {     // if our winnerText is NOT equal to null, 
        text = `Winner is ${winnerText}`;  // using string template text is equal to either x or o. expressions in placeholders and text between backticks are passed to a function.
    }                                      //use of template literal: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

    gameOverArea.className = 'visible'; //replace hidden with visible
    gameOverText.innerText = text;  //update the gameOverText.innerText
    winSound.play();                //plays audio function
}


//startNewGame function
function startNewGame(){
    gameOverArea.className = "hidden";  //hides the game over area once new game begins
    gameBoard.fill(null);               // update all cells on the board to null
    cells.forEach((cell) => (cell.innerText = "")); //loop through cells and update inner text to an empty string
    turn = player_x;   // begins new game as player_x turn regardless of game result
    hoverText();  // resets our text hover again
}



// arrays for winning combinations 
const winCombos = [   
    //row combos
    {combo: [1, 2, 3], winClass: "row1"},
    {combo: [4, 5, 6], winClass: "row2"},
    {combo: [7, 8, 9], winClass: "row3"},
    //column combos
    {combo: [1, 4, 7], winClass: "column1"},
    {combo: [2, 5, 8], winClass: "column2"},
    {combo: [3, 6, 9], winClass: "column3"},
    //diagonal combos
    {combo: [1, 5, 9], winClass: "diag1"},
    {combo: [3, 5, 7], winClass: "diag2"},
    ];

