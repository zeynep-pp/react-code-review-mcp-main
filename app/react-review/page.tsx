import React, { useState } from 'react';
import { analyzeReactCode, ReactCodeReviewResult } from '../../tools/react-code-review';

export default function ReactReviewPage() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState<ReactCodeReviewResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const analysis = await analyzeReactCode(code);
    setResult(analysis);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24 }}>
      <h1>React Code Review</h1>
      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        rows={12}
        style={{ width: '100%', fontFamily: 'monospace', fontSize: 16, marginBottom: 16 }}
        placeholder="Paste your React code here..."
      />
      <br />
      <button onClick={handleAnalyze} disabled={loading || !code.trim()} style={{ padding: '8px 24px', fontSize: 16 }}>
        {loading ? 'Analyzing...' : 'Review'}
      </button>
      {result && (
        <div style={{ marginTop: 32 }}>
          <h2>Results</h2>
          <p>{result.summary}</p>
          <ul>
            {result.messages.map((msg, idx) => (
              <li key={idx} style={{ color: msg.severity === 'error' ? 'red' : msg.severity === 'warning' ? 'orange' : 'gray' }}>
                Line {msg.line}, Col {msg.column}: <strong>{msg.severity.toUpperCase()}</strong> - {msg.message} {msg.ruleId && <em>({msg.ruleId})</em>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 