
//declare our "cells". document.queryselector for ALL cells on the board
const cells = document.querySelectorAll(".cell");


// define player X and player O
const player_x = "X";
const player_o = "O";

// track turns as let, not as a const, because it will change. starting as player x.
let turn = player_x;

// define gameboard as our array to include cells.length
const gameBoard = Array(cells.length);
gameBoard.fill(null);  // fill in the gameboard array with values of null
//console.log(gameBoard);


// connect our HTML elements
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
//playAgain.addEventListener("click", startNewGame);




//define variables for audio
const longBeep = new Audio("audio/clockbeep.mp3");
const winSound = new Audio("audio/tada.mp3");
const tieSound = new Audio("audio/tie.wav");


// add event listeners for each cell on the board
cells.forEach((cell) => cell.addEventListener('click', cellClick))  //loop through the cells using forEach. function for event lister. 


// function that displays our text on hover

function hoverText() {
    //remove hover text
    cells.forEach(cell => {  //loop through cells with forEach. function to remove x or o-hover. 
        cell.classList.remove("x-hover");
        cell.classList.remove("o-hover");
    });

    const hoverClass = `${turn.toLowerCase()}-hover`;   // string template

    cells.forEach((cell) => {
        if (cell.innerText == "") {
            cell.classList.add(hoverClass);
        }
    })
}

hoverText(); // call hoverText function so first move letter (x) displays on hover.
 

//define cellClick function. event gives us which box was clicked.
function cellClick(event){
    if(gameOverArea.classList.contains('visible'))  {     //if game over area class list contains visible (x or o), then return to stop function.
        return; 
    }



    const cell = event.target;
    const cellNumber = cell.dataset.index; 
    if(cell.innerText != "") {
        return;
    }

    if(turn === player_x) {
        cell.innerText = player_x;
        gameBoard[cellNumber-1] = player_x;
        turn = player_o; //back to player o
    }
    else {
        cell.innerText = player_o;
        gameBoard[cellNumber-1] = player_o;
        turn = player_x;  //back to player x
    }
    longBeep.play();  //calls our audio function and plays a sound with each move

    hoverText();  // call our hoverText function again so correct alternating turn letters also display on hover. 
}


//function startNewGame() {
 //   strike.className = "strike";
 //   gameOverArea.className = "hidden";
 //   boardState.fill(null);
 //   tiles.forEach((tile) => (tile.innerText = ""));
 //   turn = PLAYER_X;
 //   hoverText();
//  }