const words = ["POMME", "BANANE", "ORANGE", "RAISIN", "FRAISE", "CERISE", "CAROTTE", "TOMATE", "POMME DE TERRE", "BROCOLI", "CONCOMBRE", "NAVET", "CHOUX", "POIREAU", "PATATE", "OIGNON", "RADIS", "AUBERGINE", "CITRON", "MANGUE", "AVOCAT", "KIWI", "ANANAS", "PAMPLEMOUSSE", "FENOUIL", "COURGETTE", "CHOU-FLEUR", "POIVRON", "HARICOT", "PETIT POIS", "EPINARD", "BETTERAVE", "CELERI", "BANANE", "POMME", "RAISIN", "ORANGE", "PECHE", "FRAISE", "MYRTILLE", "MELON", "CITRON", "CONCOMBRE", "TOMATE", "CAROTTE", "POMME DE TERRE", "OIGNON", "AIL", "GINGEMBRE", "RADIS", "CHOU", "BROCOLI", "CHOU-FLEUR", "EPINARD", "LAITUE", "NAVET", "PERSIL", "CORIANDRE", "ROMARIN", "THYM", "BASILIC", "MENTHE", "ORIGAN", "ANETH", "SAUGE", "CIBOULETTE", "POIS", "HARICOT", "MAIS", "COURGE", "CITROUILLE", "POTIRON", "COURGETTE", "AUBERGINE", "CHAMPIGNON", "ASPERGE", "ARTICHAUT", "CHOU DE BRUXELLES", "CHOU", "BETTE", "KALE", "BETTERAVE", "CRESSON", "PIMENT", "CHAMPIGNON", "CHATAIGNE", "COURGE", "PAMPLEMOUSSE", "FRAISIER", "POIRE", "ANETH", "FENOUIL", "LAVANDE", "ROSE", "CARAMEL", "CHOCOLAT", "VANILLE", "CRÈME", "CÉRÉALES", "CROISSANT", "BAGUETTE", "SAUCISSON", "PAIN", "BISCUIT", "GÂTEAU", "MIEL", "CONFITURE", "GELÉE", "CARAMEL", "RAISIN", "BROCHETTE", "PIMENT", "SALADE", "HARICOT", "CHOCOLAT", "ORANGE", "YAOURT", "BANANE", "CHIPS", "POPCORN", "CHAUD", "FROID", "GLACE", "PIZZA", "PÂTES", "RIZ", "FRUITS DE MER", "SAUMON", "TRUITE", "CREVETTE", "MOULE", "HUIÎTRE", "NOIX"];
let randomWord = words[Math.floor(Math.random() * words.length)];
let guessedWord = [];
let guessesLeft = 6;
let hangmanImg = document.querySelector('#hangman img');
let wordToGuessPara = document.getElementById('wordToGuess');
let messagePara = document.getElementById('message');
let guessesLeftPara = document.getElementById('guessesLeft');
let guessInput = document.getElementById('guess');
let guessedLetters = [];

function init() {
    for (let i = 0; i < randomWord.length; i++) {
        guessedWord.push('_');
    }
    wordToGuessPara.textContent = guessedWord.join(' ');
    guessesLeftPara.textContent = `Tentatives restantes : ${guessesLeft}`;
}

function checkLetter() {
    let letter = guessInput.value.toUpperCase();
    guessInput.value = '';
    if (letter.length !== 1 || !/[A-Z]/.test(letter)) {
        messagePara.textContent = 'Veuillez entrer une seule lettre.';
        return;
    }
    if (guessedLetters.includes(letter)) {
        messagePara.textContent = 'Vous avez déjà deviné cette lettre.';
        return;
    }
    guessedLetters.push(letter);
    if (randomWord.includes(letter)) {
        for (let i = 0; i < randomWord.length; i++) {
            if (randomWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }
        wordToGuessPara.textContent = guessedWord.join(' ');
        if (!guessedWord.includes('_')) {
            messagePara.textContent = 'Bravo! Vous avez deviné le mot!';
            gameOver(true);
        }
    } else {
        guessesLeft--;
        updateHangman();
        guessesLeftPara.textContent = `Tentatives restantes : ${guessesLeft}`;
        if (guessesLeft === 0) {
            messagePara.textContent = `Désolé, vous avez épuisé tous vos essais. Le mot était "${randomWord}".`;
            gameOver(false);
        } else {
            messagePara.textContent = `Dommage! La lettre "${letter}" n'est pas dans le mot.`;
        }
    }
}

function updateHangman() {
    hangmanImg.src = `hangman-${6 - guessesLeft}.png`;
}

function gameOver(win) {
    guessInput.disabled = true;
    if (win) {
        messagePara.style.color = 'green';
    } else {
        messagePara.style.color = 'red';
    }
    let resetButton = document.createElement('button');
    resetButton.textContent = 'Nouvelle partie';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', () => {
        location.reload();
    });
}

init();
