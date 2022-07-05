const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageText = document.querySelector('[data-winning-message-text]')
const winningMessageDiv = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const X = 'x'
const O = 'o'
const wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
]

restartButton.addEventListener('click', startGame)

let circleTurn

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X)
        cell.classList.remove(O)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    winningMessageDiv.classList.remove('show')
}

startGame()


function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? O : X
    placeMark(cell, currentClass)
    if(checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    }
    switchTurns()
}

function endGame(draw) {
    if (draw) {
        winningMessageText.innerText = "Draw!"
    } else {
        winningMessageText.innerText = `${circleTurn ? "O" : "X"} Wins!`
    }
    winningMessageDiv.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X) ||
        cell.classList.contains(O) 
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function switchTurns() {
    circleTurn = !circleTurn
}

function checkWin(currentClass) {
   return wins.some(combo => {
        return combo.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

