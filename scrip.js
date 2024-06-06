let randomNumber;
let attempts;
let startTime;
let timerInterval;
let playerName;
const leaderboard = [];

function startGame() {
    playerName = document.getElementById('playerName').value.trim();
    if (playerName === "") {
        alert("Veuillez entrer votre nom pour commencer.");
        return;
    }
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    startTime = new Date().getTime();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    document.getElementById('message').textContent = '';
    document.getElementById('guess').value = '';
    document.getElementById('timer').textContent = 'Temps écoulé: 0 secondes';
    document.getElementById('guess').disabled = false;
    document.querySelector('button').disabled = false;
}

function guessNumber() {
    const userGuess = Number(document.getElementById('guess').value);
    const message = document.getElementById('message');
    attempts++;

    if (userGuess === randomNumber) {
        clearInterval(timerInterval);
        const totalTime = Math.floor((new Date().getTime() - startTime) / 1000);
        message.textContent = `Félicitations, ${playerName} ! Vous avez deviné le nombre en ${attempts} tentatives et ${totalTime} secondes.`;
        message.style.color = 'green';
        addToLeaderboard(playerName, totalTime, attempts);
        document.getElementById('guess').disabled = true;
        document.querySelector('button').disabled = true;
    } else if (userGuess > randomNumber) {
        message.textContent = 'Trop haut ! Essayez encore.';
        message.style.color = 'red';
    } else if (userGuess < randomNumber) {
        message.textContent = 'Trop bas ! Essayez encore.';
        message.style.color = 'red';
    }
}

function updateTimer() {
    const currentTime = new Date().getTime();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    document.getElementById('timer').textContent = `Temps écoulé: ${elapsedTime} secondes`;
}

function addToLeaderboard(name, time, attempts) {
    leaderboard.push({ name, time, attempts });
    leaderboard.sort((a, b) => a.time - b.time || a.attempts - b.attempts);
    const leaderboardBody = document.getElementById('leaderboardBody');
    leaderboardBody.innerHTML = '';
    for (const entry of leaderboard) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${entry.name}</td><td>${entry.time}</td><td>${entry.attempts}</td>`;
        leaderboardBody.appendChild(row);
    }
}

// Préparer le jeu lorsque le nom est entré
document.getElementById('playerName').addEventListener('change', startGame);
