function TicTacToe() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = React.useState(true);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const next = squares.slice();
    next[i] = xIsNext ? "X" : "O";
    setSquares(next);
    setXIsNext(!xIsNext);
  }

  function renderSquare(i) {
    return (
      <button onClick={() => handleClick(i)} style={{ width: 40, height: 40 }}>
        {squares[i]}
      </button>
    );
  }

  const winner = calculateWinner(squares);
  let status = winner ? "Winner: " + winner : "Next: " + (xIsNext ? "X" : "O");

  return (
    <div>
      <h3>Tic-Tac-Toe</h3>
      <div>{status}</div>
      <div>
        {[0, 1, 2].map(r => (
          <div key={r}>
            {renderSquare(r * 3)}
            {renderSquare(r * 3 + 1)}
            {renderSquare(r * 3 + 2)}
          </div>
        ))}
      </div>
    </div>
  );
}

function calculateWinner(sq) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let [a, b, c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) return sq[a];
  }
  return null;
}