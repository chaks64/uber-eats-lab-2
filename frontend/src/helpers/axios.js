import axios from "axios"
const baseURL = 'http://localhost:3001';
console.log("@@@@@@@@@@@@",baseURL)
axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
    baseURL: baseURL,
});
export default axiosInstance