
// Initialize the game state
const game ={
    currentPlayer: "X", // starts with player ("X")
    board: Array(9).fill(null), //Represents the game board as empty
    gameOver: false, //tracks if the game is over
    scores: JSON.parse(localStorage.getItem("ticTacToeScores")) || {X:0, O:0}, // keeps track of the scores in the local storage
};

// creates function to start game
function initializeGame() {
    updateTurnDisplay(); //updates the turn tracker
    updateScoreboard();
    setupBoard();
}

function setupBoard () {
        // attaches click event listeners to all game squares on game board
        document.querySelectorAll(".game-square").forEach((square, index) => { 
            square.textContent = ""; // clears any text from squares
            square.classList.remove("highlight"); // removes any previous highlight styling
            square.removeEventListener("click",handleSquareClick);
            square.addEventListener("click",() => handleSquareClick(index)); //adds a click event listener to handle moves on this square
        });
        game.board.fill(null);
        game.gameOver = false;
        game.currentPlayer = "X";
        updateTurnDisplay();
}

function updateTurnDisplay() {
    document.getElementById("turn").textContent = game.currentPlayer;
}

// creates a function to handle clicks on game squares
function handleSquareClick(index) {

    if (game.gameOver || game.board[index] != null) return;

    game.board[index] = game.currentPlayer; // update the board state with the current player's mark
    // update the UI to show the current player's mark on the clicked square
    const square = document.getElementById(`square-${index}`);
    square.textContent = game.currentPlayer;

    const winner = checkWinner();
    if (winner) {
        endGame(winner);
    }
    else if (game.board.every((cell) => cell != null)) {
        endGame("Tie");
    }
    else {
        switchPlayer();
    }
}

// switches to the next player
function switchPlayer(){
    game.currentPlayer = game.currentPlayer == "X" ? "O": "X"; // toggles player
    updateTurnDisplay(); // updates the turn display
}

// function to check for winner
function checkWinner() {
    const winningCombs = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
        [0, 4, 8], [2, 4, 6], // diagonals
    ];

    for (const combo of winningCombs) {
        const [a, b, c] = combo;
        if (
            game.board[a] &&
            game.board[a] == game.board [b] &&
            game.board[a] == game.board[c]
        ){
        return game.board[a]; // returns the winner
        }
    }
    return null;
}

function endGame(winner) {
    game.gameOver = true;
    if (winner == "Tie") {
        alert("It's a Tie");
    }
    else {
        alert(`${winner} wins!`);
        game.scores[winner]++;
        localStorage.setItem("ticTacToeScores", JSON.stringify(game.scores));
        updateScoreboard();
    }
}

function updateScoreboard() {
    document.getElementById("scoreboard-x").textContent = game.scores.X;
    document.getElementById("scoreboard-o").textContent = game.scores.O;
}

// starts the game
initializeGame();