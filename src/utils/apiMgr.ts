const { BASE_URL } = process.env
import axios from 'axios'

// set default BASE_URL
const instance = axios.create({
    baseURL: BASE_URL//'https://api.example.com'
});

export default instance;