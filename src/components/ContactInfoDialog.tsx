import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";

interface User {
  name: string;
  email: string;
  phone: string;
}

interface Conversation {
  secondUser: User;
}

interface ContactInfoDialogProps {
  showContactInfo: boolean;
  setShowContactInfo: Dispatch<SetStateAction<boolean>>;
  selectedConversation: Conversation | null | any;
}

export function ContactInfoDialog({ showContactInfo, setShowContactInfo, selectedConversation }: ContactInfoDialogProps) {
  return (
    <Dialog open={showContactInfo} onOpenChange={setShowContactInfo}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact Information</DialogTitle>
          <DialogDescription>Details about {selectedConversation?.secondUser.name}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 pt-4">
          <div className="border p-1 rounded-full w-20 h-20 flex items-center justify-center bg-gray-200">
            <h1 className="font-bold uppercase text-4xl">{selectedConversation?.secondUser.name?.charAt(0)}</h1>
          </div>
          <p className="text-lg font-semibold">{selectedConversation?.secondUser.name}</p>
          <p>{selectedConversation?.secondUser.email}</p>
          <p>{selectedConversation?.secondUser.phone}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
