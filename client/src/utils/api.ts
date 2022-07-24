import axios from 'axios';

const clientReq = axios.create({
    baseURL: 'http://localhost:9090/api',
    timeout: 1000,
})

clientReq.interceptors.request.use((config) => {  
    const token = localStorage.getItem('userToken');
    if(token && config.headers) {
       config.headers.Authorization = `Bearer ${token}`;
    }
    return config
}, error => {
    error = Promise.reject(error)
})

export default clientReq;