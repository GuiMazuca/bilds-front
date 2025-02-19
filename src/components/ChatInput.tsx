import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Smile } from "lucide-react"
import { Button } from "./ui/button"

export function ChatInput({ showEmojiPicker, setShowEmojiPicker, handleEmojiSelect, sendMessage, selectedConversation, user }) {
  return (
    <div className="p-4 border-t flex items-center relative">
      <Button variant="ghost" size="icon" className="mr-2" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
        <Smile />
      </Button>
      {showEmojiPicker && (
        <div className="absolute bottom-12 left-0">
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        </div>
      )}
      <input
        id="messageInput"
        type="text"
        placeholder="Type a message..."
        className="w-full p-2 border rounded-lg"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.currentTarget.value) {
            sendMessage(selectedConversation.secondUser._id, user?._id as string, e.currentTarget.value)
            e.currentTarget.value = ""
          }
        }}
      />
    </div>
  )
}
