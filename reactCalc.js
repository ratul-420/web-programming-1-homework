function Calculator() {
  const [a, setA] = React.useState("");  // State for input 'A'
  const [b, setB] = React.useState("");  // State for input 'B'
  const [result, setResult] = React.useState(null);  // State for the result

  return (
    <div>
      <h3>Calculator</h3>
      {/* Input field for A */}
      <input 
        value={a} 
        onChange={e => setA(e.target.value)} 
        placeholder="A" 
        type="number" 
      />
      {/* Input field for B */}
      <input 
        value={b} 
        onChange={e => setB(e.target.value)} 
        placeholder="B" 
        type="number" 
      />
      {/* Button to add A and B */}
      <button onClick={() => setResult(Number(a) + Number(b))}>Add</button>
      {/* Display the result */}
      <div>Result: {result}</div>
    </div>
  );
}
