import axios from "axios";
import alienSsoSdkClient from "./alien-sso-sdk-client";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

console.log({ BACKEND_URL });

if (!BACKEND_URL) throw new Error("No NEXT_PUBLIC_BACKEND_URL env provided!");

const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(async (config) => {
    try {
        const token = alienSsoSdkClient.getAccessToken();

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