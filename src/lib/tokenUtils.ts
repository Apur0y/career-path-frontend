import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export interface TokenData {
  accessToken: string;
  refreshToken?: string;
}

export interface DecodedToken {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profilePic: string;
  isVerified: boolean;
  iat: number;
  exp: number;
}

/**
 * Cookie configuration for secure token storage
 */
export const COOKIE_CONFIG = {
  ACCESS_TOKEN: {
    expires: 7, // 7 days
    path: "/",
    sameSite: "lax" as const,
    secure: false, // Set to true in production with HTTPS
  },
  REFRESH_TOKEN: {
    expires: 30, // 30 days
    path: "/",
    sameSite: "lax" as const,
    secure: false, // Set to true in production with HTTPS
  },
};

/**
 * Store authentication tokens in cookies with consistent security settings
 */
export const storeTokens = (tokenData: TokenData) => {
  Cookies.set("accessToken", tokenData.accessToken, COOKIE_CONFIG.ACCESS_TOKEN);

  // If refresh token is provided, store it. Otherwise, use access token as refresh token
  const refreshToken = tokenData.refreshToken || tokenData.accessToken;
  Cookies.set("refreshToken", refreshToken, COOKIE_CONFIG.REFRESH_TOKEN);
};

/**
 * Get access token from cookies
 */
export const getAccessToken = (): string | undefined => {
  return Cookies.get("accessToken");
};

/**
 * Get refresh token from cookies
 */
export const getRefreshToken = (): string | undefined => {
  return Cookies.get("refreshToken");
};

/**
 * Clear all authentication tokens and storage
 */
export const clearTokens = () => {
  // Clear cookies with path specification
  Cookies.remove("accessToken", { path: "/" });
  Cookies.remove("refreshToken", { path: "/" });

  // Clear localStorage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  console.log("🧹 All tokens cleared from cookies and localStorage");
};

/**
 * Check if access token is expired
 */
export const isTokenExpired = (token?: string): boolean => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token) as DecodedToken;
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

/**
 * Get user info from access token
 */
export const getUserFromToken = (token?: string): DecodedToken | null => {
  const accessToken = token || getAccessToken();
  if (!accessToken) return null;

  try {
    return jwtDecode(accessToken) as DecodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

/**
 * Check if user is authenticated (has valid token)
 */
export const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  return token ? !isTokenExpired(token) : false;
};
