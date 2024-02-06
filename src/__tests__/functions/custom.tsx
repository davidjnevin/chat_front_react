import axios from 'axios';

const authFetch = axios.create({
  baseURL: 'http://127.0.0.1:8000/clean',
  headers: {
    Accept: 'application/json',
  },
});

export default authFetch;

