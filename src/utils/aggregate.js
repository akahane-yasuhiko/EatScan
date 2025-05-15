export function aggregateByDate(history) {
  const grouped = {};

  for (const entry of history) {
    const dateKey = new Date(entry.timestamp).toISOString().split('T')[0]; // YYYY-MM-DD

    if (!grouped[dateKey]) {
      grouped[dateKey] = {};
    }

    for (const [key, value] of Object.entries(entry.parsed)) {
      if (!grouped[dateKey][key]) {
        grouped[dateKey][key] = 0;
      }
      grouped[dateKey][key] += value;
    }
  }

  return grouped; // { "2025-05-13": { エネルギー: 520, 脂質: 24.6, ... } }
}
