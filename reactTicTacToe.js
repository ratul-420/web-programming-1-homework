function TicTacToe() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));  // Array to track the state of each square
  const [xIsNext, setXIsNext] = React.useState(true);  // Boolean to track if 'X' or 'O' is the next player

  // Function to handle the square click
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;  // If the square is already filled or the game is won, do nothing
    const next = squares.slice();  // Create a copy of the current squares state
    next[i] = xIsNext ? "X" : "O";  // Set the value of the clicked square based on the current player ('X' or 'O')
    setSquares(next);  // Update the squares state
    setXIsNext(!xIsNext);  // Toggle the player for the next turn
  }

  // Function to render each square as a button
  function renderSquare(i) {
    return (
      <button onClick={() => handleClick(i)} style={{ width: 40, height: 40 }}>
        {squares[i]}  {/* Display the value of the square ('X' or 'O') */}
      </button>
    );
  }

  // Check if there's a winner
  const winner = calculateWinner(squares);
  let status = winner ? "Winner: " + winner : "Next: " + (xIsNext ? "X" : "O");  // Display the status message

  return (
    <div>
      <h3>Tic-Tac-Toe</h3>
      <div>{status}</div>
      <div>
        {[0, 1, 2].map(r => (
          <div key={r}>
            {renderSquare(r * 3)}{renderSquare(r * 3 + 1)}{renderSquare(r * 3 + 2)}  {/* Render each row */}
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper function to calculate the winner
function calculateWinner(sq) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
  ];
  
  // Check all the lines for a winning combination
  for (let [a, b, c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) return sq[a];  // If all three positions match, return the winner ('X' or 'O')
  }
  
  return null;  // No winner found
}
