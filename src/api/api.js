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

export const getInsurances = async () => {
    try {
        const res = await api.get(`/get/get-insurence`);
        return res.data.data;
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

export const orderPlace = async (data) => {
    try {
        const res = await api.post('/order/order-place', data);
        console.log('res,', res.data);
        return res.data;
    } catch (error) {
        console.log("ERROR:", error);
    }
}
export const getOrderDetails = async (id) => {
    try {
        const res = await api.get(`/order/get-session-order/${id}`);
        return res.data.orderData;
    } catch (error) {
        console.log("ERROR:", error);
    }
}

// generate pdf
export const generatePdf = async (sessionId) => {
    try {
        const res = await api.get(`/order/generate-pdf/${sessionId}`);
        return res.data;
    } catch (error) {
        console.log("ERROR:", error);
    }
}

export const sendMail = async (sessionId) => {
    try {
        const res = await api.get(`/order/send-mail/${sessionId}`);
        return res.data;
    } catch (error) {
        console.log("ERROR:", error);
    }
}