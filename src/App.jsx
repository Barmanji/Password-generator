import { useState, useCallback, useRef, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [length, setLength] = useState(8);
  const [character, setCharacter] = useState(false);
  const [number, setNumber] = useState(false);
  const [pass, setPass] = useState('');
  const [color, setColor] = useState(' #2b2a33 ');
  const [copyMessage, setCopyMessage] = useState("");

  const passwordRef = useRef(null);

  const passGenerate = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (number) str += '0123456789';
    if (character) str += '!@#$%^&*-_+=[]{}~`';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPass(pass); // Update the password state
  }, [length, number, character]);

  const copyPass = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(pass); 
    setCopyMessage("Password copied!");
  }, [pass]);

  useEffect(() => {
    passGenerate(); // Generate a new password whenever length/number/character changes
  }, [length, number, character, passGenerate]);

  return (
    <div
      className="w-full h-screen flex flex-col items-center text-3xl"
      style={{ backgroundColor: color }}
    >
      <h1 className="text-white text-center my-3 text-gray-400">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={pass}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPass}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >
          Copy
        </button>
      </div>
      {copyMessage && (
        <p className="text-green-500 text-center mb-4">{copyMessage}</p>
      )}

      <div className="flex text-sm gap-x-2 text-zinc-400 text-2xl">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={number}
            id="numberInput"
            onChange={() => setNumber((prev) => !prev)}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={character}
            id="charInput"
            onChange={() => setCharacter((prev) => !prev)}
          />
          <label htmlFor="charInput">Special Characters</label>
        </div>
      </div>

      {/* Color buttons */}
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
          {['red', 'green', 'blue', 'lavender', 'orange', 'white', 'maroon', 'purple', 'magenta', 'cyan', 'black'].map((col) => (
            <button
              key={col}
              onClick={() => setColor(col)}
              className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
              style={{ backgroundColor: col, color: col === 'white' ? 'black' : 'white' }}
            >
              {col.charAt(0).toUpperCase() + col.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
