import { parseCookies } from "nookies";
import { decryptToken } from "./utils";

export const getCookies = async (key: string) => {
  const cookies = parseCookies();
  if (!cookies[key]) return null;

  const decryptedValue = decryptToken(cookies[key]);
  return decryptedValue ? { key, value: decryptedValue } : null;
};
