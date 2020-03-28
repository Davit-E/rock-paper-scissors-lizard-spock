var rulesButton = document.querySelector('.rules-button');
var backdrop = document.querySelector('.backdrop');
var closeRules = document.querySelector('.close-rules-info');
var rulesInfo = document.querySelector('.rules-info');
var choiceButtons = document.querySelectorAll('.choice-button');
var choiceContainer = document.querySelector('.choice--container');
var gameOutcome = document.querySelector('.game-outcome');
var playAgain = document.querySelector('.play-again');

var playerChoice = document.querySelector('.player-choice');
var houseChoice = document.querySelector('.house-choice');
var outcomeText = document.querySelector('.outcome-text');
var outcomeInfo = document.querySelector('.outcome-info');
var scoreCount = document.querySelector('.score-count');

var spock = {
  beats: ['scissors', 'rock']
};
var scissors = {
  beats: ['paper', 'lizard']
};
var paper = {
  beats: ['rock', 'spock']
};
var lizard = {
  beats: ['spock', 'paper']
};
var rock = {
  beats: ['lizard', 'scissors']
};

rulesButton.addEventListener('click', function () {
  backdrop.classList.add('open');
});
backdrop.addEventListener('click', backdropRemove);
closeRules.addEventListener('click', backdropRemove);

function backdropRemove() {
  backdrop.classList.remove('open');
}
rulesInfo.addEventListener('click', function (event) {
  event.stopPropagation();
});

var tempButton = 0;
var tempRandButton = 0;
var randButton = 0;
var playerScore = 0;
var playerCircle;
var houseCircle;
if (window.name !== '') {
  playerScore = window.name;
}
scoreCount.textContent = playerScore;
choiceButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    clear();
    randButton = randChoice();
    tempButton = button.cloneNode(true);
    playerChoice.prepend(tempButton);
    var whoWon = compare(tempButton, randButton);
    playerCircle = document.querySelector('.player-choice .back-circle');
    houseCircle = document.querySelector('.house-choice .back-circle');
    houseButton = document.querySelector('.house-choice .choice-button');

    setTimeout(function () {
      houseButton.style.opacity = '1';
    }, 1000);

    setTimeout(function () {
      if (whoWon === 'player') {
        outcomeText.textContent = 'YOU WIN';
        playerScore ++;
        playerCircle.classList.add('winner');
      }else if (whoWon === 'house') {
        outcomeText.textContent = 'YOU LOSE';
        playerScore = 0;
        houseCircle.classList.add('winner');
      }else {
        outcomeText.textContent = 'DRAW';
      }
      outcomeInfo.style.opacity = 1;
      outcomeInfo.style.pointerEvents = 'all';
      window.name = playerScore;
      scoreCount.textContent = window.name;
    }, 1500);

    setTimeout(function () {
      choiceContainer.classList.remove('open');
      gameOutcome.classList.add('open');
    }, 500);
  });
});

function clear() {
  if (playerCircle) {
    playerCircle.classList.remove('winner');
  }
  if (houseCircle) {
    houseCircle.classList.remove('winner');
  }
  outcomeInfo.style.opacity = 0;
  outcomeInfo.style.pointerEvents = 'none';
  var outcomeButtons = document.querySelectorAll('.choices .choice-button');
  outcomeButtons.forEach(function (button) {
    button.parentNode.removeChild(button);
  });
}

function randChoice() {
  var randNum = Math.floor(Math.random() * 5);
  tempRandButton = choiceButtons[randNum].cloneNode(true);
  houseChoice.prepend(tempRandButton);
  return tempRandButton;
}

function compare(player, house) {
  var playerToVar = window[player.classList[0]];
  if (player.classList[0] === house.classList[0]) {
    return;
  }else {
    for (var i = 0; i < playerToVar.beats.length; i++) {
      if (playerToVar.beats[i] === house.classList[0]) {
        return 'player';
      }
    }
    return 'house';
  }
}

playAgain.addEventListener('click', function () {
  setTimeout(function () {
    gameOutcome.classList.remove('open');
    choiceContainer.classList.add('open');
  }, 500);
});
