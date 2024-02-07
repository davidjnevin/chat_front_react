import axios from 'axios';

const chatFetch = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    Accept: 'application/json',
  },
});

export default chatFetch;

