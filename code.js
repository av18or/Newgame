
//declare our "cells" variable as a query selector for each cell on the board
const cells = document.querySelectorAll(".cell");


// define player X and player O
const player_x = "x";
const player_o = "o";

// "turn" defined as player x
let turn = player_x;

// define gameboard as our array with cells.length
const gameboard = Array(cells.length);
gameboard.fill(null);




