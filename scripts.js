const gameBoard = {
    cacheDom() {
        this.cellElements = document.querySelectorAll('[data-cell]')
        this.board = document.getElementById('board')
        this.winningMessageText = document.querySelector('[data-winning-message-text]')
        this.winningMessageDiv = document.getElementById('winningMessage')
        this.restartButton = document.getElementById('restartButton')
    }

}

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

const X = 'x'
const O = 'o'
let circleTurn

const gameObject = {

    startGame() {
        circleTurn = false
        gameBoard.cellElements.forEach(cell => {
            cell.classList.remove(X)
            cell.classList.remove(O)
            cell.removeEventListener('click',gameObject.handleClick)
            cell.addEventListener('click', gameObject.handleClick, { once: true })
        })
        gameBoard.winningMessageDiv.classList.remove('show')
    },

    handleClick(e) {
        const cell = e.target
        const currentClass = circleTurn ? O : X
        gameObject.placeMark(cell, currentClass)
        if(gameObject.checkWin(currentClass)) {
            gameObject.endGame(false)
        } else if (gameObject.isDraw()) {
            gameObject.endGame(true)
        }
        gameObject.switchTurns()
    },

    endGame(draw) {
        if (draw) {
            gameBoard.winningMessageText.innerText = "Draw!"
        } else {
            gameBoard.winningMessageText.innerText = `${circleTurn ? "O" : "X"} Wins!`
        }
        gameBoard.winningMessageDiv.classList.add('show')
        gameObject.restart()
    },

    isDraw() {
        return [...gameBoard.cellElements].every(cell => {
            return cell.classList.contains(X) ||
            cell.classList.contains(O) 
        })
    },

    placeMark(cell, currentClass) {
        cell.classList.add(currentClass)
    },

    switchTurns() {
        circleTurn = !circleTurn
    },

    checkWin(currentClass) {
        return wins.some(combo => {
             return combo.every(index => {
                 return gameBoard.cellElements[index].classList.contains(currentClass)
             })
         })
     },

    restart(){
        restartButton.addEventListener('click', gameBoard.cacheDom)
        restartButton.addEventListener('click', gameObject.startGame)
    }
}

gameBoard.cacheDom()
gameObject.startGame()
