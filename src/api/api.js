import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

export const getProducts = async () => {
    try {
        const res = await api.get('/get/all-product');
        return res.data.data;
    } catch (error) {
        console.log("ERROR:", error);
    }
};
