export function parseNutritionText(text) {
  const result = {};

  const patterns = [
    { label: 'エネルギー', key: 'エネルギー', regex: /エネルギー[:：]?\s*([\d.]+)\s*k?cal/i },
    { label: 'たんぱく質', key: 'たんぱく質', regex: /たんぱく質[:：]?\s*([\d.]+)\s*g/i },
    { label: '脂質', key: '脂質', regex: /脂質[:：]?\s*([\d.]+)\s*g/i },
    { label: '炭水化物', key: '炭水化物', regex: /炭水化物[:：]?\s*([\d.]+)\s*g/i },
    { label: '食塩相当量', key: '食塩相当量', regex: /食塩相当量[:：]?\s*([\d.]+)\s*g/i },
  ];

  for (const item of patterns) {
    const match = text.match(item.regex);
    if (match) {
      result[item.key] = parseFloat(match[1]);
    }
  }

  return result;
}
