const API_KEY = import.meta.env.VITE_VISION_API_KEY;

export async function extractTextFromImage(base64Image) {
  const body = {
    requests: [
      {
        image: { content: base64Image.split(',')[1] },
        features: [{ type: 'TEXT_DETECTION' }],
      },
    ],
  };

  const res = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();
  return data.responses[0]?.fullTextAnnotation?.text || '読み取り失敗';
}
