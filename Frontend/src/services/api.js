import axios from 'axios';

const API = axios.create({
  baseURL: 'https://gojob-t53p.onrender.com/api/users',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authentication functions
export async function register(username, password, email, role) {
  const res = await API.post('/register', { username, password, email, role });
  return res.data;
}

export async function login(username, password, role) {
  const res = await API.post('/login', { username, password, role });
  return res.data;
}

export function setAuthToken(token) {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
}

// ✅ Add this default export
export default API;
