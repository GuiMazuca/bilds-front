import { sendMessage } from "@/modules/messages/send-message"
import { useState } from "react"

export function useSendMessage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchSendMessage = async (receiverId: string, content: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await sendMessage({receiverId:receiverId, content:content})
      return data
    } catch (err: any) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }
 

  return { fetchSendMessage, loading, error }
}