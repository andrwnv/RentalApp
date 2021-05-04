import axios from 'axios';

const api = axios.create({
    baseURL:'http://localhost:3080',
    responseType: "json"
});

export default api;
