import axios from 'axios';

const clientReq = axios.create({
    baseURL: 'http://localhost:9090/api',
    timeout: 1000,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken') || ""}`
    }
})




export default clientReq;