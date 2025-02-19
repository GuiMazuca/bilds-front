import { getMessages, MessageOutPut } from "@/modules/messages/get-messages"
import { useEffect, useState } from "react"

export function useGetMessages(conversationId: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [messages, setMessages] = useState<MessageOutPut[]>()

  const fetchMessages = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getMessages(conversationId)
      setMessages(data)
      return data
    } catch (err: any) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return { fetchMessages, loading, error, messages }
}