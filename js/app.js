//Dom variables
var 
    deck  = document.querySelector('.deck'), //Deck
    cards = deck.getElementsByTagName('li') //List of cards
    //cards[0].querySelector('i')
;
console.log();


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//ARRAY OF SYMBOLS FOR CARD icons
/*
var symbolsArray = [
    'fa-anchor', //1
    'fa-anchor', 

    'fa-bicycle', //2
    'fa-bicycle', 

    'fa-bolt', //3
    'fa-bolt', 

    'fa-bomb', //4
    'fa-bomb', 

    'fa-cube', //5
    'fa-cube', 

    'fa-diamond', //6
    'fa-diamond', 

    'fa-leaf', //7
    'fa-leaf', 

    'fa-paper-plane-o', //8
    'fa-paper-plane-o'
];
*/

/*Card open and match
match
open
*/




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
//event listener on deck object
deck.addEventListener('click',
    function(event){
        openCard(event.target);
    },
    false
);

 function openCard(card){ //OPEN CARD FUNCTION. Insert event.target into "card"
    if (!card.classList.contains('open') && !card.classList.contains('match')){
        card.classList.add('open');
    }
    /*else if (card.classList.contains('open')){
        card.classList.remove('open');
    }*/
 }

 // Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
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