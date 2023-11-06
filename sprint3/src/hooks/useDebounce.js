import { useEffect, useState } from "react";

export const useDebounce = ({ value, delay }) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debounceValue;
};

/* export const useDebounceForm = (initialState, delay) => {
  const [state, handleInputChange, reset] = useForm(initialState);
  const debouncedState = useDebounce(state, delay);
  return [debouncedState, state, handleInputChange, reset];
}; */