const forms = document.querySelector('.needs-validation');
const btnSubmit = document.querySelector('.btn.btn-submit');


const patterns = {
  name: /^[a-z\d]{5,12}$/i,
  password: /^[\w@-]{8,20}$/i,
  phone: /^\d{11}$/,
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
}


const phone = document.querySelector('#phone');



const messages = {
  name: 'El nombre debe contener entre 5 y 12 caracteres',
  password: 'La contraseña debe contener entre 8 y 20 caracteres',
  phone: 'El número de teléfono debe contener 11 números',
  email: 'El email debe contener entre 5 y 20 caracteres y debe contener un @ y un .dominio'
}


btnSubmit.addEventListener('click', (event) => {
  console.log(forms.checkValidity())

  if (forms.checkValidity()) return;
  event.preventDefault();
  event.stopPropagation();

  inputs.forEach((input) => {
    input.addEventListener('keyup', (e) => {
      validate(input, messages[input.name])
    })
  })

  inputs.forEach((input) => {
    validate(input, null)
  })

});

const maxLength = {
  name: 12,
  password: 20,
  phone: 11,
  email: 20
}

const inputs = document.querySelectorAll('.needs-validation input');
const allowedKeys = [5, 8, 9, 16, 17, 18, 20, 37, 38, 39, 40]

inputs.forEach((input) => {
  input.addEventListener('keydown', (e) => {
    const { value, selectionStart, selectionEnd } = e.target;
    if(e.keyCode === 13) return e.preventDefault();
    if (value.length >= maxLength[input.name] && selectionStart === selectionEnd && !allowedKeys.includes(e.keyCode)) {
      return e.preventDefault();
    }
    if (selectionEnd === selectionStart) return;
    const textBeforeSelection = value.substring(0, selectionStart);
    const textAfterSelection = value.substring(selectionEnd);
    const newLength = textBeforeSelection.length + 1 + textAfterSelection.length;
    if (newLength > maxLength[input.name]) {
      e.preventDefault();
      return;
    }

  })
})


const validate = (field, message = null) => {
  const imputGroup = field.closest('.input-group');
  if (patterns[field.name].test(field.value)) return field.classList.remove('is-invalid');
  const feedback = imputGroup.querySelector('.invalid-feedback');
  if (message) feedback.textContent = message;
  field.classList.add('is-invalid');
}

