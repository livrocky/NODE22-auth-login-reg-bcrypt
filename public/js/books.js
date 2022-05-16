import { getFetch } from './modules/fetch.js';

console.log('books');

const booksListEl = document.getElementById('books');

// books tik registruotiems prisijungusiems vartotojams
const token = localStorage.getItem('bookUserToken');
console.log('token ===', token);

if (!token) {
  // neregistruotas, eik is cia
  window.location.replace('login.html');
}

function renderBooks(arr, dest) {
  dest.innerHTML = '';
  arr.forEach((bObj) => {
    const liEl = document.createElement('li');
    liEl.textContent = `${bObj.title} - ${bObj.year}`;
    dest.append(liEl);
  });
}

// gauti ir iskonsolinti visas knygas
async function getBooks(userToken) {
  const booksArr = await getFetch('books', userToken);
  console.log('booksArr ===', booksArr);
  renderBooks(booksArr, booksListEl);
}
getBooks(token);
// atvaizduoti knygas saraso pavidalu htmle
