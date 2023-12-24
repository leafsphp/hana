import { useStore } from '@hanabira/store';

import { authConfig, handleRedirect, login, logout } from './manager';

import type {
  AuthState,
  GuestState,
  LoginData,
  LoginFunction,
  LogoutFunction,
} from '../@types/core';

export const useAuthState = (): AuthState => {
  const [user, setUser] = useStore(authConfig('userKey'));
  const [token, setToken] = useStore(authConfig('tokenKey'));
  const [refreshToken, setRefreshToken] = useStore(
    authConfig('refreshTokenKey')
  );

  if (!user || !token) {
    // @ts-expect-error Illegal, but it's okay
    return handleRedirect('loginPath');
  }

  return {
    user,
    setUser,
    token,
    setToken,
    refreshToken,
    setRefreshToken,
    logout: (callback?: VoidFunction) => {
      logout({
        callback,
        setUser,
        setToken,
        setRefreshToken,
      });
    },
  };
};

export const useGuestState = (): GuestState => {
  const [user, setUser] = useStore(authConfig('userKey'));
  const [token, setToken] = useStore(authConfig('tokenKey'));
  const [, setRefreshToken] = useStore(authConfig('refreshTokenKey'));

  if (user && token) {
    // @ts-expect-error Illegal, but it's okay
    return handleRedirect('dashboardPath');
  }

  return {
    login: (data) => {
      login(data, {
        setUser,
        setToken,
        setRefreshToken,
      });
    },
  };
};

export const useLogin = (): LoginFunction => {
  const [, setUser] = useStore(authConfig('userKey'));
  const [, setToken] = useStore(authConfig('tokenKey'));
  const [, setRefreshToken] = useStore(authConfig('refreshTokenKey'));

  return (data) => {
    login(data, {
      setUser,
      setToken,
      setRefreshToken,
    });
  };
};

export const useLogout = (): LogoutFunction => {
  const [, setUser] = useStore(authConfig('userKey'));
  const [, setToken] = useStore(authConfig('tokenKey'));
  const [, setRefreshToken] = useStore(authConfig('refreshTokenKey'));

  return (callback?: VoidFunction) => {
    logout({
      callback,
      setUser,
      setToken,
      setRefreshToken,
    });
  };
};

export const useUser = (): LoginData => {
  const [user] = useStore(authConfig('userKey'));
  const [token] = useStore(authConfig('tokenKey'));
  const [refreshToken] = useStore(authConfig('refreshTokenKey'));

  return {
    user,
    token,
    refreshToken,
  };
};
