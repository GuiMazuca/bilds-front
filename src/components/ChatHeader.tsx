import { Menu } from "lucide-react";
import { Button } from "./ui/button";

interface User {
  name: string;
}

interface ChatHeaderProps {
  user: User | any;
  setShowSidebar: (show: boolean) => void;
  setShowUserInfo: (show: boolean) => void;
  showSidebar: boolean;
}

export function ChatHeader({ user, setShowSidebar, setShowUserInfo, showSidebar }: ChatHeaderProps) {
  return (
    <div className="p-4 border-b flex items-center justify-between w-full">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setShowSidebar(!showSidebar)}>
          <Menu />
        </Button>
        <div
          onClick={() => setShowUserInfo(true)}
          className="border cursor-pointer p-1 rounded-full w-10 h-10 flex items-center justify-center bg-gray-200"
        >
          <h1 className="font-bold uppercase text-xl">{user?.name?.charAt(0)}</h1>
        </div>
        <h2 className="text-xl font-bold ml-2">{user?.name}</h2>
      </div>
    </div>
  )
}
