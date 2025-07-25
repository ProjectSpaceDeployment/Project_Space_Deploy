import axios from 'axios'

// URL from .env
const baseUrl = import.meta.env.VITE_API_URL

const AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 300000, 
})

AxiosInstance.interceptors.request.use((config) => {
    if (!(config.data instanceof FormData)) {
        config.headers["Content-Type"] = config.headers["Content-Type"] || "application/json";
    }
    return config;
});

AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('Token')
        if(token){
            config.headers.Authorization = `Token ${token}`
        }
        else{
            config.headers.Authorization = ``
        }
        return config;
    }
)

AxiosInstance.interceptors.response.use(
    (response) => {
        return response
    }, 
    (error) => {
        if(error.response && error.response.status === 401){
            localStorage.removeItem('Token');
            return Promise.reject(error);
        }
        else{
            return Promise.reject(error);
        }

    }
)
export default AxiosInstance;
