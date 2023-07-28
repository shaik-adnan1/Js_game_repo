/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, normalGamePlaying, notActivePlayer;
normalHardNew();

document.querySelector('#name-0').textContent = 'Player 1';
document.querySelector('#name-1').textContent = 'Player 2';

/*************************************************
 * Functions-Section
 */
/*** NEXT PLAYER */

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    activePlayer === 0? notActivePlayer = 1 : notActivePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    // document.querySelector('.player-0-panel').classList.add('wrapper-dark');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
};

function nextPlayerDark() {
    activePlayer === 0? activePlayer = 1: activePlayer = 0;
    roundScore = 0;

    activePlayer  === 0? notActivePlayer = 1: notActivePlayer = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active-dark');
    document.querySelector('.player-' + notActivePlayer + '-panel').classList.remove('active-dark');
    document.querySelector('.player-' + notActivePlayer + '-panel').classList.remove('active');
    
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
};

// function nextPlayerDark() {
//     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
//     roundScore = 0;
//     document.getElementById('current-0').textContent = '0';
//     document.getElementById('current-1').textContent = '0';

//     document.querySelector('.player-0-panel').classList.toggle('active-dark');
//     document.querySelector('.player-1-panel').classList.toggle('active-dark');
    
//     //document.querySelector('.player-0-panel').classList.remove('active');
//     //document.querySelector('.player-1-panel').classList.add('active');

//     document.querySelector('.dice').style.display = 'none';
//     document.getElementById('dice-2').style.display = 'none';
// };

/**** NORMAL ROLL */
function normalRoll() {
    if(normalGamePlaying === true){
        //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.style.top = '178px';
        diceDOM.src = './images/dice-' + dice + '.png'; 


        //3. update the round score if the rolled is not 1...
        if(dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore; 
        } else {
            nextPlayer();
            //document.querySelector('.player-0-panel').classList.remove('active');
            //document.querySelector('.player-1-panel').classList.add('active');
        }
    }
};

/**** NORMAL HOLD */
function normalHold() {
    if(normalGamePlaying === true) {
        //Add current score to the global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('#end-score').value;
        var winningScore;
        // Undefined, 0, null or "" are COERCED to false
        // Anything else is COERCED to true
        if(input) {
            winningScore = input;
        } else {
            winningScore = 50;
        }

        //Check if player won the game
        if(scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('#name-' + notActivePlayer).textContent = 'Terminated!';
            document.querySelector('.player-' + notActivePlayer + '-panel').classList.add('terminated');
            document.querySelector('.player-' + notActivePlayer + '-panel').classList.remove('player-name');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            normalGamePlaying = false;
            // nameDOM.style.color = 'orangered';
        } else {
            nextPlayer();
        }   
    }
};

/**** NORMALHARD NEW  */
function normalHardNew() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    notActivePlayer = 1;
    normalGamePlaying = true;
    hardGamePlaying = false;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = document.getElementById('player-1-name').value;
    document.querySelector('#name-1').textContent = document.getElementById('player-2-name').value;
    nameCondition();
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('winner-dark');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner-dark');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active-dark');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active-dark');
    document.querySelector('.player-0-panel').classList.remove('terminated-dark');
    document.querySelector('.player-1-panel').classList.remove('terminated-dark');
    document.querySelector('.player-0-panel').classList.remove('terminated');
    document.querySelector('.player-1-panel').classList.remove('terminated');
    document.querySelector('.player-0-panel').classList.add('active');
};

function normalHardNewDark() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    notActivePlayer = 1;
    normalGamePlaying = false;
    hardGamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = document.getElementById('player-1-name').value;
    document.querySelector('#name-1').textContent = document.getElementById('player-2-name').value;
    nameCondition();
    document.querySelector('.player-0-panel').classList.remove('winner-dark');
    document.querySelector('.player-1-panel').classList.remove('winner-dark');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active-dark');
    document.querySelector('.player-1-panel').classList.remove('active-dark');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('terminated-dark');
    document.querySelector('.player-1-panel').classList.remove('terminated-dark');
    document.querySelector('.player-0-panel').classList.remove('terminated');
    document.querySelector('.player-1-panel').classList.remove('terminated');
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active-dark');


};

