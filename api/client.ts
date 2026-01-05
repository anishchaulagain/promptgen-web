import axios from "axios";

const app = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

app.interceptors.response.use(
    (response) => response,
    (error) => {
        const { detail } = error.response.data;
        console.log("API Error:", detail);
        return Promise.reject(error);
    }
)

export default app