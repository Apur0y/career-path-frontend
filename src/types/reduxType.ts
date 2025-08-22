export type TLoggedUser = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: string;
  profilePic: string;
  isVerified: boolean;
  iat: number;
  exp: number;
};

export type TAuthState = {
  user: null | TLoggedUser;
  token: null | string;
};
