import { useState } from "react";

function generateAnswer() {
  const digits: number[] = [];
  while (digits.length < 3) {
    const n = Math.floor(Math.random() * 9) + 1;
    if (!digits.includes(n)) digits.push(n);
  }
  return digits;
}

function checkGuess(answer: number[], guess: number[]): { strike: number; ball: number } {
  let strike = 0, ball = 0;
  for (let i = 0; i < 3; i++) {
    if (guess[i] === answer[i]) strike++;
    else if (answer.includes(guess[i])) ball++;
  }
  return { strike, ball };
}

function DotRow({ label, count, color, max = 3 }: { label: string; count: number; color: string; max?: number }) {
  // count만큼 색상, 나머지는 흰색
  return (
    <div className="flex items-center gap-2 mb-1">
      <span className="font-mono text-lg font-extrabold text-white w-4 text-right drop-shadow" style={{letterSpacing:'0.1em'}}>{label}</span>
      {[...Array(max)].map((_, i) => (
        <span
          key={i}
          className={`inline-block w-6 h-6 rounded-full shadow ${i < count ? color : 'bg-white'}`}
          style={{ border: '2px solid #222' }}
        />
      ))}
    </div>
  )
}

export function NumberBaseballGame() {
  const [answer] = useState(() => generateAnswer());
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ guess: string; result: string; strike: number; ball: number }[]>([]);
  const [message, setMessage] = useState("");
  const [finished, setFinished] = useState(false);
  const [currentSB, setCurrentSB] = useState<{ strike: number; ball: number }>({ strike: 0, ball: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.length !== 3 || new Set(input).size !== 3 || /[^1-9]/.test(input)) {
      setMessage("1~9까지 서로 다른 숫자 3자리를 입력하세요.");
      return;
    }
    const guess = input.split("").map(Number);
    const { strike, ball } = checkGuess(answer, guess);
    setCurrentSB({ strike, ball });
    const result = `${strike}S ${ball}B`;
    setHistory((h) => [...h, { guess: input, result, strike, ball }]);
    setInput("");
    setMessage("");
    if (strike === 3) {
      setMessage(`정답! 축하합니다! (정답: ${answer.join("")})`);
      setFinished(true);
    }
  };

  const handleRestart = () => {
    window.location.reload();
  };

  // O(아웃)은 3 - (스트라이크+볼)
  const outCount = 3 - (currentSB.strike + currentSB.ball);

  return (
    <div className="bg-white rounded shadow p-6 max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">숫자야구 게임</h1>
      {/* 전광판 부분 */}
      <div className="flex justify-center mb-8">
        <div className="bg-black border-2 border-white rounded-xl px-8 py-4 flex flex-col gap-1 items-center">
          <DotRow label="S" count={currentSB.strike} color="bg-yellow-300" />
          <DotRow label="B" count={currentSB.ball} color="bg-green-500" />
          <DotRow label="O" count={outCount} color="bg-red-500" />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4" autoComplete="off">
        <input
          type="text"
          maxLength={3}
          value={input}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-32"
          placeholder="예: 123"
          disabled={finished}
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition" disabled={finished}>
          확인
        </button>
      </form>
      {message && <div className="mb-2 text-lg font-semibold text-blue-400">{message}</div>}
      <ul className="mb-2">
        {history.map((h, i) => (
          <li key={i} className="text-gray-800">{h.guess} - {h.result}</li>
        ))}
      </ul>
      {finished && (
        <button onClick={handleRestart} className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">다시 시작</button>
      )}
    </div>
  );
} 