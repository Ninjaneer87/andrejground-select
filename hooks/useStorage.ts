import { useEffect, useState } from 'react';

export function useStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const item = localStorage.getItem(key);
    setStoredValue(item ? JSON.parse(item) : initialValue);
  }, []);

  const setValue = (value: T | ((val: T) => T)) => {
    const newValue = value instanceof Function ? value(storedValue) : value;
    setStoredValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };
  return [storedValue, setValue] as const;
}
