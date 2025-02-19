import { api } from "@/lib/api";

interface User {
  _id: string;
  name: string;
  phone?: string;
  email: string;
}

interface Message {
  _id: string;
  conversation: string;
  sender: string;
  content: string;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Conversation {
  _id: string;
  participants: User[];
  lastMessage: Message;
  createdAt: string;
  updatedAt: string;
  __v: number;
  secondUser: User;
}

export interface GetUserConversationsResponse {
  conversations: Conversation[];
}

export const getUserConversations = async (): Promise<GetUserConversationsResponse> => {
  try {
    const response = await api.get(`/conversation/user`, true);
    return response;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.response?.data?.message || 'Erro ao buscar os dados do usuário');
  }
}
