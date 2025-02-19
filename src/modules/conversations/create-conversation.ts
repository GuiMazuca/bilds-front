import { api } from "@/lib/api";

export interface CreateConversationInput {
  user2Id: string
}

export const createConversation = async (user2Id: CreateConversationInput) => {
  try {
    const response = await api.post('/conversation/create', user2Id, true)
    return JSON.stringify(response)

  } catch (error: any) {
    console.error(error)

    throw new Error(error.response?.data?.message);
  }
}