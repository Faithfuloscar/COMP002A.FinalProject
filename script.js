
// Initialize the game state
const game ={
    currentPlayer: "x", // current player ("X", "O")
    board: Array(9).fill(null), //Represents the game board
    gameOver: false, //tracks if the game is over
    scores: {X:0, O:0}, // keeps track of the scores
};

function initializeGame() {
    document.querySelectorAll(".game-square").forEach((square, index) => {
        square.textContent = "";
        square.classList.remove("highlight");
        square.addEventListener("click",() => handleSquareClick(index));
    });
};

function handleSquareClick(index) {
    game.board[index] = game.currentPlayer;
    const square = document.getElementById(`square-${ImageBitmapRenderingContext}`);
    square.textContent = game.currentPlayer;
}

initializeGame();