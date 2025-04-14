    const board = document.getElementById('board');
    const status = document.getElementById('status');
    let currentPlayer = 'X';
    let gameActive = true;
    let cells = Array(9).fill(null);

    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    function createBoard() {
      board.innerHTML = '';
      cells = Array(9).fill(null);
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleMove);
        board.appendChild(cell);
      }
      currentPlayer = 'X';
      status.textContent = `Player ${currentPlayer}'s turn`;
      gameActive = true;
    }

    function handleMove(e) {
      const index = e.target.dataset.index;
      if (!gameActive || cells[index]) return;

      cells[index] = currentPlayer;
      e.target.textContent = currentPlayer;

      if (checkWin()) {
        status.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
      }

      if (cells.every(cell => cell)) {
        status.textContent = "It's a tie!";
        gameActive = false;
        return;
      }

      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = `Player ${currentPlayer}'s turn`;
    }

    function checkWin() {
      return winConditions.some(combination => {
        const [a, b, c] = combination;
        return (
          cells[a] &&
          cells[a] === cells[b] &&
          cells[a] === cells[c]
        );
      });
    }

    function resetGame() {
      createBoard();
    }

    function setLightTheme() {
      document.body.classList.add('light-theme');
    }

    function setDarkTheme() {
      document.body.classList.remove('light-theme');
    }

    createBoard();