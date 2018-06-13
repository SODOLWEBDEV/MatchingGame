//DomVariables
var 
    counter = document.getElementsByClassName('timer')[0].getElementsByClassName('counter')[0],
    deck  = document.querySelector('.deck'), //Deck
        cards = deck.getElementsByTagName('li'), //List of cards
    gameWinMessage = document.querySelector('#gameWinMessage'),//Game winning modal
        modalBody = gameWinMessage.getElementsByClassName('modal-body')[0],
    moves = document.getElementsByClassName('moves')[0],
    restart = document.getElementsByClassName('restart')[0],//Restart button
    stars = document.getElementsByClassName('stars')[0]
;

//Variables
var
    cardIcons = [
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
    ],
    cardPair = [],//card pair for match comparison
        succesfulCardPairs = 0,//count number of successful pairs
    numOfClicks = 0, //count number of clicks 
    numOfStars = 3,//initial number of stars
    numOfTries = 0,//number of tried pairs
    startTime = 0,
        endTime = 0,
        nowTime = 0,
            runningTimerCheck = 0,
        timeDiff = endTime - startTime
;

//Event Listeners
deck.addEventListener(//event listener on deck object
    'click',
    function(event){
        cardPair.push(event.target);//add selected card to working pair for comparison
        if (!event.target.classList.contains('card')){
            let x = cardPair.pop();
            console.log(event.target.classList.contains('card'));
        }

        if (cardPair.length <= 2 && event.target.classList.contains('card')){//open cards
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

        console.log(cardPair);
        console.log((cardPair[0] == cardPair[1] && !event.target.classList.contains('card')));
        
        movesCount();
        starsScoreDisplay();
        startTimeCounter();
        setInterval(displayRunningTimer, 500);
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
    if (succesfulCardPairs == 8){
        endTimeCounter();
        
        gameWinMessage.classList.add('d-block');

        gameWinMessage.addEventListener(//event listener on gameWinMessage to close modal and reset deck
            'click',
            function(){
                gameWinMessage.classList.remove('d-block');
                resetDeck();      
            },
            true
        );

        modalBody.innerHTML += //set modal message with score and elapsed time
            stars.outerHTML +
            "<br> Time: " + timeDiff + " seconds<br>" +
            "<p>Click anywhere if you'd like to play again."
        ;

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

function randomizeDeck(x){
    x = shuffle(x);

    for(let i = 0; i < x.length; i++){
        cards[i].getElementsByTagName('i')[0].className = x[i];
    }
}randomizeDeck(cardIcons);

function resetDeck() {//reset the deck of cards by removing open and match classes
    for (let i = 0; i < cards.length; i++){
        cards[i].classList.remove('match');
        cards[i].classList.remove('open');
    }

    cardPair = [];
    counter.innerHTML = 0;
    modalBody.innerHTML = '<p class="h1">You Won!</p>';
    numOfClicks = 0;
    numOfTries = 0;
        moves.textContent = numOfTries;
    startTime = 0;
        endTime = 0;
        nowTime = 0;
            runningTimerCheck = 0;
        timeDiff = 0;
    succesfulCardPairs = 0;

    randomizeDeck(cardIcons);
    starsScoreDisplay();
}
 
function shuffle(array){// Shuffle function from http://stackoverflow.com/a/2450976
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
        x = numOfStars - Math.floor(numOfTries/9),//number of stars to display
        y = ''
    ;

    if (x < 1){//lower limit of star count
        x = 1;
    }

    for (let i = 0; i < x; i++){//output score
        y += '<li><i class="fa fa-star"></i></li>';
    }

    stars.innerHTML = y;
}starsScoreDisplay();

function startTimeCounter(){//start timer
    if (startTime == 0){
        startTime = new Date();
    }

    runningTimerCheck = 1;
}
function endTimeCounter(){//end timer
    if (endTime == 0){
        endTime = new Date();
        timeDiff = Math.round((endTime - startTime) / 1000);
    }
}
function displayRunningTimer(){
    nowTime = new Date();

    timeDiff = Math.round((nowTime - startTime) / 1000);

    if(runningTimerCheck == 0){
        counter.innerHTML = 0;
    }
    else if(runningTimerCheck == 1){
        counter.innerHTML = timeDiff;
    }    
}