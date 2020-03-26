var rulesButton = document.querySelector('.rules-button');
var backdrop = document.querySelector('.backdrop');
var closeRules = document.querySelector('.close-rules-info');
var rulesInfo = document.querySelector('.rules-info');
var choiceButtons = document.querySelectorAll('.choice-button');
var choiceContainer = document.querySelector('.choice--container');
var gameOutcome = document.querySelector('.game-outcome');
var playAgain = document.querySelector('.play-again');
var playerButton = document.querySelector('.player-choice .chosen-button');

var playerChoice = document.querySelector('.player-choice');
var houseChoice = document.querySelector('.house-choice');

var arr = ['spock', 'scissors', 'paper', 'lizard', 'rock'];
var arr2 = [{}];
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

var rules = {

};

console.log(choiceButtons);
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
choiceButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    clear();
    randButton = randChoice();
    tempButton = button.cloneNode(true);
    playerChoice.prepend(tempButton);
    compare(tempButton, randButton);

    setTimeout(function () {
      choiceContainer.classList.remove('open');
      gameOutcome.classList.add('open');
    }, 500);
  });
});

function randChoice() {
  var randNum = Math.floor(Math.random() * 5);
  tempRandButton = choiceButtons[randNum].cloneNode(true);
  houseChoice.prepend(tempRandButton);
  return tempRandButton;
}


function clear() {
  var outcomeButtons = document.querySelectorAll('.choices .choice-button');
  outcomeButtons.forEach(function (button) {
    button.parentNode.removeChild(button);
  });
}

function compare(player, house) {
  console.log(player.classList[0]);
  console.log(house.classList[0]);
  var playerToVar = window[player.classList[0]];
  // var houseToVar = window[player.classList[0]];
  if (player.classList[0] === house.classList[0]) {
    return console.log('Draw');
  }else {
    for (var i = 0; i < playerToVar.beats.length; i++) {
      if (playerToVar.beats[i] === house.classList[0]) {
        return console.log('player wins!');
      }
    }
    return console.log('house wins!');
  }

}


playAgain.addEventListener('click', function () {
  setTimeout(function () {
    gameOutcome.classList.remove('open');
    choiceContainer.classList.add('open');
  }, 500);
});
