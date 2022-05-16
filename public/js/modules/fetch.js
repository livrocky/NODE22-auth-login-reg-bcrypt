export const BASE_URL = 'http://localhost:3002';

export async function getFetch(endpoint) {
  try {
    const resp = await fetch(`${BASE_URL}/${endpoint}`);
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    console.warn('error in getFetch', error);
  }
}

export async function postFetch(endpoint, data) {}
