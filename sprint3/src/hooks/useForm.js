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
    Callback = () => { }
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


const types = {
  "text": ({ target, set, callback, ...rest }) => {
    const { name, value } = target;
    if (!rest?.validation) return;
    const { validation, setValidationErrors } = rest;
    if (validation?.RegExp && !validation?.RegExp?.test(value)) {
      return setValidationErrors((prev) => ({ ...prev, [name]: true }));
    }
    setValidationErrors((prev) => ({ ...prev, [name]: false }));
    set((prev) => ({ ...prev, [name]: value }));
  },
  "number": ({ target, set, callback, ...rest }) => {
    const { name, value } = target;
    set((prev) => ({ ...prev, [name]: value }));
    if (!rest?.validation) return;
    const { validation, setValidationErrors } = rest;
    if (validation?.RegExp && !validation?.RegExp?.test(value)) {
      return setValidationErrors((prev) => ({ ...prev, [name]: true }));
    }
    setValidationErrors((prev) => ({ ...prev, [name]: false }));
  },
  "email": ({ target, set, callback, ...rest }) => { },
  "password": ({ target, set, callback, ...rest }) => { },
  "checkbox": ({ target, set, callback, ...rest }) => { },
  "radio": ({ target, set, callback, ...rest }) => { },
  "select": ({ target, set, callback, ...rest }) => { },
  "textarea": ({ target, set, callback, ...rest }) => { },
  "date": ({ target, set, callback, ...rest }) => { },
  "time": ({ target, set, callback, ...rest }) => { },
  "datetime-local": ({ target, set, callback, ...rest }) => { },
  "month": ({ target, set, callback, ...rest }) => { },
  "week": ({ target, set, callback, ...rest }) => { },
  "tel": ({ target, set, callback, ...rest }) => { },
  "url": ({ target, set, callback, ...rest }) => { },
  "search": ({ target, set, callback, ...rest }) => { },
  "color": ({ target, set, callback, ...rest }) => { },
  "file": ({ target, set, callback, ...rest }) => { },
  "range": ({ target, set, callback, ...rest }) => { },
  "image": ({ target, set, callback, ...rest }) => { },
}

export const useForm3 = ({ initialState = {}, onValidate = {} }) => {
  const [values, setValues] = useState(initialState);
  const [validationErrors, setValidationErrors] = useState({});

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = (
    { target, target: { name, type }, key },
    callback = () => { }
  ) => {
    types[type]({ target: target, set: setValues, callback, ...(onValidate[name] && { validation: onValidate[name], setValidationErrors: setValidationErrors }) });
  }

  return [values, handleInputChange, reset, setValues, validationErrors]
};