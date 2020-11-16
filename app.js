let domStrings = {
  playerChoice : document.getElementById('display_player_selection'),
  compChoice : document.getElementById('display_comp_selection'),
  heads : document.getElementById('headpic'),
  tails : document.getElementById('tailpic'),
  userScoreStr : document.getElementById('user_score'),
  compScoreStr : document.getElementById('comp_score'),
  winnerText : document.getElementById("winner"),
  tieText : document.getElementById("tie")
}

let els = document.getElementsByClassName('buttons');
let arrayOfEls = Array.from(els);
let sides = ['Heads', 'Tails'];

let recordOfCompSelection = [];


let userScore = 0;
let compScore = 0;

let gameOn = {play : true};


//Starts game
sideSelectionsThenFlip()

function sideSelectionsThenFlip(){

  arrayOfEls.forEach((els) => {
    els.addEventListener('click', (e) => {
      hideTieText();

      //if game is already finished
      if(gameOn.play === false){
        domStrings.winnerText.innerText = "GAME OVER";
        return;
      }

      e = event.target;

      (e===arrayOfEls[0] ? domStrings.playerChoice.innerHTML= "Player 1 Selected: Heads":
       domStrings.playerChoice.innerHTML = "Player 1 Selected: Tails");
       compSelection();
       startFlip();

    })
  });

}

//Store computer selection

const compSelection = function selectForComp(){

    const a = Math.floor(Math.random() * sides.length)
    domStrings.compChoice.innerHTML = `Computer has Selected: ${sides[a]}`;

    recordOfCompSelection.push(sides[a]);
    if(recordOfCompSelection.length > 1){
      recordOfCompSelection.shift();
    }

  };

//Animates coin
function startFlip(){

    for(i = 0 ; i < 3; i++){

      setTimeout(showTails, 500)
      setTimeout(hideTails, 750)
      setTimeout(showTails, 1100)
      setTimeout(hideTails, 1900)
      setTimeout(showTails, 3000)

    }
    setTimeout(gravitysResults, 4000)
}

//Randomize result of coin flip and display
function gravitysResults(){

  const b = Math.floor(Math.random() * sides.length);
  const result = sides[b];


  result === "Heads" ? hideTails() : showTails();

  calcPoint(result, recordOfCompSelection[0], playerSelected())

}


function showTails(){
  domStrings.heads.style.zIndex = -1;
}

function hideTails(){
  domStrings.heads.style.zIndex = 0;
}

//Get player selection
const playerSelected = function getPlayerSelection(){
  const arr = domStrings.playerChoice.innerText.split(" ");
  const playerSelection = arr[arr.length - 1];

  return playerSelection;

};


//Compute winner of round
function calcPoint(result, comp, user){


  if(result === user){
      userScore++;
      domStrings.userScoreStr.innerText = `Player One Score: ${userScore}`
    };


  if (result === comp){
      compScore ++;
      domStrings.compScoreStr.innerText = `Computer Score: ${compScore}`
    };
 if (result != comp && result != user) {
      showTieText();
      domStrings.tieText.innerText = "Both sides missed!"

    };

    checkForWin();

}

function checkForWin(){
  // unlikely tie
  if(compScore === 5 && userScore === 5){
    domStrings.winnerText.innerText = "It's a tie game!";
    gameOver();
  } else {
    // Main checking logic
    if(compScore === 5 || userScore === 5) {
      if (userScore === 5) {
        showWin("user")
      } else{
        showWin("comp");
      }
    }
  }
}

function showWin(winner){
  if (winner === "user") {
    domStrings.winnerText.innerText = "Player 1 has Won!"
  } else {
    domStrings.winnerText.innerText = "The Computer has Won!"
  }

  gameOver();
}

function gameOver(){
  return gameOn.play = false;
}


//DOM manipulation for tie alerts
function hideTieText(){
  domStrings.tieText.style.display = "none";
}

function showTieText(){
  domStrings.tieText.style.display = "block";
}
