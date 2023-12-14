/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
const prompt = require('prompt-sync')({sigint: true});
const assert = require('assert');

// The board object used to save the current status of a gameplay
let board = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    // mark the board with 'X' or 'O'
    board[position] = mark;
} 

// TODO: print the game board as described at the top of this code skeleton
// Will not be tested in Part 1
function printBoard() {

    const newBoard = [];

    // Assigning an empty array called newBoard
    for (i=1; i <= 9; i++){
        newBoard[i] = " ";
    }

    // Assigning mark onto the board based on the key object of the board
    for (let position in board){
        newBoard[position] = board[position];
    }

    console.log(
        newBoard[1] + " | " + newBoard[2] + " | " + newBoard[3] 
        + "\n---------\n" +
        newBoard[4] + " | " + newBoard[5] + " | " + newBoard[6]
        + "\n---------\n" +
        newBoard[7] + " | " + newBoard[8] + " | " + newBoard[9]
    );
}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
// position is an input String
function validateMove(position) {

    // coverting position to a number
    const numPosition = Number(position);

    // check if the numPosition is NaN (wrong input)
    if (isNaN(numPosition)){
        return false;
    } 
    // check if out of bound
    else if (numPosition < 1 || numPosition > 9){
        return false
    } 
    // check if it is occupied
    else if (board[numPosition] !== " "){
        return false
    }

    // if there is no error, then the move is valid
    return true

}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9], 
    [1, 5, 9], [3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    
    // check the combinations from the winCombinations
    for (const combination of winCombinations){
        const [a, b, c] = combination;

        // check if the positions have the same mark
        if (board[a] === player && board[b] === player && board[c] === player ){
            return true // there's a winner, the loop stop 
        }
    }

    return false // no winner found
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {

    for (const element in board){
        
        // check if there is any empty space in the array
        if (board[element] === " "){
            return false
        } 
    }

    return true // after every element has been checked, and return true only if they are not empty
}


// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc

// Below code is used without the feature of restart the game option
// function playTurn(player) {

//     // ask the player 'X' or 'O' to input their position for the mark
//     console.log(player + "'s turn");
//     let position = prompt ("Enter your position (1-9): ");

//     // checking if the position is valid, so the following actions are carried out
//     if (validateMove(position)){

//         markBoard(position, player);
//         printBoard();

//         // after the board has been updated, the game will check for if there is a winner or a tie
//         if (checkWin(player)){

//             console.log("Winner: " + player);
//             console.log("End Game");
//             winnerIdentified = true

//         } else if (checkFull()){

//             console.log("It's a tie!");
//             console.log("End Game");
//             winnerIdentified = true

//         } else {

//             currentTurnPlayer = (player === "X") ? "O" : "X";
//         }

//     } else {

//         console.log("Invalid input. Try again.")
//         playTurn(player);
//     }

// }

// // entry point of the whole program
// console.log('Game started: \n\n' +
//     ' 1 | 2 | 3 \n' +
//     ' --------- \n' +
//     ' 4 | 5 | 6 \n' +
//     ' --------- \n' +
//     ' 7 | 8 | 9 \n');

// let winnerIdentified = false
// let currentTurnPlayer = 'X'

// while (!winnerIdentified){
//     playTurn(currentTurnPlayer);
//     // feel free to add logic here if needed, e.g. announcing winner or tie
// }


// Bonus Point: Implement the feature for the user to restart the game after a tie or game over

// creating a function of playGame so the whole function can be called out when the user want to restart
function playGame(){

    console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

    let winnerIdentified = false
    let currentTurnPlayer = 'X'

    while(!winnerIdentified){
        // ask the player 'X' or 'O' to input their position for the mark
        console.log(currentTurnPlayer + "'s turn");
        let position = prompt ("Enter your position (1-9): ");

        // checking if the position is valid, so the following actions are carried out
        if (validateMove(position)){

            markBoard(position, currentTurnPlayer);
            printBoard();
            
            // after the board has been updated, the game will check for if there is a winner or a tie
            if (checkWin(currentTurnPlayer)){

                console.log("Winner: " + currentTurnPlayer);
                console.log("End Game");
                winnerIdentified = true

            } else if (checkFull()){

                console.log("It's a tie!");
                console.log("End Game");
                winnerIdentified = true

            } else {

                currentTurnPlayer = (currentTurnPlayer === "X") ? "O" : "X";
            }

        } else {

            console.log("Invalid input. Try again.")
        
        }

    }

    // as the game finished, it will ask if the user wants to restart the game
    const answer = prompt ("Do you want to start a new game? (Y or N): ");

    if (answer === "Y" || answer === "y"){

        board = {
            1: ' ',
            2: ' ',
            3: ' ',
            4: ' ',
            5: ' ',
            6: ' ',
            7: ' ',
            8: ' ',
            9: ' '
        };
        
        playGame();

    } else {

        console.log("Thank you for playing!")

    }
}

playGame();