import axios from 'axios';

// Replace with your own computer's local IP (not localhost!)
const API = axios.create({
  baseURL: 'http://192.168.1.12:3000', // <-- update this to your IP
});

export const signup = (data) => API.post('/signup', data);
export const login = (data) => API.post('/login', data);
