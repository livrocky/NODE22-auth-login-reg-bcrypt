/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
console.log('login here');
const BASE_URL = 'http://localhost:3002';

const formEl = document.getElementById('login');
const errroEl = document.getElementById('err');
const emailInputEl = formEl.elements.email;
const passwordInputEl = formEl.elements.password;

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('js submit form');
  clearErrors();
  const loginObj = {
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
  };

  // TODO front end validation
  if (checkInputObj(loginObj)) {
    console.log('checkInputObj===', checkInputObj);
    const errorsArr = [];
    // pasiimti loginObj ir patikrinti
    // 1. ar reiksmes yra (ar lygu '')
    // jeigu lygu tada formuojam klaida
    // 2. paziureti ar ivesties laukas netrumpesnis uz 4 simbolius
    // jeigu taip tai {message: 'too short', field: 'password'}
    // handleError(errorsArr);
    return;
    // handleError([{ message: '', field: 'email' }]);
  }

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
    // PAPRASTAS BUDAS ATVAIZDUOTI VISAS KLAIDAS
    // msg.forEach((eObj) => {
    //   errroEl.innerHTML += `${eObj.message}<br>`;
    // });
    // NORIM ATVAIZDUOTI INDIVIDUALIAS KLAIDAS
    msg.forEach((eObj) => {
      if (eObj.field === 'email') {
        emailInputEl.style.border = '1px solid red';
        emailInputEl.nextElementSibling.textContent = eObj.message;
      }
      if (eObj.field === 'password') {
        passwordInputEl.style.border = '1px solid red';
        passwordInputEl.nextElementSibling.textContent = eObj.message;
      }
    });
  }
}

function clearErrors() {
  emailInputEl.style.border = 'none';
  passwordInputEl.style.border = 'none';
  passwordInputEl.nextElementSibling.textContent = '';
  emailInputEl.nextElementSibling.textContent = '';
}

function checkInputObj(obj) {
  for (key in obj) {
    const value = obj[key];
    console.log('value===', value);
    if ((value = '')) return true;
  }
}
