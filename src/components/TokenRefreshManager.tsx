"use client";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";

export default function TokenRefreshManager() {
  // This component will automatically handle token refresh
  useTokenRefresh();
  return null; // This component doesn't render anything
}
