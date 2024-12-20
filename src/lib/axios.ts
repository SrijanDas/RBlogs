import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.VITE_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
    },
});

export default axiosInstance;
