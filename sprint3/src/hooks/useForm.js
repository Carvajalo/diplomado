import { useEffect, useState } from 'react';


export const useForm = (initialState = {}, callback = () => { }, validations = {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reset = () => {
    setValues(initialState);
    setErrors({});
    setIsSubmitting(false);
  };

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validations(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(values);
      reset();
    }
  }, [errors]);

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };



};


export const useForm2 = (initialState = {}, onValidate = null) => {
  const [values, setValues] = useState(initialState);
  const [regexError, setRegexError] = useState(false);
  const [errors, setErrors] = useState(null);

  const reset = () => {
    setValues(initialState);
  };

  useEffect(() => {
    if (onValidate) {
      const validationResults = onValidate(values);
      const { IsErrorRegex, errors } = validationResults || {};
      setRegexError(IsErrorRegex);
      setErrors(errors || null);
    }
  }, [values]);

  const handleInputChange = (
    { target: { checked, name, type, value } },
    returnType = "",
    Callback = () => {}
  ) => {
    const updatedValue =
      returnType === "number" && type === "checkbox"
        ? checked
          ? 1
          : 0
        : type === "checkbox"
        ? checked
        : value;

    const newValue = { ...values, [name]: updatedValue };
      

    setValues((prevValues) => ({
      ...prevValues,
      [name]: updatedValue,
    }));

    Callback();
  };

  return [values, handleInputChange, reset, setValues, errors];
};


export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    /**
     * Timer for debouncing the value.
     *
     * @type {number}
     */
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};


export const useDebounceForm = (initialState, delay) => {
  const [state, handleInputChange, reset] = useForm(initialState);
  const debouncedState = useDebounce(state, delay);
  return [debouncedState, state, handleInputChange, reset];
};