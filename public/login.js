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
    errorEl.textContent = '';
  } else {
    console.log('login fail');
    handleError(dataInJs);
  }
});

function handleError(msg) {
  errorEl.textContent = msg;
}
