import { useCookies } from "react-cookie";

export default function useAuthToken() {
  const [cookie,setCookie, removeCookie] = useCookies();
  const token = cookie["x-auth"];
  const isAuthenticated = !!token;

  return [token, isAuthenticated, removeCookie, setCookie]
}