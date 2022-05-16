/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
console.log('login here');
const BASE_URL = 'http://localhost:3002';

const formEl = document.getElementById('login');
const errorEl = document.getElementById('err');

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('js submit form');
  const loginObj = {
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
  };
  console.log('loginObj ===', loginObj);

  const resp = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginObj),
  });
  const dataInJs = await resp.json();
  console.log('dataInJs ===', dataInJs);

  if (dataInJs.success === true) {
    console.log('login success');
    errorEl.textContent = 'Logged in!';
    // issaugoti reiksme localStorage
    const token = dataInJs.token;
    localStorage.setItem('bookUserToken', token);
    // sukuriapsl istorijoje nauja irasanunaviguodamas windows.location.href = 'books.html';
    // nunaviguoja, padaro kad negaletume gryzti atgal psl su back
    window.location.href = 'books.html';
    window.location.replace('books.html');
  } else {
    console.log('login fail');
    handleError(dataInJs);
  }
});

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
