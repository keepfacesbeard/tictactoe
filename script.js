let playerSymbol = "X";
let computerSymbol = "O";
let turnCount = 0
let blankSquares = 9
let gameOn = true;
let hardMode = false;
let previousMove = 0
//create list of square objects
const squares = []
const createSquare = (num, state) => {
    return {
        num: num,
        state: state,
     markX() {
             this.state = "X";
         },
     markY() {
             this.state = "Y";
         },
     reset() {
             this.state = "blank"
     },
     }
   };
  
 for (let i=0; i<9;i++){
     let newsquare = createSquare(i, "blank");
     squares.push(newsquare);
 }


//draw gameboard in DOM
const gameboard = document.getElementById("boardtemplate");

function drawGameBoard() {
   for (let i=0; i<9; i++){
       let square = document.createElement('img');
       square.classList.add('gamesquare');
       square.id = `square${i}`;
       square.src = './blank.png';
       gameboard.appendChild(square);
    }
}

//add event listener
gameboard.addEventListener('click', function(event){
    playerTurn(event.target);
})

function playerTurn (clickedsquare) {
    if (gameOn == true){
        console.log('player chooses: ' + clickedsquare.id)
        let index = (parseInt(clickedsquare.id[6]));
        previousMove = index;
        if (squares[index].state !== "blank") {
            alert("Square has already been played. Choose again");
        }
        else {    
            if (playerSymbol == "X") {
                squares[index].markX();
                clickedsquare.src = "./ex.png";
            }
            else if (playerSymbol == "O") {
                squares[index].markY();
                clickedsquare.src = "./oh.png";
            }
        }
        ++turnCount;
        --blankSquares;
        checkVictory();
        if ( turnCount < 5 && gameOn == true) {
            computerTurn();
        } 
    }
}


function computerChoice() {
    if (hardMode == false) {
        return easyComputer();
    }
    else if (hardMode == true){
        return hardComputer();
    }
}

function computerTurn () {
    let index = computerChoice();
    console.log('the returned index is: ' + index)
    if (squares[index] !== undefined) {
        console.log('computer chooses square: ' + index)
        if (gameOn == true){   
            if (playerSymbol == "X") {
                squares[index].markY();
                document.getElementById(`square${index}`).src = "./oh.png";
            }
            else if (playerSymbol == "O") {
                squares[index].markX();
                document.getElementById(`square${index}`).innerText = "./ex.png";
            }
        }
        --blankSquares;
        checkVictory();
    }
    else {
        computerTurn();
    }
}

const winningCombos = [ 
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]


function checkVictory (){
    let victory = "none";
    for (const combo of winningCombos){
        if (squares[combo[0]].state != "blank") {
            if ( squares[combo[0]].state == squares[combo[1]].state && squares[combo[1]].state == squares[combo[2]].state ) {
                declareVictory(squares[combo[0]].state);
                console.log("the victor is: " + squares[combo[0]].state);
                victory = "victory";
            }
        }
    }
    if (victory == "none" && blankSquares == 0){
        declareDraw();
    }

}


function declareVictory(symbol) {
    if (playerSymbol == symbol) {
        alert(`You've won! You bested the machine in ${turnCount} moves.`);
    }
    else {
        alert("Computer wins!")
    }
    gameOn = false;
    
}
function declareDraw() {
    alert(`It's a Draw! Try again.`);
    gameOn = false;
  
}

function turnOffBoard() {
    console.log('turning off board');
    gameboard.removeEventListener('click', function(event){
        playerTurn(event.target);
    })
}

function resetBoard() {
    for (let i=0; i<9; i++){
        squares[i].reset();
        document.getElementById(`square${i}`).src = "./blank.png";
    }
    turnCount = 0;
    blankSquares = 9
    gameOn = true;
}


function toggleDifficulty() {
    if (hardMode === true) {
        hardMode = false;
        difficultyButton.innerText = "Difficulty: Easy"
    }
    else {
        hardMode = true;
        difficultyButton.innerText = "Difficulty: HARD!";
    }
}

const resetButton = document.getElementById('resetbutton');
resetButton.addEventListener("click", resetBoard);
const difficultyButton = document.getElementById('difficulty');
difficultyButton.addEventListener("click", toggleDifficulty);


drawGameBoard();

//computer ai stuffs:

function easyComputer(){
    let rando = Math.random();
    let num = parseInt(rando.toString()[2]);
    if ( num == 9 ){
        computerChoice();
    }
    else if ( squares[num].state == "blank" ) {
        console.log("square number " + num +" is free");
        return num;
    }
    else {
        computerChoice();
    }
};

function hardComputer() {
    if (squares[4].state == "blank"){
        return 4;
    }
    else {
        //go for the win if possible
        for (const combo of winningCombos){
            if (squares[combo[0]].state == computerSymbol && squares[combo[1]].state == computerSymbol && squares[combo[2]].state == "blank") {
                return combo[2];
            }
            else if (squares[combo[0]].state == computerSymbol && squares[combo[2]].state == computerSymbol && squares[combo[1]].state == "blank") {
                return combo[1];
            }
            else if (squares[combo[1]].state == computerSymbol && squares[combo[2]].state == computerSymbol && squares[combo[0]].state == "blank") {
                return combo[0];
            }
//defense secondary
        for (const combo of winningCombos){
                if (squares[combo[0]].state == playerSymbol && squares[combo[1]].state == playerSymbol && squares[combo[2]].state == "blank") {
                    return combo[2];
                }
                else if (squares[combo[0]].state == playerSymbol && squares[combo[2]].state == playerSymbol && squares[combo[1]].state == "blank") {
                    return combo[1];
                }
                else if (squares[combo[1]].state == playerSymbol && squares[combo[2]].state == playerSymbol && squares[combo[0]].state == "blank") {
                    return combo[0];
                }
            }
        }
        return easyComputer();
    }
}