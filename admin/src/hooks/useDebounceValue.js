import { useEffect, useRef, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';

export function useDebounceValue(value, delay, callback) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = callback; // Update ref to the latest callback.
  }, [callback]);

  useEffect(
    () => {
      const cb = callbackRef.current;
      const handler = setTimeout(() => {
        unstable_batchedUpdates(() => {
          setDebouncedValue(value);
          cb && cb();
        });
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay],
  );
  
  return debouncedValue;
}
