const choices = ['Rock', 'Paper', 'Scissors'];

// get random choice from computer (rock, scissors or paper)
function getComputerChoice() {
    return choices[getRandomNumber(choices.length)];
}

// returns random number from 0 to num, num exclusive
function getRandomNumber(num) {
    return Math.floor(Math.random() * num);
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

function getOverallResult(userWin, computerWin) {
    if (userWin > computerWin) {
        return `You won with a score of <div>${userWin} : ${computerWin}</p>`;
    } else if (userWin < computerWin) {
        return `You lost with a score of <div>${userWin} : ${computerWin}</div>`;
    } else {
        return false;
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
const rpsButtons = document.querySelectorAll('.options button');
rpsButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        let result = playRound(e.target.id, getComputerChoice());
        let winner = getWinner(result);
        updateScore(winner);
        document.getElementById("result").textContent = result;

        gameOver();
    })
});

//Game is over when either user or computer reaches 5 points
// Activates modal if the game is over
function gameOver() {
    const userScore = document.getElementById('user-score').textContent;
    const computerScore = document.getElementById('com-score').textContent;

    if (userScore === "5" || computerScore === "5") {
        const modal = document.querySelector('.modal');
        const modalResult = document.querySelector('.modal-result');
        modal.classList.add('active');
        modalResult.innerHTML = getOverallResult(userScore, computerScore)
    }
}
