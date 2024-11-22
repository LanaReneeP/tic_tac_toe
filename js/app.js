class Game {
    // 1 build the constructor 

    constructor() {
        // 1a access DOM elements
        this.gameRestartBtn = document.getElementById('gameRestart')
        this.submitBtn = document.getElementById('submitBtn')
        this.gameStatus = document.getElementById('gameStatus')
        this.gameActive = true
        this.currentPlayer = 'X'
        this.xWins = document.getElementById('xWins')
        this.oWins = document.getElementById('oWins')
        this.playerOne = document.getElementById('playerOne')
        this.playerTwo = document.getElementById('playerTwo')

        // 1b set winCount
        this.winCount = {
            X: 0,
            O: 0 
        }

        // 1c set gameState 
        this.gameState = [
            '', '', '',
            '', '', '',
            '', '', ''
        ]

        // 1d set winningConditions
        this.winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 5, 6]
        ]

        // 1e set players
        this.players = {
            player1: 'Player 1',
            player2: 'Player 2'
        }
    }

    // 2 initilizer
    init() {
        // setting player text
        this.playerOne.innerText = this.players.player1
        this.playerTwo.innerText = this.players.player2

        this.handleCellClicked()
    }

    // 3 handle clicked cell
    handleCellClicked() {
        // grab cell
        const cells = document.querySelectorAll('.cell')

        cells.forEach(cell => {
            const cellIdx = parseInt(cell.getAttribute('data-cell-index'))
            // if the cell index is not an empty string or if gameActive is false...
            cell.addEventListener('click', ()=> {
                // console.log(cellIdx);
                if (this.gameState[cellIdx] != '' || !this.gameActive) {
                    return
                }

                this.handleCellPlayed(cell, cellIdx)
                this.resultValidation()
            })
        })
    }

    // 4 handle cell played 
    handleCellPlayed(cell, idx) {
        //console.log(cell, idx);
        this.gameState[idx] = this.currentPlayer

        //IMPARATIVE
        this.currentPlayer == 'X' ? cell.classList.add('pink') : 
        cell.classList.add('purple')


        // DECLARITIVE
        //
        // if (this.currentPlayer == 'X') {
        //     cell.classList.add('pink')
        // } else {
        //     cell.classList.add('purple')
        // }
        cell.innerText = this.currentPlayer
    }

    // 5 resultValidation
    resultValidation() {
        let gameWon = false

        for (let i = 0; i <= 7; i++) {
            const win = this.winningConditions[i]
            // i = 0 => win == [0, 1, 3]

            let a = this.gameState[win[0]]
            let b = this.gameState[win[1]]
            let c = this.gameState[win[2]]

            if ( a =='' || b == '' || c == '') {
                continue
            }

            if (a == b && b == c) {
                gameWon = true
                break
            }
        }

        // pick up here if(gameWon)
    }

}

const action = new Game()

action.init()
