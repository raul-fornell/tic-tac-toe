export function createEmptyBoard() {
    return [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]
}

export function isTileEmpty(board, row, col) {
    return board[row][col] === ''
}

export function setTileValue(board, row, col, value) {
    const boardCopy = structuredClone(board)
    boardCopy[row][col] = value
    return boardCopy
}

export function findWinner(board) {
    for (let i = 0; i < board.length; i++) {
        if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            return {
                value: board[0][i],
                cells: [[0, i], [1, i], [2, i]] // cols |
            }
        }
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return {
                value: board[i][0],
                cells: [[i, 0], [i, 1], [i, 2]] // rows -
            }
        }
    }
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return {
            value: board[0][0],
            cells: [[0, 0], [1, 1], [2, 2]] // diagonal \
        }
    }
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return {
            value: board[0][2],
            cells: [[0, 2], [1, 1], [2, 0]] // diagonal /
        }
    }
    return false
}

export function countPendingMoves(board) {
    let count = 0
    for (let row of board) {
        for (let col of row) {
            count += col === '' ? 1 : 0
        }
    }
    return count
}

export function renderBoard(board) {
    let response = ''
    for (let row in board) {
        for (let col in board[row]) {
            response += `<span data-row="${row}" data-col="${col}">${board[row][col]}</span>`
        }
    }
    return response
}