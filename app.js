/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
//PIG GAME..

var scores , roundScore , activePlayer , running ; // DECLARE A VARIABLE RUNNING TO CHECK THE STATE OF THE GAME AND AVOID THE ROLL DICE BUTTON TO KEEP ON FUNCTIONING AFTER YOU HAVE GOT YOUR WINNER. (INITIALLY SET THAT VARIBALE TO TRUE.)

init();

scores = [0 , 0];
roundScore = 0;
activePlayer = 0;

document.querySelector('.dice').style.display = 'none';

//document.querySelector('#current-' + activePlayer).textContent = dice;

// NOW TO INTIALISE THE CURRENT SCORE AND ROUND SCORE OF BOTH THE PLAYERS TO 0 ... WE USE GetElementByID METHOD (IT IS FASTER THAN QUERY SELECTOR AND IS USED WHEN YOU NEED TO SELECT OBJECTS BASED ON THEIR ID'S)....

//document.getElementById('score-0').textContent = '0';
//document.getElementById('score-1').textContent = '0';
//document.getElementById('current-0').textContent = '0';
//document.getElementById('current-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click' , function(){
    if(running){
    //1.GENERATE A RANDOM NUMBER.
    var dice = Math.floor(Math.random()*6) + 1;
    //2. DISPLAY THIS RANDOM NUMBER ON THE DICE IN BETWEEN.
    //CREATE A VAR WHICH WILL STORE THE DOM OBJECT (SINCE YOU NEED TO CALL THAT PIECE OF CODE AGAIN AND AGAIN).
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    
    //3. UPDATE THE ROUND SCORE IF THE ROLLED DICE IS NOT ONE.
    if(dice!==1){
        //ADD SCORE.
        roundScore+=dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }else{
        nextPlayer();
    }
}
}); //HERE THIS TYPE OF FUNCTION PASSING IS CALLED ANONYMOUS FUNCTION. i.e. FUNCTIONS FULL DEFINITION PASSED AS AN ARGUEMENT.

document.querySelector('.btn-hold').addEventListener('click' , function(){
    if(running){
        //ADD THE CURRENT SCORE TO THE PERSONS GLOBAL SCORE.
    scores[activePlayer]+=roundScore;
    //UPDATE UI.
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    //CHECK IF THE PLAYER WON THE GAME
    
    if(scores[activePlayer] >= 20){
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        running = false;
    }else{
        //NEXT PLAYER.
        nextPlayer();
    }
    
    //TOGGLE THE PLAYER. BUT WHEN YOU COPY PASTE THE ABOVE CODE OF TOGGLING YOU ARE VIOLATING THE DRY PRINCIPAL (DONT REPEAT YOURSELF). TO AVOID THIS CREATE A FUNCTION CALLED NEXTPALYER().
//    nextPlayer();
    
    }
});

function nextPlayer(){
    //NEXT PLAYER.
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        //TOGGLE IS USED FOR (IF THE PLAYER ONE IS HAVING THE ACTIVE CLASS THEN TOGGLE WILL REMOVE THEACTIVE CLASS AND IF IT DOES NOT ALREADY HAS THE ACTIVE CLASS THEN TOGGLE ADDS THE ACTIVE CLASS..).
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        //THIS WONT SERVE OUR PURPOSE HENCE USE THE TOGGLE METHOD AS USED ABOVE..
        
//        document.querySelector.('.player-0-panel').classList.remove('active');
//        document.querySelector.('.player-1-panel').classList.add('active');
        
        // ONCE AGAIN MAKE THE DICE DISSAPEAR WHENEVER THE DICE SHOWS 1 AND THE PLAYER IS SWITCHED.
        
        document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click' , init);

function init(){
    scores = [0 , 0];
    activePlayer = 0;
    roundScore = 0;
    running = true;
    
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active'); //REMOVE THE ACTIVE CLASS FROM THE FIRST PLAYER BUT YOU MAY THINK THAT WE ARE ADDING IT AGAIN SO WHY DID WE REMOVE IT IF WE HAD TO ADD IT AGAIN.. (THE REASON IS THAT , THINK IF LAST ACTIVE PLAYER WAS FIRST PLAYER AND THEN WE DIDNT REMOVED THE ACTIVE CLASS AND STRAIGHT AWAY ADDED THE IT SO THEIR WILL BE 2 ACTIVE CLASSES ADDED ON THE FIRST PLAYER , SO IF IN FUTURE WE NEED TO REMOVE THE ACTIVE CLASSES FROM THE FIRST PLAYERE THEN WE NEED TO CALL THE REMOVE FUNCTION TWICE.)
    document.querySelector('.player-1-panel').classList.remove('active');
    //ADDING THE ACTIVE CLASS BACK TO THE FIRST PLAYER.
    document.querySelector('.player-0-panel').classList.add('active');
}






// -------------------------------------------------------------------------------------------------------------------------------------------------
//THE BELOW PIECE OF CODE WAS JUST FOR MAKING YOU UNDERSTAND HOW THINGS WORK.

//dice = Math.floor(Math.random()*6) + 1;
//console.log(dice);
//SETTING A VALUE TO A WEBPAGE USING THE QUERY SELECTOR METHOD . (QUERY SELECTOR AS A SETTER METHOD).

//TO EMPHASIZE THE TEXT INSIDE THE CURRENT SCORE.
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//IF YOU WRITE <em> + dice + </em> then it will print exactly <em> + dice + </em> inside the current box.

//READING A VALUE FROM THE WEBPAGE USING THE QUERY SELECTOR METHOD. (QUERY SELECTOR AS A GETTER METHOD).
// var x = document.querySelector('#score-0').textContent;
//console.log(x);

// TO SHOW YOU HOW TO MAKE THE CENTRE DICE DISAPPEAR.

//document.querySelector('.dice').style.display = 'none';

//AN EVENT CAN ONLY BE HANDLE AS SOON AS THE EXECUTION STACK IS EMPTY i.e. ALL THE FUNCTIONS HAVE RETURNED.

//CREATING AN EVENT LISTENER BY SELECTING THE BUTTON CORRESPONDING TO ROLL DICE.

//function btn(){
//    //DO SOMETHING HERE.
//    
//} //NO NEED TO WRITE THIS FUNCTION SEPERATELY .. USE IT AS AN ANONYMOUS FUNCTION ONLY.
//document.querySelector('.btn-roll').addEventListener('click' , btn) ->..//BTN() IS AN  CALLLBACK FUNCTION i.e. IT IS A FUNCTION CALLED BY ANOTHER FUNCTION.
