import {BOOKS_ENDPOINT} from 'src/constants/api';

export const fetchBooks = () => {
  return fetch(BOOKS_ENDPOINT);
}
