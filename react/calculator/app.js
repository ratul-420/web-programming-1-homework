function Calculator() {
  const [a, setA] = React.useState("");
  const [b, setB] = React.useState("");
  const [result, setResult] = React.useState(null);

  return (
    <div>
      <h3>Calculator</h3>
      <input
        value={a}
        onChange={e => setA(e.target.value)}
        placeholder="A"
        type="number"
      />
      <input
        value={b}
        onChange={e => setB(e.target.value)}
        placeholder="B"
        type="number"
      />
      <button onClick={() => setResult(Number(a) + Number(b))}>Add</button>
      <div>Result: {result !== null ? result : ""}</div>
    </div>
  );
}