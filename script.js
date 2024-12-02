
// Initialize the game state
const game ={
    currentPlayer: "x", // current player ("X", "O")
    board: Array(9).fill(null), //Represents the game board
    gameOver:false, //tracks if the game is over
    scores: {X:0, O:0}, // keeps track of the scores
};
