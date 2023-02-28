const newGameBtn = document.querySelector('button');
const gameContainer = document.getElementById('container');
const gameCards = document.getElementById('cards');
let yourScoreText = document.getElementById('your-score');
let bestScoreText = document.getElementById('best-score'); //needs implementing

yourScoreText.textContent = 0;
bestScoreText.textContent = '~';

let score = 0;
let faceUp = [];
let clickLock = false;

const butterflies = [
  'monarch-a',
  'monarch-b',
  'swallowtail-a',
  'swallowtail-b',
  'buckeye-a',
  'buckeye-b',
  'sulphur-a',
  'sulphur-b',
  'nymph-a',
  'nymph-b',
  'whites-a',
  'whites-b',
  'fritillary-a',
  'fritillary-b',
  'skipper-a',
  'skipper-b',
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
// this next function loops over the array of butterflies
// it creates a new div and gives it a class with the value of the butterfly
// it also adds an event listener for a click for each card

let shuffledButterflies = shuffle(butterflies);
// if they match: splice index of out of this array per match so it

function createButterflyGameboard(butterflyArray) {
  for (let butterfly of butterflyArray) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('cardCover');
    newDiv.setAttribute('id', butterfly);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener('click', handleCardClick);
    // append the div to the element with an id of game
    gameCards.append(newDiv);
  }
}

// next function is to trim the a/b and have cards have same class per pair
function butterflyName(butterfly) {
  return butterfly.slice(0, -2);
}

// ***** TODO: DO NOT allow more than two in faceUp, console log to find where *****

// click event function and reveal/cover logic here:
function handleCardClick(event) {
  //begin flip/match process
  if (clickLock === true) return;
  let card = event.target;
  let cardName = card.getAttribute('id');

  if (faceUp.length < 2) {
    if (faceUp.length === 0 && card.classList.contains('cardCover')) {
      card.classList.remove('cardCover');
      card.classList.add('cardReveal', butterflyName(cardName));

      faceUp.push(cardName);
      console.log(faceUp.length, 'pairA');
    } else if (faceUp.length > 0 && card.classList.contains('cardCover')) {
      card.classList.remove('cardCover');
      card.classList.add(butterflyName(cardName), 'cardReveal');

      faceUp.push(cardName);
      console.log(faceUp.length, 'pairB');
    }
  }
  if (faceUp.length === 2) {
    clickLock = true;
    if (!isMatch(faceUp)) {
      setTimeout(function () {
        if (faceUp.length === 2) {
          handleUnmatchedCards(faceUp);
        }
        faceUp = [];
      }, 1000);
    } else {
      faceUp = [];
      clickLock = false;
    }
  }
}

function isMatch(cards) {
  score++;
  yourScoreText.textContent = score;
  return butterflyName(cards[0]) === butterflyName(cards[1]);
}

// function handleMatchedCards(cards) {}    MAYBE delete

function handleUnmatchedCards(cards) {
  const card1 = document.getElementById(cards[0]);
  const card2 = document.getElementById(cards[1]);
  card1.classList.remove('cardReveal', butterflyName(cards[0]));
  card1.classList.add('cardCover');
  card2.classList.remove('cardReveal', butterflyName(cards[1]));
  card2.classList.add('cardCover');
  clickLock = false;
}

// counter should be for the two click/does it match?
// if cards match reset counter and leave cards face up
// if cards dont match, flip back both cards - transition rather than timer
// set timeout is also for limitting quick clicks (in addition to flip back over)
// also have if two cards up is 2 do not handle additional clicks

// when the DOM loads
function resetGameboard(butterflyArray) {
  gameCards.innerHTML = '';
  shuffle(butterflyArray);
  createButterflyGameboard(butterflyArray);
}

newGameBtn.addEventListener('click', function () {
  resetGameboard(butterflies);
  score = 0;
});
// addEventListener();

/* */
