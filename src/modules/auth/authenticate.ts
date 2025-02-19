import { api } from '@/lib/api';
import { useAuthStore } from '@/store/auth.store';

interface LoginInPut {
  email: string,
  password: string
}

export const handleLogin = async ({email, password}: LoginInPut) => {
  try {
    const { access_token, user } = await api.post('/auth/login', { email, password });
  
    useAuthStore.getState().login(access_token, user);
  } catch (error: any) {
    console.error('Login failed', error);

    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
