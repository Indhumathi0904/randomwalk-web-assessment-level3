let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
const playerTurnElement = document.getElementById('player-turn');
const cells = document.querySelectorAll('.cell');

function makeMove(cell) {
    const index = Array.from(cells).indexOf(cell);

    if (gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            playerTurnElement.textContent = Player ${currentPlayer} wins!;
            disableCellClick();
        } else if (gameBoard.every(cell => cell !== '')) {
            playerTurnElement.textContent = 'It\'s a draw!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            playerTurnElement.textContent = Player ${currentPlayer}'s turn;
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern =>
        gameBoard[pattern[0]] !== '' &&
        gameBoard[pattern[0]] === gameBoard[pattern[1]] &&
        gameBoard[pattern[1]] === gameBoard[pattern[2]]
    );
}

function disableCellClick() {
    cells.forEach(cell => cell.onclick = null);
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    playerTurnElement.textContent = Player ${currentPlayer}'s turn;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.onclick = function() {
            makeMove(this);
        };
    });
}

   
