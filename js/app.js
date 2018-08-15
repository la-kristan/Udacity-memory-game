const BOARD = document.querySelector(".deck");
//Create a list that holds all of your cards
const CARDS = [
  "diamond",
  "paper-plane-o",
  "anchor",
  "bolt",
  "cube",
  "anchor",
  "leaf",
  "bicycle",
  "diamond",
  "bomb",
  "leaf",
  "bomb",
  "bolt",
  "bicycle",
  "paper-plane-o",
  "cube"
]
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let HTMLCards, openCards, moveCount;

function initBoard() {
	openCards = [];
	moveCount = 0;
 	BOARD.innerHTML = "";
 	shuffle(CARDS);
 	HTMLCards = [];
 	CARDS.forEach(function(card){
 		HTMLCards.push(`
 			<li class="card">
                <i class="fa fa-${card}"></i>
            </li>
 			`)
 	});
 	HTMLCards.forEach(function(card) {
 		BOARD.innerHTML += card;
 	});
 	BOARD.addEventListener("click", function(event) {
 		if (event.target.nodeName == "LI") {
 			//debugger;
 			flipCard(event.target);
 			//trackOpenCards(event.target);
 			if (openCards.length === 2) {
 			checkMatch(openCards[0], openCards[1]);
 		    }
 		}
 	});
 }

function flipCard(card) {
	if (!card.classList.contains("show")){ 
	card.classList.add("open", "show");
	trackOpenCards(card);
	}
	/*else if (card.classList.contains("open", "show")) {
		card.classList.remove("open", "show");
	}*/
}

function trackOpenCards(card) {
	if (card !== openCards[0] && openCards.length < 2) 
		{openCards.push(card);}
}

function checkMatch(card1, card2) {
	if (card1.innerHTML === card2.innerHTML) {
		openCards.forEach(function(card) {
			card.classList.remove("open");
			card.classList.add("match")
		})
		openCards = [];
	}
	else {
		setTimeout(function() {
		openCards.forEach(function(card) {
			card.classList.remove("open", "show");
		})
		openCards = [];
	}, 1200)
	}
	moveCount++;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

initBoard();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


