const newGameBtn = document.querySelector('button');
const gameContainer = document.getElementById('container');
const gameCards = document.getElementById('cards');

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

// initial attempt, was going to put images here as well as id/num.
// const butterflies = [
//   { imageUrl: 'monarch.jpg', name: 'monarch', num: 1 },
//   { imageUrl: 'swallowtail.jpg', name: 'swallowtail', num: 2 },
//   { imageUrl: 'buckeye.jpg', name: 'buckeye', num: 3 },
//   { imageUrl: 'sulphur.jpg', name: 'sulphur', num: 4 },
//   { imageUrl: 'nymph.jpg', name: 'nymph', num: 5 },
//   { imageUrl: 'white.jpg', name: 'white', num: 6 },
//   { imageUrl: 'fritillary.jpg', name: 'fritillary', num: 7 },
//   { imageUrl: 'skipper.jpg', name: 'skipper', num: 8 },
//   { imageUrl: 'monarch.jpg', name: 'monarch', num: 1 },
//   { imageUrl: 'swallowtail.jpg', name: 'swallowtail', num: 2 },
//   { imageUrl: 'buckeye.jpg', name: 'buckeye', num: 3 },
//   { imageUrl: 'sulphur.jpg', name: 'sulphur', num: 4 },
//   { imageUrl: 'nymph.jpg', name: 'nymph', num: 5 },
//   { imageUrl: 'white.jpg', name: 'white', num: 6 },
//   { imageUrl: 'fritillary.jpg', name: 'fritillary', num: 7 },
//   { imageUrl: 'skipper.jpg', name: 'skipper', num: 8 },
// ];
// // verfirying name call will work
// function butterfliesName(butterflyArray) {
//   for (butterfly of butterflyArray) {
//     console.log(butterfly.name);
//   }
// }

// butterfliesName(butterflies);

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledButterflies = shuffle(butterflies);
// this function loops over the array of butterflies
// it creates a new div and gives it a class with the value of the butterfly
// it also adds an event listener for a click for each card

function createButterflyGameboard(butterflyArray) {
  for (let butterfly of butterflyArray) {
    // create a new div
    const newDiv = document.createElement('div');
    // let butterflyNum = butterflies[butterfly.id];
    // give it a class attribute for the value we are looping over
    // newDiv.classList.add(butterfly.num, 'cardCover');
    newDiv.classList.add('cardCover');
    newDiv.setAttribute('id', butterfly);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener('click', handleCardClick);
    // append the div to the element with an id of game
    gameCards.append(newDiv);
  }
}

// TODO: Implement this function!
const faceUp = [];

function butterflyName(butterfly) {
  return butterfly.slice(0, -2);
}

function handleCardClick(event) {
  // console.log('you just clicked', event.target);
  //begin flip/match process
  let card = event.target;
  let cardName = butterflyName(card.getAttribute('id'));

  if (faceUp.length === 0 && card.classList.contains('cardCover')) {
    card.classList.remove('cardCover');
    card.classList.add('cardReveal', cardName);
    console.log(card.classList);
    faceUp.push(cardName);
    // console.log(faceUp, 'faceUp[] + 1');
  } else if (faceUp.length > 0 && card.classList.contains('cardCover')) {
    card.classList.remove('cardCover');
    card.classList.add(cardName, 'cardReveal');
    faceUp.push(cardName);
    console.log(card.classList);
    // console.log(faceUp[0], faceUp[1], '<<< cards are revealed');
  }
  return faceUp;

  // function compareFaceUpCards(faceUp) {
  //   if (faceUp[0] !== faceUp[1]) {
  //     faceUp[0].remove('cardReveal');
  //     faceUp[0].classList.add('cardCover');
  //     faceUp[1].classList.remove('cardReveal');
  //     faceUp[1].classList.add('cardCover');
  //     console.log(faceUp[0], faceUp[1], 'covered?');
  //     //   faceUp.splice(0);
  //      // to setup max cards up set length check to 2
  //     //   console.log('faceUp is empty?', faceUp);
  //   } //else if(faceUp[0] === faceUp[1])
  //   //stop timers and keep faceup til end of game
  // }
}

// when the DOM loads
createButterflyGameboard(shuffledButterflies);

// addEventListener();

/* */
