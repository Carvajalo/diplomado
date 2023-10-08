const useState = (initialValue) => {
  let state = initialValue;
  const setState = (newValue) => {
    state = newValue;
  }
  const getState = () => state;
  return [getState, setState];
}

const types = {
  number: /^[0-9]{1,10}$/,
  text: /^[a-zA-ZÀ-ÿ0-9\s]{1,20}$/,
  textarea: /^[0-9a-zA-ZÀ-ÿ\s]{1,20}$/,
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]+$/,
}


const allowedKeys = [8, 9, 16, 17, 18, 19, 20, 32, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 91, 92, 93, 112, 113, 114, 115, 117, 118, 119, 120, 121, 122, 123, 144, 145];



const useForm = (modalSelectors) => {

  const state = modalSelectors.reduce((acc, { name, selector, RegExp }) => {
    acc[name] = {
      value: document.querySelector(selector),
      RegExp: RegExp,
    }
    return acc;
  }, {});
  const [values, setValues] = useState(state);
  const [errors, setErrors] = useState({});
  const [debounceAlert, setDebounceAlert] = useState(true);
  const [allKeyPresses, setAllKeyPresses] = useState([]);
  const reset = () => {
    console.log(values())
    Object.keys(values()).forEach((key) => {
      values()[key].value.value = '';
    });
  };

  const handleInputChange = (e, callback = () => { }) => {

    const { name, value, type } = e.target;
    const input = values()[name];
    const key = e.key;
    const keyCode = e.keyCode;
    console.log(type)
    if (allKeyPresses().find((key) => key === keyCode)) {
      setAllKeyPresses([...allKeyPresses(), keyCode])
      console.log(allKeyPresses())
    }
    if (!allowedKeys.includes(keyCode) && !types[type]?.test(key)) {
      e.preventDefault()
      if (debounceAlert()) {
        Toastify({
          text: `El campo solo acepta ${type === 'number' ? 'números' : 'letras y números'} `,
          duration: 2000,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          style: {
            background: "linear-gradient(to right, #ff1a60, #ff5f6d)",
          },
        }).showToast();
        setDebounceAlert(false);
        return setTimeout(() => setDebounceAlert(true), 2000);
      }
      return
    };
    input.value.value = value;
    setValues({
      ...values(),
      [name]: {
        ...input,
      }
    });
    input.RegExp && !input.RegExp.test(value) ? setErrors({
      ...errors(),
      [name]: `El campo ${name} no es válido`
    }) : '';
    callback();
  }
  return [values, handleInputChange, setValues, reset, errors];
}

