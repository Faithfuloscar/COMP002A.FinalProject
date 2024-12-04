

// Initialize the game state
const game ={
    currentPlayer: "X", // starts with player ("X")
    board: Array(9).fill(null), //Represents the game board as empty
    gameOver: false, //tracks if the game is over
    scores: initializeScores(), // loads the scores from session storage
};

// function to initialize scores
function initializeScores() {
    try {
        // attempts to parse scores from sessionStorage, or default to x:0 o:0
        //(the process of turning one form of data (usually a string of text or numbers or whatever) into a data structure.)
        return JSON.parse(sessionStorage.getItem("ticTacToeScores")) || {X: 0 , O: 0};
    } catch (error) {
        // If an error occurs logs a warning and sets default score 0-0
        console.warn("session storage not available", error);
        return {X : 0, O: 0};
    }
    
}

// creates function to start game
function initializeGame() {
    updateTurnDisplay(); //updates the turn tracker
    updateScoreboard(); // updates the scoreboard with current score
    setupBoard(); // sets the game board for a new game
    // adds click event listener to play again button
    document.getElementById("button-play-again")
    .addEventListener("click", resetGame);
}

function setupBoard () {
        // attaches click event listeners to all game squares on game board
        document.querySelectorAll(".game-square").forEach((square, index) => { 
            square.textContent = ""; // clears any text from squares
            square.classList.remove("highlight"); // removes any previous highlight styling
            square.removeEventListener("click",handleSquareClick); // removes any old click event listeners.
            square.addEventListener("click",() => handleSquareClick(index)); //adds a click event listener to handle moves on this square
        });
        game.board.fill(null); // reset the board to null
        game.gameOver = false; //sets the game over to false signaling a game in progress
        game.currentPlayer = "X"; // resets to the player X
        updateTurnDisplay(); // update the turn display to reflect current player.
}

// function to update display of players turn
function updateTurnDisplay() {
    // update the element with id "turn" to show current player
    document.getElementById("turn").textContent = game.currentPlayer;
}

// creates a function to handle clicks on game squares
function handleSquareClick(index) {

    // if the game is over or the square is occupied, nothing will happen
    if (game.gameOver || game.board[index] != null) return;

    game.board[index] = game.currentPlayer; // update the board state with the current player's mark
    // update the UI to show the current player's mark on the clicked square
    const square = document.getElementById(`square-${index}`);
    square.textContent = game.currentPlayer;

    // checks if there is a winner or tie
    const winner = checkWinner();
    if (winner) {
        endGame(winner); // ends game if there is a winner
    }
    else if (game.board.every((cell) => cell != null)) {
        endGame("Tie"); // if all squares are filled, ends game as tie
    }
    else {
        switchPlayer(); // switches to next player
    }
}

// switches to the next player
function switchPlayer(){
    // toggles the player between "x" and "o"
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

    // all winning combinations
    for (const combo of winningCombs) {
        // extracts the positions from the winning combination
        const [a, b, c] = combo;
        // checks if the squares in the combination have the same player's mark
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

// function for ending the game
function endGame(winner) {
    // sets the game Over to true
    game.gameOver = true;
    // sets the game over if it's a tie
    if (winner == "Tie") {
        // notification for a tie
        alert("It's a Tie");
    }
    else {
        // notification for winner
        alert(`${winner} wins!`);
        // increments the winner's score by 1
        game.scores[winner]++;
        // saves the score to session storage
        saveScoresToSessionStorage();
        // updates the scoreboard
        updateScoreboard();
    }
}

// function to save scores to session storage
function saveScoresToSessionStorage() {
    try {
        // serializes the scores object and saves it to session storage
        sessionStorage.setItem("ticTacToeScores", JSON.stringify(game.scores));
    }
    catch(error) {
        // logs a warning if not able to save
        console.warn ("can't save to session storage", error);
    }
}

// function to update the scoreboard
function updateScoreboard() {
    // updates the x and o scores in the scoreboard UI
    document.getElementById("scoreboard-x").textContent = game.scores.X;
    document.getElementById("scoreboard-o").textContent = game.scores.O;
}

// function to reset the game
function resetGame() {
    // resets the game board for a new game.
    setupBoard();
}

// starts the game
initializeGame();