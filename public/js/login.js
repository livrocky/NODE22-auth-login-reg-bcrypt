/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
console.log('login here');
const BASE_URL = 'http://localhost:3002';

const formEl = document.getElementById('login');
const errroEl = document.getElementById('err');

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
    errroEl.textContent = '';
    // issaugoti reiksme localStorage
    const token = dataInJs.token;
    localStorage.setItem('bookUserToken', token);
    // sukuria narsykles puslapiu istorijoje nauja irasa nunaviguodamas
    // window.location.href = 'books.html';
    // nunaviguoja, padaro kad negaletume gryzti atgal psl su back
    window.location.replace('books.html');
  } else {
    console.log('login fail');
    handleError(dataInJs);
  }
});

function handleError(msg) {
  errroEl.textContent = '';
  if (typeof msg === 'string') {
    errroEl.textContent = msg;
  }
  if (Array.isArray(msg)) {
    msg.forEach((eObj) => {
      errroEl.innerHTML += `${eObj.message}<br>`;
    });
  }
}
