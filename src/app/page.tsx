import ChatPage from "@/components/Chat";
import { metadata } from "./layout";

export default async function Page() {
metadata.title = "Bilds - Chat";
  return (
    <div className=" w-full">
      <ChatPage />
    </div>
  );
}
