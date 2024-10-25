const X_CLASS = 'x'
const O_CLASS = 'circle'
const winningMessageElement= document.getElementById('winningMessage')
const cellElements = document.querySelectorAll('[data-cell]')
const board= document.getElementById('board')
const winningMessageTextElement= document.querySelector('[date-winning-message-text]')
const WINNING_comb=[
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[0,4,8],[2,4,6]
]

let OTurn
let XTurn

startGame()
function startGame(){
    OTurn=false
    cellElements.forEach(cell=> {
        cell.addEventListener('click',handleClick,{once:true})
    })
    setBoardHoverClass()

}

function handleClick(e){
    console.log('clickked')
    const cell = e.target
    const currentClass= OTurn ? O_CLASS : X_CLASS
    placeMark(cell,currentClass)
    //place the mark

    if(checkwin(currentClass)){
        console.log('winner')
        endgame(false) 
    }
    else if(isDraw()){
        endgame(true)
    }

    //check for win or Draw
    //change turn

    swapTurns()
    setBoardHoverClass()
}

function placeMark(cell,currentClass){
cell.classList.add(currentClass)
}
function endgame(draw){
        if (draw){
            winningMessageTextElement.innerText=   'Draw'
        }else{
            winningMessageTextElement.innerText =`${OTurn ? "O WON" : "X WON"} good job`
        }
        winningMessageElement.add('show')
}
function swapTurns(){
    OTurn=!OTurn
}
function isDraw(){
return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
})
}
function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if (OTurn) {
        board.classList.add(O_CLASS)

    }
    else {board.classList.add(X_CLASS)}

}
function checkwin(currentClass){
    return WINNING_comb.some(combination=>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}