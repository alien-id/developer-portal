import axios from "axios";
import alienSsoSdkClient from "./alien-sso-sdk-client";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3005',
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(async (config) => {
    try {

        const token = alienSsoSdkClient.getAccessToken();
        console.log('!!! token', token);

        if (token) {
            config.headers.setAuthorization(`Bearer ${token}`);
        }

        return config;
    } catch (error) {
        console.error(`Auth internal error: ${error}`);

        return config;
    }
});

export default axiosInstance;