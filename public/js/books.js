import { getFetch } from './modules/fetch.js';

console.log('books');

const booksListEl = document.getElementById('books');

// books tik registruotiems prisijungusiems vartotojams
const token = localStorage.getItem('bookUserToken');
// console.log('token===', token);
if (!token) {
  // neregistruotas, eik is cia
  window.location.replace('login.html');
}

// gauti ir iskonsolinti visas knygas
async function getBooks() {
  const booksArr = await getFetch('books');
  console.log('booksArr===', booksArr);
  renderBooks(booksArr, booksListEl);
}
getBooks();
// atvaizduoti knygas saraso pavidalu htmle

function renderBooks(arr, dest) {
  dest.innerHTML = '';
  arr.forEach((bObj) => {
    const liEl = document.createElement('li');
    liEl.textContent = `${bObj.title} - ${bObj.year}`;
    dest.append(liEl);
  });
}
