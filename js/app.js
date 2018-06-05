//DomVariables
var 
    deck  = document.querySelector('.deck'), //Deck
    cards = deck.getElementsByTagName('li') //List of cards
    //cards[0].querySelector('i')
;
//Variables
var
    cardPair = []
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

/*Card open and match
match
open
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
//event listener on deck object
deck.addEventListener('click',
    function(event){
        cardPair.push(event.target);//add selected card to working pair for comparison

        if (cardPair.length <= 2){
            openCard(event.target); //open cards
        }  
        
        if (cardPair.length == 2){
            setTimeout(
                function(){
                    matchCardPair(cardPair[0], cardPair[1])
                },
                500
            );
        }
        
    },
    true
);

 function openCard(card){ //OPEN and MATCH CARD FUNCTION. Insert event.target into "card"
    
    if (!card.classList.contains('open') && !card.classList.contains('match')){
        card.classList.add('open');
    }
    /*else if (card.classList.contains('open')){
        card.classList.remove('open');
    }*/
 }

 function matchCardPair(cardOne, cardTwo){
    var 
        className1 = cardOne.querySelector('i').className,
        className2 = cardTwo.querySelector('i').className
    ;
    
    

    if (className1 == className2){
        cardOne.classList.remove('open');
        cardTwo.classList.remove('open');
        
        cardOne.classList.add('match');
        cardTwo.classList.add('match');
    }
    else if (className1 != className2){
        cardOne.classList.remove('open');
        cardTwo.classList.remove('open');
    }

    cardPair = [];
    console.log(cardPair);
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
};