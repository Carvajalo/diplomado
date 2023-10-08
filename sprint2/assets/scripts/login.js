const btnSubmit = document.querySelector('.btn.btn-submit');
const forms = document.querySelector('.needs-validation');
const email = document.querySelector('#email');
const emailRegExp = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
const password = document.querySelector('#password');
const invalidFeedback = password.closest('.input-group').querySelector('.invalid-feedback');


btnSubmit.addEventListener('click', (event) => {
  if (forms.checkValidity()) return;
  event.preventDefault();
  event.stopPropagation();
  if (emailRegExp.test(email.value) && password.value.length >= 8)
    return email.classList.remove('is-invalid');

  if (!emailRegExp.test(email.value)) {
    email.classList.add('is-invalid');
    email.addEventListener('keyup', (e) => {
      console.log(e.target.value)
      if (!emailRegExp.test(e.target.value)) {
        return e.target.classList.add('is-invalid');
      }
      e.target.classList.remove('is-invalid');
    })
  }
  if (password.value.length < 8) {
    password.classList.add('is-invalid');
    password.addEventListener('keyup', (e) => {
      if (password.value === '') return password.classList.add('is-invalid');
      if (e.target.value.length < 8) {
        invalidFeedback.textContent = 'Ingrese una contraseña de al menos 8 caracteres';
        return e.target.classList.add('is-invalid');
      }
      e.target.classList.remove('is-invalid');
    });
  }

});


