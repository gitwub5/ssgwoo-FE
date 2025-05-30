import { useState } from "react";

export function NumberGuessGame() {
  const [answer] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const guess = Number(input);
    setCount((c) => c + 1);
    if (guess === answer) {
      setMessage(`정답입니다! 시도 횟수: ${count + 1}`);
    } else if (guess < answer) {
      setMessage("UP");
    } else {
      setMessage("DOWN");
    }
    setInput("");
  };

  return (
    <div className="bg-white rounded shadow p-6 max-w-md mx-auto mt-0">
      <h1 className="text-2xl font-bold mb-4">숫자 맞추기 게임</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="number"
          min={1}
          max={100}
          value={input}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-32"
          placeholder="1~100"
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          확인
        </button>
      </form>
      <div className="text-lg">{message}</div>
    </div>
  );
} 