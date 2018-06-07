//DomVariables
var 
    deck  = document.querySelector('.deck'), //Deck
        cards = deck.getElementsByTagName('li'), //List of cards
    moves = document.getElementsByClassName('moves')[0],
    gameWinMessage = document.querySelector('#gameWinMessage'),//Game winning modal
    restart = document.getElementsByClassName('restart')[0],//Restart button
    stars = document.getElementsByClassName('stars')[0]
;

//Variables
var
    cardPair = [],//card pair for match comparison
    succesfulCardPairs = 0,//count number of successful pairs
    numOfClicks = 0,
    numOfStars = 5,
    numOfTries = 0
;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//ARRAY OF SYMBOLS FOR CARD icons
/*
var symbolsArray = [
    'fa fa-anchor', //1
    'fa fa-anchor', 

    'fa fa-bicycle', //2
    'fa fa-bicycle', 

    'fa fa-bolt', //3
    'fa fa-bolt', 

    'fa fa-bomb', //4
    'fa fa-bomb', 

    'fa fa-cube', //5
    'fa fa-cube', 

    'fa fa-diamond', //6
    'fa fa-diamond', 

    'fa fa-leaf', //7
    'fa fa-leaf', 

    'fa fa-paper-plane-o', //8
    'fa fa-paper-plane-o'
];
*/

/*
 * set up the event listener for a card. If a card is clicked:
 *  check - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//Event Listeners
deck.addEventListener(//event listener on deck object
    'click',
    function(event){
        cardPair.push(event.target);//add selected card to working pair for comparison

        if (cardPair.length <= 2){//open cards
            openCard(event.target); 

            if (cardPair.length == 2){//evaluate card match
                setTimeout(
                    function(){
                        matchCardPair(cardPair[0], cardPair[1]);
                        gameWin(succesfulCardPairs);
                    },
                    500
                );
            }
        }

        movesCount();
        starsScoreDisplay();
    },
    true
);

restart.addEventListener(//restart button event listener
    'click',
    function (){
        resetDeck();
    },
    true
);

//Functions

function gameWin(succesfulCardPairs){ //gameWin Function to display message and reset deck
    console.log('game win count down: ' + succesfulCardPairs);
    
    if (succesfulCardPairs == 8){
        gameWinMessage.classList.add('d-block');

        gameWinMessage.addEventListener(//event listener on gameWinMessage to close modal
            'click',
            function(){
                gameWinMessage.classList.remove('d-block');
                resetDeck();      
            },
            true
        );
    }
}

function matchCardPair(cardOne, cardTwo){//MATCH CARD FUNCTION. Insert cardPair[0], cardPair[1] into cardOne, cardTwo
    var 
        className1 = cardOne.querySelector('i').className,
        className2 = cardTwo.querySelector('i').className
    ;
    
    //remove 'open' class to prep for applying 'match' class
    cardOne.classList.remove('open');
    cardTwo.classList.remove('open');
    

    if (className1 == className2){
        cardOne.classList.add('match');
        cardTwo.classList.add('match');

        succesfulCardPairs += 1;
    }

    cardPair = [];
}

function movesCount() { //count and display number of moves
    numOfClicks += 1;

    if((numOfClicks % 2) == 0 && numOfClicks != 0){
        ++numOfTries;
    }

    moves.textContent = numOfTries;
}

function openCard(card){ //OPEN CARD FUNCTION. Insert event.target into "card"
    
    if (!card.classList.contains('open') && !card.classList.contains('match')){
        card.classList.add('open');
    }
    /*else if (card.classList.contains('open')){
        card.classList.remove('open');
    }*/
}

function resetDeck() {//reset the deck of cards by removing open and match classes
    for (let i = 0; i < cards.length; i++){
        cards[i].classList.remove('match');
        cards[i].classList.remove('open');

        
    }

    cardPair = [];
    numOfClicks = 0;
    numOfTries = 0;
        moves.textContent = numOfTries;
    succesfulCardPairs = 0;

    starsScoreDisplay();
}
 
function shuffle(array) {// Shuffle function from http://stackoverflow.com/a/2450976
    var
        currentIndex = array.length,
        temporaryValue,
        randomIndex
        ;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function starsScoreDisplay() {//display score in stars
    let 
        x = numOfStars - Math.floor(numOfTries/5),
        y = ''
    ;

    if (x < 1){
        x = 1;
    }

    for (let i = 0; i < x; i++){
        y += '<li><i class="fa fa-star"></i></li>';
    }

    stars.innerHTML = y;
}
starsScoreDisplay();