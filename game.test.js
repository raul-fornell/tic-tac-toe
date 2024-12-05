import * as game from "./game.js"

const emptyBoard = game.createEmptyBoard()

const empty = game.isTileEmpty(emptyBoard, 0, 0)
if (empty !== true) throw new Error('isTileEmpty should return true for tile 0,0')

const boardWithValueAdded = game.setTileValue(emptyBoard, 0, 0, 'x')
if (boardWithValueAdded[0][0] !== 'x') throw new Error('setTileValue should return board modified with x in the position 0,0')

if (emptyBoard[0][0] === 'x') throw new Error('setTileValue should not modify the source board')

const allMovesPending = game.countPendingMoves(emptyBoard)
if (allMovesPending !== 9) throw new Error('countPendingMoves should return 9 for an empty board')

const someMovesPendingBoard = game.setTileValue(emptyBoard, 1, 1, 'x')
const someMovesPending = game.countPendingMoves(someMovesPendingBoard)
if (someMovesPending !== 8) throw new Error('countPendingMoves should return 8 for a board modified')

const completeBoard = [['x', 'x', 'x'], ['x', 'x', 'x'], ['x', 'x', 'x']]
const noPendingMoves = game.countPendingMoves(completeBoard)
if (noPendingMoves !== 0) throw new Error('countPendingMoves should return 0 for a board completed')

const boardWithWinnerRow = [['x', 'o', 'x'], ['x', 'x', 'x'], ['o', 'x', 'o']]
const winnerIsX = game.findWinner(boardWithWinnerRow)
if (winnerIsX.value !== 'x') throw new Error('findWinner should return x that won the second row')

const boardWithWinnerCol = [['o', 'x', ''], ['o', '', 'x'], ['o', 'x', '']]
const winnerIsO = game.findWinner(boardWithWinnerCol)
if (winnerIsO.value !== 'o') throw new Error('findWinner should return o that won the first col')

const boardWithWinnerDiagonal = [['o', 'x', ''], ['o', 'o', 'x'], ['o', 'x', 'o']]
const winnerIsDiagonalO = game.findWinner(boardWithWinnerDiagonal)
if (winnerIsDiagonalO.value !== 'o') throw new Error('findWinner should return o that won the diagonal')

const boardWithoutWinner = [['x', 'o', 'x'], ['x', 'x', 'o'], ['o', 'x', 'o']]
const noWinner = game.findWinner(boardWithoutWinner)
if (noWinner !== false) throw new Error('findWinner should return false when no winners yet')

console.log('✓ All tests passed')
