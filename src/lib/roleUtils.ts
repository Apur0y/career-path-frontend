import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export interface UserInfo {
  role?: string;
  exp: number;
  [key: string]: any;
}

export const getRoleFromToken = (): string | null => {
  try {
    const token = Cookies.get("accessToken");
    if (!token) return null;
    
    const decoded = jwtDecode(token) as UserInfo;
    return decoded.role || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const getRedirectPathByRole = (role: string | null): string => {
  switch (role) {
    case "JOB_SEEKER":
      return "/jobSeeker/home";
    case "EMPLOYER":
      return "/employer/dashboard"; // Adjust this path based on your employer routes
    case "SUPER_ADMIN":
      return "/dashboard";
    default:
      return "/"; // Default to home page
  }
};

export const validateAndRedirect = (): string => {
  const role = getRoleFromToken();
  return getRedirectPathByRole(role);
};

// Debug function to log current token info
export const debugTokenInfo = (): void => {
  try {
    const token = Cookies.get("accessToken");
    if (!token) {
      console.log("No access token found");
      return;
    }
    
    const decoded = jwtDecode(token) as UserInfo;
    console.log("Current token info:", {
      role: decoded.role,
      exp: new Date(decoded.exp * 1000).toISOString(),
      isExpired: decoded.exp * 1000 < Date.now()
    });
  } catch (error) {
    console.error("Error debugging token:", error);
  }
}; 