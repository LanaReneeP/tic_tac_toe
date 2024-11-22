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

        this.getPlayerNames()
        this.currentPlayerTurn()
        this.handleCellClicked() 
        this.gameRestartBtn.addEventListener('click', ()=> {
            this.restartGame()
        })
    }

    // meaaage
    currentPlayerTurn() {
        const message = `this ${this.currentPlayer}' turn`;
        return this.gameStatus.innerText = message
    }

    drawMessage() {
        const message = `Game ened in a draw`;
        return this.gameStatus.innerText = message;
    }

    winMessage() {
        const message = `Player ${this.currentPlayer} has won!`;
        return this.gameStatus.innerText = message;
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
        if (gameWon) {
            const tallyMark = 'x';
            this.winMessage();
            const winner = this.currentPlayer;

            if (winner == 'X') {
                this.winCount.X = this.winCount.X + 1;
                this.xWins.innerHTML += `<span class="tally"> ${tallyMark}</span>`
            } else {
                this.winCount.O = this.winCount.O + 1;
                this.oWins.innerHTML += `<span class="tally"> ${tallyMark}</span>`
            }

            this.checkWinCount()
            this.gameActive = false;
            return;
        }

        const roundDraw = !this.gameState.includes('');
        if (roundDraw) {
            this.drawMessage();
            this.gameActive = false;
            return;
        }

        // method to change player
        this.playerChange();
    }

    playerChange() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.currentPlayerTurn();
    }

    restartGame() {
        this.gameActive = true;
        this.currentPlayer = 'X';
        this.gameState = [
            "", "", "",
            "", "", "",
            "", "", ""
        ];
        this.currentPlayerTurn();
        document.querySelectorAll('.cell').forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('blue');
        })
    }

    getPlayerNames() {
        const submitBtn = this.submitBtn;
        const playerOne = this.playerOne;
        const playerTwo = this.playerTwo;

        submitBtn.addEventListener("click", (e)=> {
            e.preventDefault();
            const player1Name = document.getElementById('player1').value;
            const player2Name = document.getElementById('player2').value;

            this.players.player1 = player1Name;
            this.players.player2 = player2Name;

            playerOne.innerText = this.players.player1;
            playerTwo.innerText = this.players.player2;
        })
    }

    checkWinCount() {
        let xWinTotal = this.winCount.X;
        let oWinTotal = this.winCount.O;

        if (xWinTotal == 3) {
            this.gameStatus.innerText = `${this.players.player1} is the SUPREME VICTOR!`;
            document.getElementById('xWins'); 
            this.gameReload();
        } else if (oWinTotal == 3) {
            this.gameStatus.innerText = `${this.players.player2} is the SUPREME VICTOR!`;
            document.getElementById('oWins'); 
            this.gameReload();
        } else {
            return;
        }

        this.gameActive = false;
    }

    gameReload() {
        setTimeout(() => {
            this.restartGame()
            this.xWins.innerHTML = "";
            this.oWins.innerHTML = "";
            this.playerOne.innerText = "Player 1";
            this.playerTwo.innerText = "Player 2";
            this.winCount.X = 0;
            this.winCount.O = 0;
            document.getElementById('player1').value = '';
            document.getElementById('player2').value = '';
            document.getElementById('xWins').style.backgroundImage="none"; 
            document.getElementById('oWins').style.backgroundImage="none"; 
        }, 3000);
    }
}



const action = new Game()

action.init()
