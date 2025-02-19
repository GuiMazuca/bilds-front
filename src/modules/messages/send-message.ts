import { api } from "@/lib/api";

export interface sendMessageInput {
  receiverId: string
  content: string
}

export const sendMessage = async (data: sendMessageInput) => {
  try {
    const response = await api.post('/messages/send', data, true)
    return response

  } catch (error: any) {
    console.error(error)

    throw new Error(error.response?.data?.message);
  }
}