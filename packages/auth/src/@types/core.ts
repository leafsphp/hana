import { SetStoreFn } from '@hanabira/store';

export type StoreOptions = {
  // persist?: boolean;
  persistKey?: string;
}

export type AuthOptions = {
  userKey: string;
  tokenKey: string;
  refreshTokenKey: string;
  loginPath: string;
  logoutPath: string;
  dashboardPath: string;
  environment: 'react' | 'react-native';
  router: any;
};

export type LoginData = {
  user: any;
  token: string;
  refreshToken?: string;
};

export type AuthState = {
  user: any;
  setUser: SetStoreFn;
  token: string;
  setToken: SetStoreFn;
  refreshToken?: string;
  setRefreshToken: SetStoreFn;
  logout: LogoutFunction;
};

export type GuestState = {
  login: LoginFunction;
};

export type LoginFunction = (data: LoginData) => void;
export type LogoutFunction = (callback?: VoidFunction) => void;
