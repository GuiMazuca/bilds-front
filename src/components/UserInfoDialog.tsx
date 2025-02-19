import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";

interface User {
  name?: string;
  email?: string;
  phone?: string;
}

interface UserInfoDialogProps {
  showUserInfo: boolean;
  setShowUserInfo: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  disconnectUser: () => void;
}

export function UserInfoDialog({ showUserInfo, setShowUserInfo, user, disconnectUser }: UserInfoDialogProps) {
  return (
    <Dialog open={showUserInfo} onOpenChange={setShowUserInfo}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Information</DialogTitle>
          <DialogDescription>Your profile details</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 pt-4">
          <div className="border p-1 rounded-full w-20 h-20 flex items-center justify-center bg-gray-200">
            <h1 className="font-bold uppercase text-4xl">{user?.name?.charAt(0)}</h1>
          </div>
          <p className="text-lg font-semibold">{user?.name}</p>
          <p>{user?.email}</p>
          <p>{user?.phone}</p>
          <Button onClick={disconnectUser} variant="destructive" className="w-full">
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
