import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:8000',
});

// Interceptadores (opcional)
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[Axios Error]:', error);
    return Promise.reject(error);
  }
);

export default Axios;
