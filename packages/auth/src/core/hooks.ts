import { useStore } from '@hanabira/store';

import { _authConfig, _handleRedirect, _login, _logout } from './manager';

import type {
  AuthState,
  GuestState,
  LoginFunction,
  LogoutFunction,
} from '../@types/core';

export const useAuthState = (): AuthState => {
  const [user, setUser] = useStore(_authConfig('userKey'));
  const [token, setToken] = useStore(_authConfig('tokenKey'));
  const [refreshToken, setRefreshToken] = useStore(
    _authConfig('refreshTokenKey')
  );

  if (!user || !token) {
    // @ts-expect-error Illegal, but it's okay
    return _handleRedirect('loginPath');
  }

  return {
    user,
    setUser,
    token,
    setToken,
    refreshToken,
    setRefreshToken,
    logout: (callback?: VoidFunction) => {
      _logout({
        callback,
        setUser,
        setToken,
        setRefreshToken,
      });
    },
  };
};

export const useGuestState = (): GuestState => {
  const [user, setUser] = useStore(_authConfig('userKey'));
  const [token, setToken] = useStore(_authConfig('tokenKey'));
  const [, setRefreshToken] = useStore(_authConfig('refreshTokenKey'));

  if (user && token) {
    // @ts-expect-error Illegal, but it's okay
    return _handleRedirect('dashboardPath');
  }

  return {
    login: (data) => {
      _login(data, {
        setUser,
        setToken,
        setRefreshToken,
      });
    },
  };
};

export const useLogin = (): LoginFunction => {
  const [, setUser] = useStore(_authConfig('userKey'));
  const [, setToken] = useStore(_authConfig('tokenKey'));
  const [, setRefreshToken] = useStore(_authConfig('refreshTokenKey'));

  return (data) => {
    _login(data, {
      setUser,
      setToken,
      setRefreshToken,
    });
  };
};

export const useLogout = (): LogoutFunction => {
  const [, setUser] = useStore(_authConfig('userKey'));
  const [, setToken] = useStore(_authConfig('tokenKey'));
  const [, setRefreshToken] = useStore(_authConfig('refreshTokenKey'));

  return (callback?: VoidFunction) => {
    _logout({
      callback,
      setUser,
      setToken,
      setRefreshToken,
    });
  };
};

export const useUser = () => {
  const [user, setUser] = useStore(_authConfig('userKey'));
  const [token, setToken] = useStore(_authConfig('tokenKey'));
  const [refreshToken, setRefreshToken] = useStore(_authConfig('refreshTokenKey'));

  return {
    user,
    setUser,
    token,
    setToken,
    refreshToken,
    setRefreshToken,
  };
};
