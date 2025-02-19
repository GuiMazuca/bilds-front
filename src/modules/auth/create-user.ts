import { api } from "@/lib/api";

export interface CreateUserInput {
  name: string;
  password: string;
  cep: string;
  phone: string;
  email: string;
  address: string;
  city: string;
}

export const createUser = async (data: CreateUserInput) => {
  try {
    const response = await api.post('/user/register', data)
    return response

  } catch (error: any) {
    console.error(error)

    throw new Error(error.response?.data?.message);
  }
}