import { getUsersToBeginConversation, User } from "@/modules/user/get-user-to-begin-conversation"
import { useEffect, useState } from "react"

export function useGetUsersToBeginConversation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [users, setUsers] = useState<User[]>()

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const data: any  = await getUsersToBeginConversation()
      setUsers(data)
      return data
    } catch (err: any) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return { fetchUsers, loading, error, users }
}