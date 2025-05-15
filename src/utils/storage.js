const STORAGE_KEY = 'eatscan_history';

export function saveToHistory(entry) {
  const existing = getHistory();
  existing.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function getHistory() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
