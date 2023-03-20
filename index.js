function getComputerChoice() {
    const choice = Math.round(Math.random() * 2);
    return computerChoices[choice];
}

function getPlayerSelectionStrength(playerSelection) {
    return (playerSelection === 'rock') ? 'scissors'
        : (playerSelection === 'paper') ? 'rock'
            : 'paper';
}

function getPlayerSelectionWeakness(playerSelection) {
    return (playerSelection === 'rock') ? 'paper'
        : (playerSelection === 'paper') ? 'scissors'
            : 'rock';
}

function getRoundWinner(playerWinsAgainst, playerLosesAgainst, playerSelection, computerSelection) {

    const roundLostText = `You Lose! ${computerSelection} beats ${playerSelection}`;
    const roundWonText = `You Win! ${playerSelection} beats ${computerSelection}`;
    const roundTiedText = `It seems we have a draw, both parties selected ${playerSelection}`;
    if (playerWinsAgainst === computerSelection) {
        increasePlayerScore();
        return roundWonText;
    } else if (playerLosesAgainst === computerSelection) {
        increaseComputerScore();
        return roundLostText;
    } else {
        return roundTiedText;
    }
}

function increasePlayerScore() {
    playerScore++;
    document.querySelector('#player-score').innerText = playerScore;
}

function increaseComputerScore() {
    computerScore++;
    document.querySelector('#computer-score').innerText = computerScore;
}

function playRound(playerSelection, computerSelection) {

    const wrongSelectionText = `Wrong selection, your selection should be among the following options: Rock, Paper or Scissors`;
    if (!computerChoices.includes(playerSelection)) return wrongSelectionText;

    const playerWinsAgainst = getPlayerSelectionStrength(playerSelection);
    const playerLosesAgainst = getPlayerSelectionWeakness(playerSelection);
    let roundWinnerText = getRoundWinner(playerWinsAgainst, playerLosesAgainst, playerSelection, computerSelection);
    return (playerScore < 5 && computerScore < 5) ? roundWinnerText : endGame();
}

function initGame() {
    playerScore = 0;
    computerScore = 0;
    document.querySelector('#player-score').innerText = playerScore;
    document.querySelector('#computer-score').innerText = playerScore;
    resultText.innerText = 'Please, make your selection';
}

function endGame() {
    const gameWonText = `You Win! your score is: ${playerScore} | computer score is: ${computerScore}, gg's!`;
    const gameLostText = `You Lose! your score is: ${playerScore} | computer score is: ${computerScore}, keep trying`;
    toggleButtons();
    return playerScore > computerScore ? gameWonText : gameLostText;
}

function resetGame() {
    toggleButtons();
    initGame();
}

function game({ target }) {
    const playerSelection = target.getAttribute('data-choice');
    const computerSelection = getComputerChoice();
    resultText.innerText = playRound(playerSelection, computerSelection);
}


function toggleButtons() {
    playerChoices.forEach(choice => choice.disabled = !choice.disabled);
    resetButton.disabled = !resetButton.disabled;
}

let playerScore;
let computerScore;

const resultText = document.querySelector('.result-text');
const computerChoices = ['rock', 'paper', 'scissors'];
const playerChoices = document.querySelectorAll('.selection-button');
const resetButton = document.querySelector('#reset');

initGame();

playerChoices.forEach(choice => choice.addEventListener('click', game));
resetButton.addEventListener('click', resetGame);

//console.log(getGameWinner());