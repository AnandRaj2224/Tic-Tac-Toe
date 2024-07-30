function gameBoard()
{
  const rows = 3;
  const columns = 3;
  const board = [];
  let gameOver = false;

  for(let i = 0;i<rows ; i++)
  {
    board[i] = [];
    for(let j = 0;j<columns;j++)
    {
      board[i].push(cell());
      
    }
  }

  function cell(){
    const value = '';
    return {value};
  }
  function printBoard() {
    for (let i = 0; i < rows; i++) {
      let rowString = ''; // Initialize an empty string for the row
      for (let j = 0; j < columns; j++) {
        rowString += board[i][j].value; // Append the cell's value to the row string
        if (j < columns - 1) rowString += ' | '; // Add a separator between columns
      }
      console.log(rowString); // Print the row
      if (i < rows - 1) console.log('---------'); // Add a separator between rows
    }
    console.log('\n');
  }

  function makeMove(row,column,player)
  {
    if(gameOver === true)
    {
      return;
    }
    if(row >= 0 && column >= 0)
    {
      if(board[row][column].value === '')
        {
        board[row][column].value = player;

        const cellId = `cell-${row}-${column}`;
        const cellElement = document.getElementById(cellId);
        cellElement.textContent = player;
        printBoard();
        if(checkWin())
          {
            gameOver = true;
            let result = document.querySelector('#result');
            result.textContent =`"${currentPlayer}" won the game!!!`;
            return;
          }
        if(checkDraw())
        {
          gameOver = true;
          result.textContent ='the game is a draw';
        }
        switchPlayer();
        }
      else
        {
        console.log('the cell is already occupied choose another!');
        return;
        }
   }
   else{
    console.log('invalid cell please choose a valid cell!');
   }
  }

let currentPlayer = 'x';
function switchPlayer(){
  currentPlayer === 'x'? currentPlayer = 'o' : currentPlayer = 'x';
  return currentPlayer;
}
function checkWin()
{
  for(let k = 0 ;k<rows;k++)
  {
    // for rows check
    if(board[k][0].value === currentPlayer &&
       board[k][1].value === currentPlayer &&
       board[k][2].value === currentPlayer
      )
      {
        return true;
      }
      // for columns
      if(board[0][k].value === currentPlayer &&
         board[1][k].value === currentPlayer &&
         board[2][k].value === currentPlayer
       )
       {
         return true;
       }
       // diagonal 1
       if(board[0][0].value === currentPlayer &&
          board[1][1].value === currentPlayer &&
          board[2][2].value === currentPlayer)
          {
            return true;
          }
          // diagnal 2
        if(board[0][2].value === currentPlayer &&
           board[1][1].value === currentPlayer &&
           board[2][0].value === currentPlayer)
           {
            return true;
           }
    return false;
  } 
}

function checkDraw()
{
  for(let i =0 ; i<rows;i++)
  {
    for(let k = 0; k<columns;k++)
    {
      if(board[i][k].value === '')
      {
        return false;
      }
    }
  }
  return true;
}
function handleCellClick(event) {
  const [row, column] = event.target.id.split('-').slice(1).map(Number);
  makeMove(row, column, currentPlayer);
}

// Add event listeners to all cells
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    const cellId = `cell-${i}-${j}`;
    const cellElement = document.getElementById(cellId);
    cellElement.addEventListener('click', handleCellClick);
  }
}

const resetButton = document.querySelector('#resetButton');
resetButton.addEventListener('click',reset);
let cells = document.querySelectorAll('.cells');
function reset() {
  for (let i = 0; i < rows; i++) {
    for (let k = 0; k < columns; k++) {
      board[i][k].value = '';
      const cellId = `cell-${i}-${k}`;
      const cellElement = document.getElementById(cellId);
      cellElement.textContent = ''; // Reset individual cell content
    }
  }
  gameOver = false;
  const result = document.querySelector('#result');
  result.textContent = ''; // Clear result message
}
}
gameBoard();
