"use client"

import { useAuthStore } from "@/store/auth.store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";


export default function RootLayoutProtect({ children }: { children: React.ReactNode }) {
  const { user, fetchUser } = useAuthStore();
  const path = usePathname();

  useEffect(() => {
    const loginPath = path?.includes("/login") ?? false;
    const registerPath = path?.includes("/register") ?? false;
    if (!user && !loginPath && !registerPath) {
      fetchUser();
    }
  }, [user, fetchUser, path]);
  return (<>{children}</>);
}
