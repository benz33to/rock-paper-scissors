let playerScore = 0;
let computerScore = 0;
const computerChoices = ['rock', 'paper', 'scissors'];

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

function getGameWinner() {
    const gameLostText = `You Lose! your score is: ${playerScore} | computer score is: ${computerScore}, keep trying`;
    const gameWonText = `You Win! your score is: ${playerScore} | computer score is: ${computerScore}, gg's!`;
    const gameTiedText = `We have a draw! player score: ${playerScore} | computer score: ${computerScore}, gg's!`;
    if (playerScore > computerScore) {
        return gameWonText;
    } else if (playerScore < computerScore) {
        return gameLostText;
    } else {
        return gameTiedText;
    }
}

function increasePlayerScore() {
    playerScore++;
}

function increaseComputerScore() {
    computerScore++;
}

function playRound(playerSelection, computerSelection) {

    const wrongSelectionText = `Wrong selection, your selection should be among the following options: Rock, Paper or Scissors`;
    if (!computerChoices.includes(playerSelection)) {
        return wrongSelectionText;
    }
    const playerWinsAgainst = getPlayerSelectionStrength(playerSelection);
    const playerLosesAgainst = getPlayerSelectionWeakness(playerSelection);
    return getRoundWinner(playerWinsAgainst, playerLosesAgainst, playerSelection, computerSelection);

}

function game() {

    for (let i = 0; i < 5; i++) {
        const playerSelection = (prompt("Please make your selection", ""))?.toLowerCase();
        const computerSelection = getComputerChoice();
        console.log(playRound(playerSelection, computerSelection));
    }
}

game();
console.log(getGameWinner());