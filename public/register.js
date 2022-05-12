/* eslint-disable no-use-before-define */
console.log('register here');
const BASE_URL = 'http://localhost:3002';

const formEl = document.forms.register;
const errorEl = document.getElementById('err');

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('reg');
  // 1. paimti formos duomenis
  const formData = {
    email: formEl.elements.email.value,
    password: formEl.elements.password.value,
    repeatPassword: formEl.elements.repeat_password.value,
  };
  console.log('formData ===', formData);
  // 2. palytingi ar sutampa slaptazodziai
  if (formData.password !== formData.repeatPassword) {
    handleError('nesutampa slaptazodziai');
    return;
  }

  registerFetch(formData.email, formData.password);
});

// 3. jei sutampa siusti i registracijos endpointa
// 4. pranesti apie klaida jei tokia ivyko

function handleError(msg) {
  errorEl.textContent = '';
  if (typeof msg === 'string') {
    errorEl.textContent = msg;
  }
  if (Array.isArray(msg)) {
    msg.forEach((eObj) => {
      errorEl.innerHTML += `${eObj.message}<br>`;
    });
  }
}

async function registerFetch(email, password) {
  const registerObj = { email, password };
  const resp = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerObj),
  });
  if (resp.status === 201) {
    // success
    handleError('register success');
  } else {
    // fail
    handleError(await resp.json());
  }
}
