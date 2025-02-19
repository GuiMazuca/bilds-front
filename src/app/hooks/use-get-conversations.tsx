import { Conversation, getUserConversations } from "@/modules/conversations/get-user-conversations"
import { useEffect, useState } from "react"

export function useGetConversations() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [conversations, setConversations] = useState<Conversation[]>()

  const fetchConversations = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getUserConversations()
      setConversations(data.conversations)
      return data.conversations
    } catch (err: any) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConversations()
  }, [])

  return { fetchConversations, loading, error, conversations }
}