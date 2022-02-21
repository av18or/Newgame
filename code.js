
//declare our "cells". document.queryselector for ALL cells on the board
const cells = document.querySelectorAll(".cell");


// define player X and player O
const player_x = "x";
const player_o = "o";

// track turns as let, not as a const, because it will change. starting as player x.
let turn = player_x;

// define gameboard as our array as cells.length
const gameboard = Array(cells.length);
gameboard.fill(null);  // fill in the gameboard array with values of null
//console.log(gameboard);


//HTML elements
const turnMessage = document.getElementsByClassName("turn-message");
const resetButton = document.getElementById("reset");



//define variables for audio
const shortBeep = new Audio("audio/beep-short.mp3");
const longBeep = new Audio("audio/clockbeep.mp3");
const winSound = new Audio("audio/tada.mp3");
const tieSound = new Audio("audio/tie.wav");


// add event listeners for each cell on the board
cells.forEach((cell) => cell.addEventListener('click', cellClick))

//define cellClick function. event gives us which box was clicked.
function cellClick(event){
    if(gameOverArea.classList.contains('visible'))  {       //if game over area class list contains visible (x or o), then return to stop function.
        return; 
    }

    const cell = event.target;
    const cellNumber = cell.
