import { baseUrlApi } from "@/redux/api/baseUrlApi";

const authApi = baseUrlApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags:["User"]
    }),

    getMyProfile: build.query({
      query: (userId) => `/profiles/get-my-profile`,
    }),

    signUp: build.mutation({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: userData,
      }),
    }),

    // signIn
    signIn: build.mutation({
      query: (signInUserData) => ({
        url: "/auth/login",
        method: "POST",
        body: signInUserData,
      }),
    }),

    // forgetPassword
    forgetPassword: build.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: email,
      }),
    }),

    // forgetPassword
    resetPassword: build.mutation({
      query: (resetData) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: resetData,
      }),
    }),
    resendVerifyLink: build.mutation({
      query: (email) => ({
        url: "/auth/resend-verification-link",
        method: "POST",
        body: email,
      }),
    }),
    updateContactInfo: build.mutation({
      query: (contactInfo) => ({
        url: "/users/update",
        method: "PATCH",
        body: contactInfo,
      }),
       invalidatesTags: ['User'],
    }),

    // Define an endpoint to refresh the token
    refreshToken: build.mutation({
      query: (refreshToken) => ({
        url: "/auth/refresh-token",
        method: "POST",
        body: { refreshToken }, // Send the refresh token in the body
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGetMeQuery,
  useGetMyProfileQuery,
  useResendVerifyLinkMutation,
  useUpdateContactInfoMutation,
  useRefreshTokenMutation
} = authApi;
