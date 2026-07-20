import { useEffect } from "react";
import { verifyToken } from "@/lib/verifyToken";
import { TLoggedUser } from "@/types/reduxType";
import { setUser, logOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export const useTokenRefresh = () => {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      if (!token) return;

      try {
        const decodedToken = verifyToken(token) as TLoggedUser;
        const currentTime = Date.now() / 1000;
        const tokenLifetime = decodedToken.exp - decodedToken.iat;
        const expiryBuffer = Math.max(5, tokenLifetime * 0.5);

        console.log("🔍 Token check:", {
          timeUntilExpiry: Math.round(decodedToken.exp - currentTime),
          expiryBuffer: Math.round(expiryBuffer),
          willRefresh: decodedToken.exp < currentTime + expiryBuffer,
        });

        // If token will expire soon or is expired, refresh it
        if (decodedToken.exp < currentTime + expiryBuffer) {
          

          

          const response = await fetch(
            "https://career-path-server-tau.vercel.app/api/v1/auth/refresh-token",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include", // RefreshToken sent automatically via HTTP-only cookie
            }
          );

          if (response.ok) {
            const data = await response.json();

            if (data?.success && data?.data?.accessToken) {
              
              console.log(
                "🔄 New tokens automatically set via HTTP-only cookies by backend"
              );
              const newUser = verifyToken(data.data.accessToken) as TLoggedUser;

              dispatch(
                setUser({
                  user: newUser,
                  token: data.data.accessToken,
                })
              );
            } else {
              
              dispatch(logOut());
            }
          } else {
            
            dispatch(logOut());
          }
        }
      } catch (error) {
        console.error("❌ Error during token check:", error);

        // Don't immediately logout on decode errors, try refresh first
        

        try {
          const response = await fetch(
            "https://career-path-server-tau.vercel.app/api/v1/auth/refresh-token",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );

          if (response.ok) {
            const data = await response.json();
            if (data?.success && data?.data?.accessToken) {
              const newUser = verifyToken(data.data.accessToken) as TLoggedUser;
              dispatch(
                setUser({ user: newUser, token: data.data.accessToken })
              );
              
              return;
            }
          }
        } catch (refreshError) {
          console.error("❌ Recovery refresh failed:", refreshError);
        }

        // Only logout if refresh also fails
        
        dispatch(logOut());
      }
    };

    // Check token immediately
    checkAndRefreshToken();

    // Set up interval to check every 5 seconds for short-lived tokens
    const interval = setInterval(checkAndRefreshToken, 5 * 1000);

    return () => clearInterval(interval);
  }, [token, dispatch]);

  return { user, token };
};
