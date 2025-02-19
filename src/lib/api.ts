import { getCookies } from "./get-cookies";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const api = {
  get: async (url: string, auth = false) => {
    const cookiesStore = auth ? await getCookies("token") : null;
    const token = auth ? cookiesStore?.value : null;

    const res = await fetch(`${BASE_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!res) throw new Error(`Error: ${res}`);
    return res.json();
  },

  post: async (url: string, data: any, auth = false) => {
    const cookiesStore = auth ? await getCookies("token") : null;
    const token = auth ? cookiesStore?.value : null;

    const res = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return res.json();
  },

  patch: async (url: string, data: any, auth = false) => {
    const cookiesStore = auth ? await getCookies("token") : null;
    const token = auth ? cookiesStore?.value : null;

    const res = await fetch(`${BASE_URL}${url}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return res.json();
  },

  delete: async (url: string, auth = false) => {
    const cookiesStore = auth ? await getCookies("token") : null;
    const token = auth ? cookiesStore?.value : null;

    const res = await fetch(`${BASE_URL}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return res.json();
  },
};
