import { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import { extractTextFromImage } from './utils/visionApi';
import { parseNutritionText } from './utils/parseNutrition';
import { saveToHistory, getHistory, clearHistory } from './utils/storage';
import { aggregateByDate } from './utils/aggregate';

function App() {
  const [ocrText, setOcrText] = useState('');
  const [parsed, setParsed] = useState({});
  const [history, setHistory] = useState(getHistory());
  const aggregated = aggregateByDate(history);

  const handleImageSelected = async (base64Image) => {
    setOcrText('読み取り中...');
    const rawText = await extractTextFromImage(base64Image);
    setOcrText(rawText);

    const parsedResult = parseNutritionText(rawText);
    setParsed(parsedResult);
  };

  const handleSave = () => {
    const timestamp = new Date().toISOString();
    saveToHistory({ timestamp, parsed });
    setHistory(getHistory()); // 更新
  };

  const handleClear = () => {
    clearHistory();
    setHistory([]);
  };

  return (
    <div style={{ padding: '1em', fontFamily: 'sans-serif' }}>
      <h1>EatScan</h1>
      <p>食品ラベルを撮影して成分を読み取ります。</p>

      <ImageUploader onImageSelected={handleImageSelected} />

      <h2>OCR結果</h2>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{ocrText}</pre>

      {Object.keys(parsed).length > 0 && (
        <div>
          <h2>栄養成分の抽出結果</h2>
          <ul>
            {Object.entries(parsed).map(([key, val]) => (
              <li key={key}>{key}: {val}</li>
            ))}
          </ul>
          <button onClick={handleSave}>この結果を保存</button>
        </div>
      )}

      {history.length > 0 && (
        <div style={{ marginTop: '2em' }}>
          <h2>履歴</h2>
          <ul>
            {history.map((entry, index) => (
              <li key={index}>
                <strong>{new Date(entry.timestamp).toLocaleString()}:</strong>
                <ul>
                  {Object.entries(entry.parsed).map(([key, val]) => (
                    <li key={key}>{key}: {val}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <button onClick={handleClear}>履歴をすべて削除</button>
        </div>
      )}

      {Object.keys(aggregated).length > 0 && (
        <div style={{ marginTop: '2em' }}>
          <h2>日別の栄養素合計</h2>
          <ul>
            {Object.entries(aggregated).map(([date, nutrients]) => (
              <li key={date}>
                <strong>{date}:</strong>
                <ul>
                  {Object.entries(nutrients).map(([key, val]) => (
                    <li key={key}>{key}: {val.toFixed(1)}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}

export default App;
