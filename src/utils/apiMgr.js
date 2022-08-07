const { BASE_URL } = process.env

const instance = axios.create({
    baseURL: 'https://api.example.com'
});

export default instance;