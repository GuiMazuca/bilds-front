import { api } from "@/lib/api"

export interface Sender {
  _id: string;
  name: string;
  email: string;
}

export interface MessageOutPut {
  _id: string;
  conversation: string;
  sender: Sender;
  content: string;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export const getMessages = async (conversationId: string): Promise<MessageOutPut[]> => {
  try {
    const response = await api.get(`/messages/${conversationId}`, true)
    return response
  } catch (error: any) {
    console.error(error)

    throw new Error(error.response?.data?.message);
  }
}