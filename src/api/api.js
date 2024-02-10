import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

export const getCompliance = async () => {
    try {
        const res = await api.get('/get/compilations');
        return res.data.data;
    } catch (error) {
        console.log("ERROR:", error);
    }
}

export const getSingleCompliance = async (id) => {
    try {
        const res = await api.get(`/get/product-compilations/${id}`);
        return res.data.productDetails;
    } catch (error) {
        console.log("ERROR:", error);
    }
}

export const getProducts = async () => {
    try {
        const res = await api.get('/get/all-product');
        return res.data.data;
    } catch (error) {
        console.log("ERROR:", error);
    }
};