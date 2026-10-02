import { useEffect, useState } from 'react'

/** Local time in the footer — a small proof the page is alive. */
export function useLocalTime(timeZone: string) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone,
      }).format(new Date())
    setTime(format())
    const id = window.setInterval(() => setTime(format()), 1000)
    return () => window.clearInterval(id)
  }, [timeZone])

  return time
}