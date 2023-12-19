import { getStore, useStore } from '@hanabira/store';
import { Manager, handleRedirect, login, logout } from './manager';

import type { AuthState, GuestState, LoginData, LoginFunction, LogoutFunction } from '../@types/core';

export const useAuthState = (): AuthState => {
  const [user, setUser] = useStore(Manager.get().userKey);
  const [token, setToken] = useStore(Manager.get().tokenKey);
  const [refreshToken, setRefreshToken] = useStore(Manager.get().refreshTokenKey);

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
  const [user, setUser] = useStore(Manager.get().userKey);
  const [token, setToken] = useStore(Manager.get().tokenKey);
  const [, setRefreshToken] = useStore(Manager.get().refreshTokenKey);

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
  const [, setUser] = useStore(Manager.get().userKey);
  const [, setToken] = useStore(Manager.get().tokenKey);
  const [, setRefreshToken] = useStore(Manager.get().refreshTokenKey);

  return (data) => {
    login(data, {
      setUser,
      setToken,
      setRefreshToken,
    });
  };
};

export const useLogout = (): LogoutFunction => {
  const [, setUser] = useStore(Manager.get().userKey);
  const [, setToken] = useStore(Manager.get().tokenKey);
  const [, setRefreshToken] = useStore(Manager.get().refreshTokenKey);

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
  return {
    user: getStore(Manager.get().userKey),
    token: getStore(Manager.get().tokenKey),
    refreshToken: getStore(Manager.get().refreshTokenKey),
  };
};
