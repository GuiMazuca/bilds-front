
interface User {
  _id: string;
  name: string;
}

interface Message {
  conversation: string;
  content: string;
}

interface Conversation {
  _id: string;
  secondUser: User;
  lastMessage?: Message;
}

interface ChatSidebarProps {
  conversations: Conversation[] | any;
  selectedConversation: Conversation | null | any;
  setSelectedConversation: (conversation: Conversation | any) => void | any;
  showSidebar: boolean | any;
  setShowSidebar: (show: boolean) => void | any;
  users: User[] | any;
  handleCreateConversation: (userId: string) => void | any;
  latestMessage: Message | null | any;
}

export function ChatSidebar({
  conversations,
  selectedConversation,
  setSelectedConversation,
  showSidebar,
  setShowSidebar,
  users,
  handleCreateConversation,
  latestMessage,
}: ChatSidebarProps) {
  return (
    <div className={`${showSidebar ? "block" : "hidden"} md:block w-full md:w-1/4 border-r`}>
      <h2 className="p-4 text-xl font-bold">Contacts</h2>
      <ul>
        {conversations &&
          conversations.map((conversation: Conversation) => (
            <li
              key={conversation._id}
              className={`flex gap-2 items-center p-4 hover:bg-gray-100 cursor-pointer ${selectedConversation?._id === conversation._id ? "bg-gray-200" : ""
                }`}
              onClick={() => {
                setSelectedConversation(conversation)
                setShowSidebar(false)
              }}
            >
              <div className="border cursor-pointer p-1 rounded-full w-10 h-10 flex items-center justify-center bg-gray-200">
                <h1 className="font-bold uppercase text-xl">{conversation?.secondUser.name?.charAt(0)}</h1>
              </div>
              <div>
                <h3 className="font-semibold">{conversation?.secondUser.name}</h3>
                <p className="text-sm text-gray-600">
                  {conversation?._id === latestMessage?.conversation
                    ? latestMessage?.content
                    : conversation?.lastMessage?.content}
                </p>
              </div>
            </li>
          ))}
      </ul>
      {users && users.length > 0 && (
        <>
          <hr className="my-4" />
          <h2 className="p-4 text-xl font-bold">New Contacts</h2>
        </>
      )}
      <ul>
        {users &&
          users.map((user: User) => (
            <li
              key={user._id}
              className="flex gap-2 items-center p-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                handleCreateConversation(user._id)
              }}
            >
              <div className="border cursor-pointer p-1 rounded-full w-10 h-10 flex items-center justify-center bg-gray-200">
                <h1 className="font-bold uppercase text-xl">{user.name?.charAt(0)}</h1>
              </div>
              <div>
                <h3 className="font-semibold">{user.name}</h3>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
