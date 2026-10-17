import { useCallback, useEffect, useState } from 'react';

export function useCountdown(target: string) {
  const calc = useCallback(() => {
    const d = Math.max(0, Math.floor((new Date(target).getTime() - Date.now()) / 1000));
    return { days: Math.floor(d / 86400), hours: Math.floor((d % 86400) / 3600), mins: Math.floor((d % 3600) / 60), secs: d % 60, done: d === 0 };
  }, [target]);
  const [t, setT] = useState(calc);
  useEffect(() => {
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);
  return t;
}
