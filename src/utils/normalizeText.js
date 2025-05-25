export function normalizeNutritionText(rawText) {
  const lines = rawText
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

  const items = [];
  const values = [];

  for (const line of lines) {
    if (/\d/.test(line) && /(g|kcal)/i.test(line)) {
      values.push(line);
    } else {
      items.push(line.replace(/\s+/g, ''));
    }
  }

  const joined = [];
  for (let i = 0; i < Math.min(items.length, values.length); i++) {
    joined.push(`${items[i]} ${values[i]}`);
  }

  return joined.join('\n');
}
