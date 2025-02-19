export function ChatMessages({ currentMessages, selectedConversation, formatDate, messagesEndRef }) {
  return (
    <div className={`flex-1 overflow-y-auto max-h-[calc(100vh-200px)] p-4`}>
      {currentMessages &&
        currentMessages.map((message: MessageOutPut, index: any) => (
          <div
            key={index}
            className={`mb-4 ${message.sender.name === selectedConversation.secondUser.name ? "text-left" : "text-right"}`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${message.sender.name === selectedConversation.secondUser.name
                ? "bg-gray-200"
                : "bg-blue-500 text-white"
                }`}
            >
              {message.content}
            </div>
            <div className="text-xs text-gray-500 mt-1">{formatDate(message.updatedAt)}</div>
          </div>
        ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
