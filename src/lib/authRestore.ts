import Cookies from "js-cookie";
import { verifyToken } from "./verifyToken";
import { TLoggedUser } from "@/types/reduxType";

export const restoreAuthFromCookies = () => {
  try {
    const token = Cookies.get("accessToken");
    

    if (!token) {
      
      return null;
    }

    // Verify token and extract user data
    const user = verifyToken(token) as TLoggedUser;
    

    // Check if token is expired
    const currentTime = Date.now() / 1000;
    if (user.exp < currentTime) {
      
      // Token expired, remove it
      Cookies.remove("accessToken");
      return null;
    }

    
    return { user, token };
  } catch (error) {
    console.error("❌ Error restoring auth from cookies:", error);
    // Remove invalid token
    Cookies.remove("accessToken");
    return null;
  }
};
