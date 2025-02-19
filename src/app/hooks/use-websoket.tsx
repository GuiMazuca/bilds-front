import { useEffect, useState } from "react"
import io, { Socket } from "socket.io-client"
import { MessageOutPut } from "@/modules/messages/get-messages"
import toast from "react-hot-toast"

const SOCKET_URL = process.env.NEXT_PUBLIC_BASE_URL

export function useWebSocket(conversationId: string | null, userId: string, receiverId: string, handleSetLatestMessage: (message: any) => void) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [messages, setMessages] = useState<MessageOutPut[]>([])

  useEffect(() => {
    if (!conversationId) return
    
    const newSocket = io(SOCKET_URL, {
      query: {
        currentUser: userId,
        receiverId: receiverId,
      },
    })
    setSocket(newSocket)

    newSocket.on("connect", () => {
    })

    return () => {
      newSocket.disconnect()
    }
  }, [conversationId, userId, receiverId])

  useEffect(() => {
    if (!socket || !conversationId) return

    socket.emit("joinRoom", conversationId)

    socket.on("newMessage", (message: MessageOutPut) => {
      setMessages((prevMessages) => {
        if (prevMessages.find((msg) => msg._id === message._id)) {
          return prevMessages
        }
        return [...prevMessages, message]
      })
      handleSetLatestMessage(message)
      if (message.sender._id === userId) return
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
              <div className="p-4 flex gap-2 items-center">
                <div
                  className="border cursor-pointer p-1 rounded-full w-10 h-10 flex items-center justify-center bg-gray-200"
                >
                  <h1 className="font-bold uppercase text-xl">{message.sender.name?.charAt(0)}</h1>
                </div>
              </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {message.sender.name}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {message.content}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ))
      
    })

    socket.on("messageDeleted", ({ messageId }) => {
      setMessages((prevMessages) => prevMessages.filter(m => m._id !== messageId))
    })

    socket.on("messagesSeen", () => {
      setMessages((prevMessages) =>
        prevMessages.map(m => ({ ...m, seen: true }))
      )
    })

    return () => {
      socket.emit("leaveRoom", conversationId)
      socket.off("newMessage")
      socket.off("messageDeleted")
      socket.off("messagesSeen")
    }
  }, [socket, conversationId])

  function sendMessage(receiverId: string, currentUser: string, content: string) {
    if (!socket) return
    socket.emit("sendMessage", { receiverId, currentUser, content })
  }

  function joinRoom(newConversationId: string) {
    if (!socket) return
    socket.emit("joinRoom", newConversationId)
  }

  function leaveRoom() {
    if (!socket || !conversationId) return
    socket.emit("leaveRoom", conversationId)
  }

  return { messages, sendMessage, joinRoom, leaveRoom }
}
