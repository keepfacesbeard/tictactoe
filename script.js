let playerSymbol = "X";
let turnCount = 0
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
       let square = document.createElement('div');
       square.classList.add('gamesquare');
       square.id = `square${i}`;
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
                clickedsquare.innerText = "X";
            }
            else if (playerSymbol == "O") {
                squares[index].markY();
                clickedsquare.innerText = "Y";
            }
        }
        ++turnCount;
        checkVictory();
        if ( gameOn == true) {
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

function easyComputer(){
    let rando = Math.random();
    let num = parseInt(rando.toString()[2]);
    if ( num == 9 ){
        computerChoice();
    }
    else if ( squares[num].state == "blank" ) {
        return num;
    }
    else {
        computerChoice();
    }
};

// function hardComputer() {
//     console.log(previousMove);
//     if (squares[4].state == "blank"){
//         return 4;
//     }
//     else {
//         if (previousMove == 0 || previousMove == 3 || previousMove == 6) {
//             if (squares[previousMove+1].state == playerSymbol){
//                 if (squares[previousMove+2].state == 'blank'){
//                     return previousMove+2;
//                 }
//             }
//             else if (squares[previousMove+2] == playerSymbol){
//                 if (squares[previousMove+1].state == 'blank'){
//                     return previousMove+1;
//                 }
//             }
//         else if (previousMove == 1 || previousMove == 4 || previousMove ==7){
//             if (squares[previousMove+1].state == playerSymbol){
//                 if (squares[previousMove-1].state == 'blank'){
//                     return previousMove-1;
//                 }
//             }
//             else if (squares[previousMove-1].state == playerSymbol){
//                 if (squares[previousMove+1].state == 'blank'){
//                     return previousMove+1;
//                 }
//             }
//             else {
//                 return easyComputer();
//             }
//         }
//         else if (previousMove == 2 || previousMove == 5 || previousMove ==8){
//             if (squares[previousMove-1].state == playerSymbol){
//                 if (squares[previousMove-2].state == 'blank'){
//                     return previousMove-2;
//                 }
//             }
//             else if (squares[previousMove-2].state == playerSymbol){
//                 if (squares[previousMove+1].state == 'blank'){
//                     return previousMove-1;
//                 }
//             }
//             else {
//                 return easyComputer()
//             }
//         }

//         else {
//             playerMove = previousMove
//             let danger1 = 3;
//             let danger2 = 6;
//             if (previousMove + danger1 > 8 || previousMove + danger2 > 8) {
//                 playerMove -= 9;
//             }
//             if (squares[playerMove+danger1].state == playerSymbol){
//                 if (squares[playerMove+danger2].state == 'blank'){
//                     return playerMove+danger2;
//                     }
//             }
//             else if (squares[playerMove+danger2].state == playerSymbol){
//                 if (squares[playerMove+danger1].state == 'blank'){
//                     return playerMove+danger1;
//                     }
//             }
//             else {
//                 return easyComputer();
//             }
//         }
//     }

// }
// }

// function hardComputer() {
//     //gottta grab that center square if available
//     if (squares[4].state == "blank"){
//         console.log("hardcomp num choice: center square!")
//         return 4;
//     }
//     else {
//         console.log('no center available');
//         for (let i = 0; i<9; i++){
//             if (i<8 && squares[i].state == playerSymbol && squares[i+1].state == playerSymbol) {
//                 if (i == 0 || i == 3 || i == 6) {
//                     let num = i+2;
//                     if (squares[num].state == "blank") {
//                         return num;  
//                     }
//                 }
//             else if (i < 7 && squares[i].state == playerSymbol && squares[i+2].state == playerSymbol){
//                 if (i == 0 || i == 3 || i == 6) {
//                     let num = i+1;
//                     if (squares[num].state == "blank") {
//                         return num;  
//                     }
//                 }
//                 }
//             }
//             else {
//                 if (i < 6 && squares[i].state == playerSymbol && squares[i+3].state == playerSymbol){
//                     let num = i+6;
//                     if (num > 8) {
//                         num -= 9
//                     }
//                     if (squares[num].state == "blank"){
//                         return num;  
//                     }
//                 }
//                 else if (i < 3 && squares[i].state == playerSymbol && squares[i+6].state == playerSymbol){
//                     let num = i+3;
//                     if (num > 8) {
//                         num -= 9
//                     }
//                     if (squares[num].state == "blank"){
//                         return num;  
//                     }
//                 }
//                 else {
//                     return easyComputer();
//                 }
//             }
//         }
//     }
// }
 





















function computerTurn () {
    let index = computerChoice();
    console.log('the returned index is: ' + index)
    if (squares[index] !== undefined) {
        console.log('computer chooses square: ' + index)
        if (gameOn == true){   
            if (playerSymbol == "X") {
                squares[index].markY();
                document.getElementById(`square${index}`).innerText = "Y";
            }
            else if (playerSymbol == "O") {
                squares[index].markX();
                document.getElementById(`square${index}`).innerText = "X";
            }
        }
        checkVictory();
    }
    else {
        console.log('some kind of computer input error happening')
       // computerTurn();
    }
}



function checkVictory (){
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
    for (const combo of winningCombos){
        if (squares[combo[0]].state != "blank") {
            if ( squares[combo[0]].state == squares[combo[1]].state && squares[combo[1]].state == squares[combo[2]].state ) {
                    declareVictory(squares[combo[0]].state);
                    console.log("the victor is: " + squares[combo[0]].state);
                }
        }  
    }
    if (gameOn == true) {
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

function turnOffBoard() {
    console.log('turning off board');
    gameboard.removeEventListener('click', function(event){
        playerTurn(event.target);
    })
}

function resetBoard() {
    for (let i=0; i<9; i++){
        squares[i].reset();
        document.getElementById(`square${i}`).innerText = " "
    }
    turnCount = 0;
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
