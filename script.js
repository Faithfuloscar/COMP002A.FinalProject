
// Initialize the game state
const game ={
    currentPlayer: "x", // starts with player ("X")
    board: Array(9).fill(null), //Represents the game board as empty
    gameOver: false, //tracks if the game is over
    scores: {X:0, O:0}, // keeps track of the scores
};

// creates function to start game
function initializeGame() {
    // attaches click event listeners to all game squares on game board
    document.querySelectorAll(".game-square").forEach((square, index) => { 
        square.textContent = ""; // clears any text from squares
        square.classList.remove("highlight"); // removes any previous highlight styling
        square.addEventListener("click",() => handleSquareClick(index)); //adds a click event listener to handle moves on this square
    });
}

// creates a function to handle clicks on game squares
function handleSquareClick(index) {
    game.board[index] = game.currentPlayer; // update the board state with the current player's mark
    // update the UI to show the current player's mark on the clicked square
    const square = document.getElementById(`square-${index}`);
    square.textContent = game.currentPlayer;
}

// starts the game
initializeGame();