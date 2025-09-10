'use client';

import { useAuth } from '@alien_org/sso-sdk-react';
import axios from 'axios';
import { useMemo } from 'react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export function useAxios() {
  const { auth, logout } = useAuth();

  return useMemo(() => {
    const instance = axios.create({
      baseURL: BACKEND_URL,
      headers: { 'Content-Type': 'application/json' },
    });

    instance.interceptors.request.use((config) => {
      if (auth.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
      }
      return config;
    });

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      },
    );

    return instance;
  }, [auth.token]);
}
