import { createEmptyBoard, isTileEmpty, setTileValue, findWinner, countPendingMoves, renderBoard } from './game.js'

let nextTurn, waiting
const boardStates = []

const replayButton = document.querySelector('button')
const gameBoard = document.querySelector('#game')
const body = document.querySelector('body')

function setGamePlayingState() {
    replayButton.style.display = 'none'
    gameBoard.classList.remove('no-click')
    nextTurn = 'x'
    boardStates.push(createEmptyBoard())
    refreshBoard()
    waiting = false
}

function setGameWaitingState() {
    replayButton.style.display = 'block'
    gameBoard.classList.add('no-click')
    waiting = true
}

function refreshBoard() {
    gameBoard.innerHTML = renderBoard(boardStates.at(-1))
}

function markWinnerMoves(cells) {
    for (const cell of cells) {
        const [x, y] = cell
        const element = gameBoard.querySelector(`span[data-row="${x}"][data-col="${y}"]`)
        element.classList.add('highlighted')
    }
}

function playTurn(row, col) {
    if (waiting === false && row && col) {
        if (isTileEmpty(boardStates.at(-1), row, col) === true) {
            const updatedBoard = setTileValue(boardStates.at(-1), row, col, nextTurn)
            boardStates.push(updatedBoard)
            refreshBoard()
            nextTurn = nextTurn === 'x' ? 'o' : 'x'
            const winner = findWinner(boardStates.at(-1))
            const noMovesLeft = countPendingMoves(boardStates.at(-1)) === 0
            if (winner !== false) {
                markWinnerMoves(winner.cells)
                setTimeout(() => alert("The winner is " + winner.value), 50)
            }
            if (winner !== false || noMovesLeft) {
                setGameWaitingState()
            }
        }
    }
}

body.addEventListener('click', (event) => {
    const { row, col } = event.target.dataset
    playTurn(row, col)
})

replayButton.addEventListener('click', setGamePlayingState)

setGamePlayingState()