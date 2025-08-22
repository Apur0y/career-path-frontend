# Token Management System

This directory contains utilities for managing authentication tokens in the application.

## Token Utilities (`tokenUtils.ts`)

The `tokenUtils` object provides a centralized way to manage authentication tokens:

### Functions

- `getAccessToken()`: Get the current access token from cookies
- `getRefreshToken()`: Get the current refresh token from cookies
- `setAccessToken(token)`: Store an access token in cookies
- `setRefreshToken(token)`: Store a refresh token in cookies
- `clearTokens()`: Remove all tokens from cookies
- `isAuthenticated()`: Check if user is currently authenticated
- `isTokenExpired(token)`: Check if a JWT token is expired
- `logout()`: Clear tokens and redirect to login page

### Usage

```typescript
import { tokenUtils } from "@/lib/tokenUtils";

// Store tokens after login
tokenUtils.setAccessToken(accessToken);
tokenUtils.setRefreshToken(refreshToken);

// Check authentication status
if (tokenUtils.isAuthenticated()) {
  // User is logged in
}

// Logout user
tokenUtils.logout();
```

## Automatic Token Refresh

The application automatically handles token refresh when API calls return 401 (Unauthorized) errors:

1. When an API call fails with 401, the system automatically calls the refresh token API
2. If the refresh is successful, the new access token is stored and the original request is retried
3. If the refresh fails, the user is redirected to the login page

### How it works

1. User logs in → Both access token and refresh token are stored in cookies
2. API calls use the access token for authentication
3. When access token expires → 401 error is returned
4. System automatically calls `/auth/refresh-token` with the refresh token
5. New access token is received and stored
6. Original API call is retried with the new token

### Configuration

The token refresh mechanism is configured in `src/redux/api/baseUrlApi.ts` and uses the `useRefreshTokenMutation` from the auth API.

## Cookie Structure

- `accessToken`: Contains the JWT access token used for API authentication
- `refreshToken`: Contains the JWT refresh token used to get new access tokens

## Security Notes

- Refresh tokens have longer expiration times than access tokens
- Access tokens are used for all API calls
- Refresh tokens are only used when access tokens expire
- Both tokens are stored in HTTP-only cookies for security 