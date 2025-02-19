"use client"

import { useGetConversations } from "@/app/hooks/use-get-conversations"
import { useGetMessages } from "@/app/hooks/use-get-messages"
import { useGetUsersToBeginConversation } from "@/app/hooks/use-get-users-to-begin-conversaton"
import { useWebSocket } from "@/app/hooks/use-websoket"
import { createConversation } from "@/modules/conversations/create-conversation"
import type { Conversation } from "@/modules/conversations/get-user-conversations"
import type { MessageOutPut } from "@/modules/messages/get-messages"
import { useAuthStore } from "@/store/auth.store"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChatHeader } from "./ChatHeader"
import { ChatSkeleton } from "./ChatSkeleton"
import { ChatSidebar } from "./ChatSidebar"
import { UserInfoDialog } from "./UserInfoDialog"
import { ContactInfoDialog } from "./ContactInfoDialog"
import { ChatMessages } from "./ChatMessages"
import { ChatInput } from "./ChatInput"


export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [showUserInfo, setShowUserInfo] = useState(false)
  const [showContactInfo, setShowContactInfo] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const { user, logout } = useAuthStore()
  const { conversations, loading: conversationLoading } = useGetConversations()
  const conversationId = selectedConversation ? selectedConversation?._id : ""
  const { fetchMessages, loading: messagesLoading } = useGetMessages(conversationId)
  const { users } = useGetUsersToBeginConversation()
  const [latestMessage, setLatestMessage] = useState<MessageOutPut>()
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const handleSetLatestMessage = useCallback((message: MessageOutPut) => {
    setLatestMessage(message)
  }, [])

  const {
    messages: wsMessages,
    sendMessage,
    joinRoom,
    leaveRoom,
  } = useWebSocket(
    conversationId,
    user?._id as string,
    selectedConversation?.secondUser._id as string,
    handleSetLatestMessage,
  )
  const [currentMessages, setCurrentMessages] = useState<MessageOutPut[]>([])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentMessages])

  function disconnectUser() {
    logout()
  }

  function formatDate(dateString: string) {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString))
  }

  useEffect(() => {
    const fetchAndSetMessages = async () => {
      if (selectedConversation) {
        const messages: any = await fetchMessages()
        setCurrentMessages(messages)
      }
    }
    fetchAndSetMessages()
  }, [selectedConversation])

  useEffect(() => {
    if (!selectedConversation) return
    leaveRoom()
    joinRoom(selectedConversation._id)

    return () => {
      leaveRoom()
    }
  }, [selectedConversation, joinRoom, leaveRoom])

  useEffect(() => {
    if (wsMessages.length > 0) {
      setCurrentMessages((current) => {
        const allMessages = [...current, ...wsMessages]
        return allMessages.filter((message, index, self) => index === self.findIndex((m) => m._id === message._id))
      })
    }
  }, [wsMessages])

  const handleEmojiSelect = (emoji: any) => {
    const input = document.getElementById("messageInput") as HTMLInputElement
    if (input) {
      input.value += emoji.native
      setShowEmojiPicker(false)
    }
  }

  const handleCreateConversation = async (receiverId: string) => {
      const conversation = await createConversation({ user2Id: receiverId });
      if (conversation) {
        location.reload()
      }
  };
  

  if (conversationLoading || messagesLoading) {
    return <ChatSkeleton />
  }

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader user={user} setShowSidebar={setShowSidebar} setShowUserInfo={setShowUserInfo} showSidebar={showSidebar} />
      <div className="flex h-[calc(100vh-64px)]">
        <ChatSidebar
          conversations={conversations}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          users={users}
          handleCreateConversation={handleCreateConversation}
          latestMessage={latestMessage}
        />
        <div className={` ${showSidebar ? 'hidden' : 'flex-1 flex flex-col'}`}>
          {selectedConversation ? (
            <>
              <div className="p-4 border-b flex gap-2 items-center">
                <div
                  onClick={() => setShowContactInfo(true)}
                  className="border cursor-pointer p-1 rounded-full w-10 h-10 flex items-center justify-center bg-gray-200"
                >
                  <h1 className="font-bold uppercase text-xl">{selectedConversation?.secondUser.name?.charAt(0)}</h1>
                </div>
                <h2 className="text-xl font-bold">{selectedConversation?.secondUser.name}</h2>
              </div>
              <ChatMessages currentMessages={currentMessages} selectedConversation={selectedConversation} formatDate={formatDate} messagesEndRef={messagesEndRef} />
              <ChatInput showEmojiPicker={showEmojiPicker} setShowEmojiPicker={setShowEmojiPicker} handleEmojiSelect={handleEmojiSelect} sendMessage={sendMessage} selectedConversation={selectedConversation} user={user} />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a contact to start chatting
            </div>
          )}
        </div>
      </div>

      <UserInfoDialog showUserInfo={showUserInfo} setShowUserInfo={setShowUserInfo} user={user} disconnectUser={disconnectUser} />
      <ContactInfoDialog showContactInfo={showContactInfo} setShowContactInfo={setShowContactInfo} selectedConversation={selectedConversation} />
    </div>
  )
}