/**** HARD ROLL */
var lastDice1;
var lastDice2;
function hardRoll() {
    if(hardGamePlaying === true){
        //1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM1 = document.getElementById('dice-1');
        var diceDOM2 = document.getElementById('dice-2');

        diceDOM1.style.display = 'block';
        diceDOM2.style.display = 'block';
        diceDOM1.src = './images/dice-dark-' + dice1 + '.png'; 
        diceDOM2.src = './images/dice-dark-' + dice2 + '.png'; 

        // 3. update the score into the UI
        if (dice1 === 6 && lastDice1 === 6) {
            //Player looses score
            if(scores[activePlayer] >= 20) {
                scores[activePlayer] -= 20;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                nextPlayerDark();
            } else {
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = '0';
                nextPlayerDark();
            }
           
        } else if (dice1 !== 1 && dice2 !== 1) {
            //Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayerDark();
        }
        lastDice1 = dice1;

        // //3. update the round score if the rolled is not 1...
        // if(dice1 !== 1 && dice2 !== 1) {
        //     //Add score
        //     roundScore += dice1 + dice2;
        //     document.querySelector('#current-' + activePlayer).textContent = roundScore; 
        // } else {
        //     nextPlayerDark();
        //     //document.querySelector('.player-0-panel').classList.remove('active');
        //     //document.querySelector('.player-1-panel').classList.add('active');
        // }
    }
}

/**** HARD HOLD */
function hardHold() {
    if(hardGamePlaying === true) {
        //Add current score to the global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('#end-score').value;
        var winningScore;
        // Undefined, 0, null or "" are COERCED to false
        // Anything else is COERCED to true
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        //Check if player won the game
        if(scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner-dark');
            document.querySelector('#name-' + notActivePlayer).textContent = 'Terminated!';
            document.querySelector('.player-' + notActivePlayer + '-panel').classList.add('terminated-dark');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active-dark');
            document.querySelector('.dice').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            hardGamePlaying = false;
            // nameDOM.style.color = 'orangered';
        } else {
            nextPlayerDark();
        }   
    }
}

/************************************
 * Btn-Events
 */

document.querySelector('.btn-roll').addEventListener('click', normalRoll);

document.querySelector('.btn-hold').addEventListener('click', normalHold);

document.querySelector('.btn-new').addEventListener('click', normalHardNew);

/***************************************************
 * Next player-------------------------
 */

 
// function nextPlayer() {
//     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
//     roundScore = 0;
//     document.getElementById('current-0').textContent = '0';
//     document.getElementById('current-1').textContent = '0';

//     document.querySelector('.player-0-panel').classList.toggle('active');
//     document.querySelector('.player-1-panel').classList.toggle('active');
    
//     //document.querySelector('.player-0-panel').classList.remove('active');
//     //document.querySelector('.player-1-panel').classList.add('active');

//     document.querySelector('.dice').style.display = 'none';
//     document.getElementById('dice-2').style.display = 'none';
// }


function nameCondition() {
    if(document.getElementById('player-1-name').value === '') {
        document.querySelector('#name-0').textContent = 'Player 1';
    }
    if(document.getElementById('player-2-name').value === '') {
        document.querySelector('#name-1').textContent = 'Player 2';
    }
}


/***************************************************
 * Pop_ups Rules-container and _Player info Container---EVENTS---
 */


 
document.querySelector('.change-name').addEventListener('click', function() {
    document.querySelector('.player-info-container').style.display = 'block';
    document.querySelector('.go-btn').textContent = 'Save!';
});

document.querySelector('.rules-btn').addEventListener('click', function() {
    document.querySelector('.rules-container').style.display = 'block';
    document.querySelector('.start-btn').textContent = 'Back';
});


document.querySelector('.start-btn').addEventListener('click', function(){
    document.querySelector('.rules-container').style.display = 'none';
});

document.querySelector('.go-btn').addEventListener('click', function() {
    document.querySelector('.player-info-container').style.display = 'none';
    document.getElementById('name-0').textContent = document.getElementById('player-1-name').value;
    document.getElementById('name-1').textContent = document.getElementById('player-2-name').value;
    nameCondition();
});

document.querySelector('#player-1-name').addEventListener('click', function(){
    document.querySelector('.player-0-name').textContent = 'Player-1';
});

document.querySelector('#player-2-name').addEventListener('click', function(){
    document.querySelector('.player-0-name').textContent = 'Player-2';
});

/************************************************************
 * Player-feild Animations(focuses)
 */

document.querySelector('#player-1-name').addEventListener('focus', function(){
     document.querySelector('.player-0-name').classList.add('player-animate');
});

document.querySelector('#player-1-name').addEventListener('focusout', function(){
     document.querySelector('.player-0-name').classList.remove('player-animate');
});

document.querySelector('#player-2-name').addEventListener('focus', function(){
    document.querySelector('.player-0-name').classList.add('player-animate');
});

document.querySelector('#player-2-name').addEventListener('focusout', function(){
     document.querySelector('.player-0-name').classList.remove('player-animate');
});

