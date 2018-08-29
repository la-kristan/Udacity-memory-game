//global constants

const BOARD = document.querySelector(".deck");
const RESET = document.querySelectorAll(".restart");
const MODAL = document.querySelector(".modalBackground")
const MOVES = document.querySelectorAll(".moves");
const TIMER = document.querySelectorAll(".time");
const STARS = document.querySelectorAll(".stars li")
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

//global variables

let HTMLCards, openCards, moveCount, matchCount, time, timerRunning, timerID;

//function declarations

function initBoard() {
	stopTimer();
	openCards = [];
	time = 0;
	moveCount = 0;
	matchCount = 0;
	MOVES[0].textContent = 0;
	TIMER[0].textContent = 0;
	resetStars();
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
 			/* There was a weird glitch where after running initBoard without refreshing the page,
 			the event function would run twice for each click, causing, in the case of the last click, 
 			the startTimer() function to run right after the timer was stopped. Failing to find the source 
 			of this glitch, I added the moveCount condition to override it. */
 			if (!timerRunning && moveCount < 1) {
 				startTimer();
 			}
 			if (openCards.length < 2) {
 				flipCard(event.target);
 				if (openCards.length === 2) {
 				checkMatch(openCards[0], openCards[1]);
 		    	}
 			}
 		}
 	});
}

function flipCard(card) {
	if (!card.classList.contains("show")){ 
	card.classList.add("open", "show");
	trackOpenCards(card);
	}
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
		matchCount++;
		openCards = [];
		if (matchCount === 8) {
			youWin();
		}
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
	for (var i = 0; i < MOVES.length; i++) {
		MOVES[i].textContent = moveCount;
	}
	decreaseStars();
}

function decreaseStars() {
	if (moveCount === 17) {
		STARS[2].style.display = "none";
		STARS[5].style.display = "none";
	}
	else if (moveCount === 25) {
		STARS[1].style.display = "none";
		STARS[4].style.display = "none";
	}
}

function resetStars() {
	for (var i = 0; i < STARS.length; i++) {
		STARS[i].style.display = "inline-block";
	}
}

function startTimer() {
	timerRunning = true;
	timerID = setInterval(function() {
		time++;
		for (var i = 0; i < TIMER.length; i++) {
			TIMER[i].textContent = time;
		}
	}, 1000)
}

function stopTimer() {
	clearInterval(timerID);
	timerRunning = false;
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

function youWin() {
	MODAL.style.display = "block";
	stopTimer();
}

//final setup

for (var i = 0; i < RESET.length; i++) {
	RESET[i].addEventListener("click", function() {
	initBoard();
	})
}

MODAL.addEventListener("click", function() {
	MODAL.style.display = "none";
})

initBoard();
