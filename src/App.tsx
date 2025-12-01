import { useState } from 'react'
import './App.css'

import {
  capitalize,
  getAlpha2Code,
  countryListLookup,
  getResponse,
} from "./language_spoken.test"; // <-- Correct import path for the source file (language_spoken.ts)


export default function App() {
  const [language, setLanguage] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setResult("");
    setError("");

    try {
      const alpha2Code = getAlpha2Code(capitalize(language));
      if (!alpha2Code) {
        throw new Error("Invalid language code");
      }
      const languageList = await countryListLookup(alpha2Code);
      if (!languageList || languageList.length === 0) {
        throw new Error("No countries found");
      }
      
      const response = getResponse(language, languageList);
      setResult(response);
      
    } catch (err) {
      setError(`We could not find ${language}. Please check spelling and try again.`);
    }
  };

  return (
     <div className="app-container">
      <div className="card">
        <h2 className="title">🌍 Language Spoken Lookup</h2>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            className="input"
            placeholder="Enter a language..."
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <button type="submit" className="btn">
            Search
          </button>
        </form>

        {result && <p className="success">{result}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}