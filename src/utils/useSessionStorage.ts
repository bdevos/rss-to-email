import { useState } from 'react'

export const useSessionStorage = <T extends string>(key: string, value: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => (sessionStorage.getItem(key) as T) ?? value)

  const setValue = (value: T) => {
    setStoredValue(value)
    sessionStorage.setItem(key, value)
  }

  return [storedValue, setValue] as const
}
