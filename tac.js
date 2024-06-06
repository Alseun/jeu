let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const gameBoardElement = document.getElementById('gameBoard');

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(gameBoardElement.children).indexOf(cell);

    if (gameBoard[cellIndex] !== '' || !isGameActive) {
        return;
    }

    cell.textContent = currentPlayer;
    gameBoard[cellIndex] = currentPlayer;

    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (isGameActive) {
        messageElement.textContent = `C'est au tour de ${currentPlayer}`;
    }
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        messageElement.textContent = `Le joueur ${currentPlayer} a gagné!`;
        isGameActive = false;
        return;
    }

    if (!gameBoard.includes('')) {
        messageElement.textContent = "Match nul!";
        isGameActive = false;
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    messageElement.textContent = `C'est au tour de ${currentPlayer}`;
    gameBoardElement.querySelectorAll('.cell').forEach(cell => (cell.textContent = ''));
}

function initializeGame() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', handleCellClick);
        gameBoardElement.appendChild(cell);
    }
    messageElement.textContent = `C'est au tour de ${currentPlayer}`;
}

initializeGame();
