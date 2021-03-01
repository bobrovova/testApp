import {BOOKS_ENDPOINT} from 'constants/api';

export const fetchBooks = async () => {
  return fetch(BOOKS_ENDPOINT);
}
