/* eslint-disable consistent-return */
export const BASE_URL = 'http://localhost:3002';

export async function getFetch(endpoint, token) {
  try {
    const resp = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    console.warn('erro in getFetch', error);
  }
}

// export async function postFetch(endpoint, data) {}
