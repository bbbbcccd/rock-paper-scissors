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

// Update score after round is played
function updateScore(result) {
    const winner = getWinner(result);
    let container;
    if (winner == "computer") {
        container = document.querySelector("#com-score");
    } else if (winner == "user") {
        container = document.querySelector("#user-score");
    } else {
        return;
    }   
    container.textContent = parseInt(container.textContent) + 1;
}

//Updates with the image of choice by player (user or computer) 
function updateImg(player, choice) {
    let container;
    if (player === "user") {
        container = document.getElementById('user-image');
    } else if (player == "computer") {
        container = document.getElementById('com-image');
    } else {
        console.log("invalid player");
    }
    if (choice === "Rock") {
        container.setAttribute('src', "./images/rock.png");
    } else if (choice === "Paper") {
        container.setAttribute('src', "./images/paper.png");
    } else if (choice === "Scissors") {
        container.setAttribute('src', "./images/scissors.png");
    } else {
        console.log("Invalid choice") ;
    }
}

function updateUserImg(choice) {
    updateImg("user", choice);
}

function updateComputerImg(choice) {
    updateImg("computer", choice);
}

function updateRoundResult(result) {
    document.getElementById("result").textContent = result;
}


// Checks if game is over (user or computer reached 5 points)
// Activates modal if the game is over
function gameOver() {
    const userScore = document.getElementById('user-score').textContent;
    const computerScore = document.getElementById('com-score').textContent;

    if (userScore === "5" || computerScore === "5") {
        const modal = document.querySelector('.modal');
        const modalResult = document.querySelector('.modal-result');
        modal.classList.add('active');
        modalResult.innerHTML = getOverallResult(userScore, computerScore);
    }
}

// Event listener for the 3 buttons
// Plays round depending on which button user chooses
const rpsButtons = document.querySelectorAll('.options button');
rpsButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        const userChoice = e.target.id;
        const computerChoice = getComputerChoice();
        const roundResult = playRound(userChoice, computerChoice);

        updateUserImg(userChoice);
        updateComputerImg(computerChoice);
        updateScore(roundResult);
        updateRoundResult(roundResult);

        gameOver();
    })
});

const modalCloseButton = document.querySelector(".modal .close-button");
modalCloseButton.addEventListener("click", () => {
    document.querySelector('.modal').classList.remove("active");
});
