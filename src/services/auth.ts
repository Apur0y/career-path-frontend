// ✅ CLIENT-SIDE login function
export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const res = await fetch(`http://172.252.13.71:5005/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    });

    const result = await res.json();

    // ✅ Backend now sets HTTP-only cookies automatically
    // No need to manually set cookies here
    console.log("✅ Login response received, HTTP-only cookies set by backend");

    return result;
  } catch (err: any) {
    console.error("❌ Login error:", err);
    return { success: false, message: "Login failed" };
  }
};

// ✅ Get current user from Redux state (client-side)
export const getCurrentUser = () => {
  try {
    // Since we're using HTTP-only cookies, we can't access them from client
    // Get user from Redux state instead
    return null;
  } catch (err) {
    return null;
  }
};

export const getNewToken = async () => {
  try {
    const res = await fetch(
      `http://172.252.13.71:5005/api/v1/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // RefreshToken sent automatically via HTTP-only cookie
      }
    );

    const result = await res.json();

    console.log("🔄 Refresh result:", result);

    if (result?.success) {
      console.log("✅ Token refreshed successfully");
      console.log(
        "🔄 New tokens automatically set via HTTP-only cookies by backend"
      );
    }

    return result;
  } catch (err: any) {
    console.error("❌ Token refresh error:", err);
    return { success: false, message: "Token refresh failed" };
  }
};

// Client-side version for RTK Query
export const refreshTokenClient = async () => {
  try {
    const res = await fetch(
      `http://172.252.13.71:5005/api/v1/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // RefreshToken sent automatically via HTTP-only cookie
      }
    );

    const result = await res.json();

    if (result?.success) {
      console.log(
        "✅ Client refresh successful, HTTP-only cookies updated by backend"
      );
      // Return the new token so RTK Query can use it
      return result?.data?.accessToken;
    }

    return null;
  } catch (err: any) {
    console.error("Token refresh failed:", err);
    return null;
  }
};
