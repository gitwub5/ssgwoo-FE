import { useState } from "react";
import { useTranslation } from "react-i18next";

export function NumberGuessGame() {
  const { t } = useTranslation();
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
      setMessage(t('gamePage.numberGuess.correct', { count: count + 1 }));
    } else if (guess < answer) {
      setMessage(t('gamePage.numberGuess.up'));
    } else {
      setMessage(t('gamePage.numberGuess.down'));
    }
    setInput("");
  };

  return (
    <div className="bg-white rounded shadow p-6 max-w-md mx-auto mt-0">
      <h1 className="text-2xl font-bold mb-4">{t('gamePage.numberGuess.title')}</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="number"
          min={1}
          max={100}
          value={input}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-32"
          placeholder={t('gamePage.numberGuess.inputPlaceholder')}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          {t('gamePage.numberGuess.submit')}
        </button>
      </form>
      <div className="text-lg">{message}</div>
    </div>
  );
} 