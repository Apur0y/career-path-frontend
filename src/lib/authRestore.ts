import Cookies from "js-cookie";
import { verifyToken } from "./verifyToken";
import { TLoggedUser } from "@/types/reduxType";

export const restoreAuthFromCookies = () => {
  try {
    const token = Cookies.get("accessToken");
    console.log("🔍 Restoring auth from cookies, token found:", !!token);

    if (!token) {
      console.log("❌ No token found in cookies");
      return null;
    }

    // Verify token and extract user data
    const user = verifyToken(token) as TLoggedUser;
    console.log("👤 User data extracted:", user);

    // Check if token is expired
    const currentTime = Date.now() / 1000;
    if (user.exp < currentTime) {
      console.log("⏰ Token expired, removing it");
      // Token expired, remove it
      Cookies.remove("accessToken");
      return null;
    }

    console.log("✅ Auth restored successfully");
    return { user, token };
  } catch (error) {
    console.error("❌ Error restoring auth from cookies:", error);
    // Remove invalid token
    Cookies.remove("accessToken");
    return null;
  }
};
