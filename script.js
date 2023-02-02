// Helper function
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

// Our code
var cards = [
  { value: "ck", image: "./images/clubs_king.svg", matched: false },
  { value: "cq", image: "./images/clubs_queen.svg", matched: false },
  { value: "dk", image: "./images/diamonds_king.svg", matched: false },
  { value: "dq", image: "./images/diamonds_queen.svg", matched: false },
  { value: "hj", image: "./images/hearts_jack.svg", matched: false },
  { value: "jb", image: "./images/joker_black.svg", matched: false },
  { value: "jr", image: "./images/joker_red.svg", matched: false },
  { value: "sa", image: "./images/spades_ace.svg", matched: false },

  { value: "ck", image: "./images/clubs_king.svg", matched: false },
  { value: "cq", image: "./images/clubs_queen.svg", matched: false },
  { value: "dk", image: "./images/diamonds_king.svg", matched: false },
  { value: "dq", image: "./images/diamonds_queen.svg", matched: false },
  { value: "hj", image: "./images/hearts_jack.svg", matched: false },
  { value: "jb", image: "./images/joker_black.svg", matched: false },
  { value: "jr", image: "./images/joker_red.svg", matched: false },
  { value: "sa", image: "./images/spades_ace.svg", matched: false },
];

var cardEls = document.querySelectorAll(".card");
var firstGuess = null;
var canGuess = true;
var flippedCards = 0;
var guesses = 0;

shuffle(cards);

cardEls.forEach(function (el, index) {
  el.addEventListener("click", function () {
    if (index === firstGuess || cards[index].matched || !canGuess) {
      alert("invalid guess");
      return;
    }

    var clickedCard = cards[index];
    el.setAttribute("src", clickedCard.image);

    if (firstGuess === null) {
      firstGuess = index;
    } else {
      guesses++;
      document.querySelector("#guesses").textContent = guesses;

      if (cards[firstGuess].value === cards[index].value) {
        cards[firstGuess].matched = true;
        cards[index].matched = true;
        firstGuess = null;
        flippedCards += 2;

        // Check for win and reset
        if (flippedCards === cards.length) {
          resetGame();
        }
      } else {
        canGuess = false;

        setTimeout(function () {
          cardEls[firstGuess].setAttribute("src", "./images/astronaut.svg");
          cardEls[index].setAttribute("src", "./images/astronaut.svg");
          firstGuess = null;
          canGuess = true;
        }, 500);
      }
    }
  });
});

function resetGame() {
  canGuess = false;

  setTimeout(function () {
    firstGuess = null;
    canGuess = true;
    flippedCards = 0;
    guesses = 0;

    document.querySelector("#guesses").textContent = guesses;

    cardEls.forEach(function (el, index) {
      el.setAttribute("src", "./images/astronaut.svg");
    });

    cards.forEach(function (card, index) {
      card.matched = false;
    });

    shuffle(cards);
  }, 500);
}

document.querySelector("#reset").addEventListener("click", function () {
  resetGame();
});
