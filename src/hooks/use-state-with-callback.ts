import { useEffect, useRef, useState } from "react";

const useStateWithCallback = (initialValue: any)=> {
  const callbackRef = useRef(null);

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (callbackRef.current) {
      (callbackRef as any).current(value);

      callbackRef.current = null;
    }
  }, [value]);

  const setValueWithCallback = (newValue: any, callback: any) => {
    callbackRef.current = callback;

    return setValue(newValue);
  };

  return [value, setValueWithCallback];
};

export default useStateWithCallback;
  