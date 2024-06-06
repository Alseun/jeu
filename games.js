document.addEventListener('DOMContentLoaded', () => {
    const square = document.getElementById('black-square');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const gameOverDisplay = document.getElementById('game-over');
    const replayButton = document.getElementById('replay-button');
    const gameArea = document.getElementById('game-area');

    let score = 0;
    let squareSize = 50;
    const minSquareSize = 5;
    let timer = 5;
    let countdownInterval;

    function resetGame() {
        score = 0;
        squareSize = 50;
        timer = 5;
        scoreDisplay.textContent = `Score: ${score}`;
        timerDisplay.textContent = `Temps restant: ${timer}s`;
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        square.style.top = `${Math.random() * (gameArea.clientHeight - squareSize)}px`;
        square.style.left = `${Math.random() * (gameArea.clientWidth - squareSize)}px`;
        gameOverDisplay.style.display = 'none';
        replayButton.style.display = 'none';
        square.style.display = 'block';
        clearInterval(countdownInterval);
        countdownInterval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        timer--;
        if (timer <= 0) {
            endGame();
        } else {
            timerDisplay.textContent = `Temps restant: ${timer}s`;
        }
    }

    function endGame() {
        clearInterval(countdownInterval);
        gameOverDisplay.style.display = 'block';
        replayButton.style.display = 'block';
        square.style.display = 'none';
    }

    square.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        squareSize = Math.max(squareSize - 5, minSquareSize);
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        square.style.top = `${Math.random() * (gameArea.clientHeight - squareSize)}px`;
        square.style.left = `${Math.random() * (gameArea.clientWidth - squareSize)}px`;
        timer += 1; // Adds 1 second to the timer without a maximum limit
        timerDisplay.textContent = `Temps restant: ${timer}s`;
    });

    gameArea.addEventListener('click', (e) => {
        if (e.target !== square) {
            endGame();
        }
    });

    replayButton.addEventListener('click', resetGame);

    resetGame();
});
