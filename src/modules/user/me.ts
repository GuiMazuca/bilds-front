import { api } from "@/lib/api";

export interface User {
  address: string;
  cep: string;
  city: string;
  createdAt: string;
  email: string;
  name: string;
  phone: string;
  updatedAt: string;
  userId: string;
  _id: string;
}

export const me = async (): Promise<User> => {
  try {
    const response = await api.get(`/user/me`, true);
    return response;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.response?.data?.message || 'Erro ao buscar os dados do usuário');
  }
}
