const choices = ['Rock', 'Paper', 'Scissors'];

// get random choice from computer (rock, scissors or paper)
function getComputerChoice() {
    return choices[getRandomNumber(choices.length)];
}

// returns random number from 0 to num, num exclusive
function getRandomNumber(num) {
    return Math.floor(Math.random() * num);
}

// ask user for input (rock, scissors or paper)
function getPlayerChoice() {
    let userInput;
    do {
        userInput = prompt("Choose Rock, Paper or Scissors").toLowerCase();
    } while ((userInput !== 'rock') && (userInput !== 'paper') && (userInput !== 'scissors'));
    return userInput.charAt(0).toUpperCase() + userInput.substring(1);
}

// Determine the outcome of round between user's and computer's choice 
function playRound(playerSelection, computerSelection) {
    switch (true) {
        case playerSelection === computerSelection:
            return 'It\'s a tie! Both you and the computer chose ' + computerSelection;
        
        case playerSelection === 'Rock' && computerSelection === 'Paper':
        case playerSelection === 'Scissors' && computerSelection === 'Rock':
        case playerSelection === 'Paper' && computerSelection === 'Scissors':
            return 'You lose! ' + computerSelection + ' beats ' + playerSelection; 

        case playerSelection === 'Rock' && computerSelection === 'Scissors':
        case playerSelection === 'Scissors' && computerSelection === 'Paper':
        case playerSelection === 'Paper' && computerSelection === 'Rock':
            return 'You win! ' + playerSelection + ' beats ' + computerSelection;     
    } 
}

// play 5 games and console.log each game's result 
// at the end of 5 games, console.log the winner 
function game() {
    let userWin = 0;
    let computerWin = 0;
    for (let i = 0; i < 5; i++) {
        let result = playRound(getPlayerChoice(), getComputerChoice());
        if (result.charAt(4) === 'l') {
            computerWin += 1;
        } else if (result.charAt(4) === 'w') {
            userWin += 1;
        }
        console.log(result);
    }
    printOverallScore(userWin, computerWin);
}

function printOverallScore(userWin, computerWin) {
    if (userWin > computerWin) {
        console.log(`You won with a score of ${userWin} : ${computerWin}`);
    } else if (userWin < computerWin) {
        console.log(`You lost with a score of ${userWin} : ${computerWin}`);
    } else {
        console.log(`It's a tie with a score of ${userWin} : ${computerWin}`);
    }
}

// Returns winner (computer or user) based on the string given
// Returns tie if the result is a tie
function getWinner(result) {
    if (result.charAt(4) === 'l') {
        return "computer";
    } else if (result.charAt(4) === 'w') {
        return "user";
    } else {
        return "tie";
    }
}

function updateScore(winner) {
    let container;
    if (winner == "computer") {
        container = document.querySelector("#com-score");
    } else if (winner == "user") {
        container = document.querySelector("#user-score");
    } else {
        return;
    }   
    let currentScore = parseInt(container.textContent);
    container.textContent = currentScore + 1;
}

// Event listener for the 3 buttons
// Plays round depending on which button user chooses
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        let result = playRound(e.target.id, getComputerChoice());
        let winner = getWinner(result);
        updateScore(winner);
        document.getElementById("result").textContent = result;       
    });
});
