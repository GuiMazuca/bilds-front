import { create } from "zustand";
import { setCookie, destroyCookie, parseCookies } from "nookies";

import { me, User } from "@/modules/user/me";
import { decryptToken, encryptToken } from "@/lib/utils";

interface AuthState {
  token: string | null;
  user: User | null;
  login: (token: string, user: { name: string; email: string }) => void;
  logout: () => void;
  fetchUser: () => void;
}

const cookies = parseCookies();
const encryptedTokenFromCookies = cookies.token || null;
const decryptedToken = encryptedTokenFromCookies ? decryptToken(encryptedTokenFromCookies) : null;

export const useAuthStore = create<AuthState>((set) => ({
  token: decryptedToken,
  user: null,

  login: (token) => {
    const encryptedToken = encryptToken(token);

    setCookie(null, "token", encryptedToken, {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: false,
    });

    set({ token });
  },

  logout: () => {
    destroyCookie(null, "token");
    set({ token: null, user: null });
  },

  fetchUser: async () => {
    const user = await me();
    if (!user.name) {
      location.replace("/login");
    }
    set({ user });
  },
}));