/**
 * Normal mode and Hard mode toogle
 *document.querySelector('.hard').addEventListener('click', function() {
  document.getElementById('body-class').style.background = 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0))';
  document.querySelector('.wrapper').classList.add('wrapper-dark');
  // document.querySelector('.player-0-panel, .player-1-panel').classList.add('player-0-panel-dark, player-1-panel-dark');
  document.querySelector('.player-name').classList.add('player-name-dark');
  document.querySelector('.active').classList.add('active-dark');
    
})
 */

/**Dark toogle to light
 *  */

document.querySelector('.normal').addEventListener('click', function() {
    normalHardNew();
    document.querySelector('.wrapper').classList.remove('wrapper-dark');
    document.querySelector('.player-0-panel').classList.remove('player-0-panel-dark');
    document.querySelector('.player-1-panel').classList.remove('player-1-panel-dark');
    document.getElementById('name-0').classList.remove('player-name-dark');/**watch later */
    document.getElementById('name-1').classList.remove('player-name-dark');/**watch later */
    // document.querySelector('.player-name').classList.add('player-name-dark');/**watch later */
    document.querySelector('.active').classList.remove('active-dark');
    document.querySelector('.rules-container-dark').style.display = 'none';
    document.querySelector('.player-info-container-dark').style.display = 'none';
    document.getElementById('dice-1').classList.remove('dice-dark');
    document.getElementById('dice-2').classList.remove('dice-dark');
    document.querySelector('.final-score').classList.remove('final-score-dark');
    document.querySelector('.btn-new').style.color = '#555';
    document.querySelector('.btn-hold').style.color = '#555';
    document.querySelector('.btn-roll').style.color = '#555';
    document.querySelector('.player-info-container').classList.remove('player-info-container-dark');
    document.querySelector('.btn-roll').addEventListener('click', normalRoll);
    document.querySelector('.btn-hold').addEventListener('click', normalHold);
    document.querySelector('.btn-new').addEventListener('click', normalHardNew);
    document.querySelector('.body-class').style.background = 'linear-gradient(rgba(62, 20, 20, 0.4), rgba(62, 20, 20, 0.4)), url(back.jpg)';

    document.querySelector('.rules-btn').addEventListener('click', function() {
        document.querySelector('.rules-container').style.display = 'block';
        document.querySelector('.rules-container-dark').style.display = 'none';
    });
    
    document.querySelector('.start-btn-dark').addEventListener('click', function(){
        document.querySelector('.rules-container-dark').style.display = 'none';
    });
});


document.querySelector('.hard').addEventListener('click', function() {
    normalHardNewDark();
    document.querySelector('.body-class').style.background = 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0))';
    document.querySelector('.wrapper').classList.add('wrapper-dark');
    document.querySelector('.rules-container-dark').style.display = 'block';
    document.querySelector('.rules-container').style.display = 'none';
    document.querySelector('.player-info-container').style.display = 'none';
    document.querySelector('.player-0-panel').classList.add('player-0-panel-dark');
    document.querySelector('.player-1-panel').classList.add('player-1-panel-dark');
    document.getElementById('name-0').classList.add('player-name-dark');/**watch later */
    document.getElementById('name-1').classList.add('player-name-dark');/**watch later */
    document.querySelector('.feild').classList.add('feild-dark');/**watch later */
    // document.querySelector('.player-name').classList.add('player-name-dark');/**watch later */
    document.querySelector('.final-score').classList.add('final-score-dark');
    document.getElementById('dice-1').classList.add('dice-dark');
    document.getElementById('dice-2').classList.add('dice-dark');
    document.querySelector('.btn-new').style.color = '#fff';
    document.querySelector('.btn-hold').style.color = '#fff';
    document.querySelector('.btn-roll').style.color = '#fff';
    document.querySelector('.player-info-container').classList.add('player-info-container-dark');
    document.querySelector('.btn-roll').removeEventListener('click', normalRoll);
    document.querySelector('.btn-hold').removeEventListener('click', normalHold);
    document.querySelector('.btn-new').removeEventListener('click', normalHardNew);
    document.getElementById('dice-1').style.top = '110px';
    // DARK-btn-Events
    document.querySelector('.btn-new').addEventListener('click', normalHardNewDark);
    document.querySelector('.btn-roll').addEventListener('click', hardRoll);
    document.querySelector('.btn-hold').addEventListener('click', hardHold);

    /*************************
     * rules-dark
     */
    document.querySelector('.rules-btn').addEventListener('click', function() {
        document.querySelector('.rules-container-dark').style.display = 'block';
        document.querySelector('.rules-container').style.display = 'none';
    });
    
    document.querySelector('.start-btn-dark').addEventListener('click', function(){
        document.querySelector('.rules-container-dark').style.display = 'none';
    });
});






























































