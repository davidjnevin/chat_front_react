import axios from 'axios';

const base_url: string = import.meta.env.VITE_BACKEND_BASEURL

const chatFetch = axios.create({
  baseURL: base_url,
  headers: {
    Accept: 'application/json',
  },
});

export default chatFetch;

