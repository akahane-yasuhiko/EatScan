import { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import { extractTextFromImage } from './utils/visionApi';

function App() {
  const [ocrText, setOcrText] = useState('');

  const handleImageSelected = async (base64Image) => {
    setOcrText('読み取り中...');
    const result = await extractTextFromImage(base64Image);
    setOcrText(result);
  };

  return (
    <div style={{ padding: '1em', fontFamily: 'sans-serif' }}>
      <h1>EatScan</h1>
      <p>食品ラベルを撮影して成分を読み取ります。</p>
      <ImageUploader onImageSelected={handleImageSelected} />
      <pre style={{ whiteSpace: 'pre-wrap', marginTop: '1em' }}>{ocrText}</pre>
    </div>
  );
}

export default App;
