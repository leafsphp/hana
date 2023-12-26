import Cookie from 'js-cookie';
import {
  PersistedState,
  createStore,
  getStore,
  setStore,
} from '@hanabira/store';

import type { AuthOptions, LoginData, StoreOptions } from '../@types/core';

export function createAuth(authOptions?: AuthOptions & StoreOptions) {
  if (typeof window === 'undefined') {
    return;
  }

  let storage = window.localStorage;

  if (authOptions?.cookie) {
    const cookie = Cookie.withAttributes(authOptions.cookie);

    storage = {
      getItem: (key?: string) => (key ? cookie.get(key)! : null),
      setItem: (key: string, value: string) => cookie.set(key, value),
      removeItem: (key: string) => cookie.remove(key),
      length: 0,
      key: (index: number) => '',
      clear: () => {},
    };
  }

  createStore({
    plugins: [
      new PersistedState({
        storage,
        key: authOptions?.persistKey ?? 'hana-auth',
        exclude: ['hanaAuthConfig'],
      }),
    ],
  });

  setStore({
    hanaAuthConfig: {
      userKey: 'user',
      tokenKey: 'token',
      refreshTokenKey: 'refreshToken',
      loginPath: '/auth/login',
      logoutPath: '/logout',
      dashboardPath: '/dashboard',
      environment: 'react',
      router: null,
      ...authOptions,
    },
  });
}

export function getAuth() {
  const user = getStore(_authConfig('userKey'));
  const token = getStore(_authConfig('tokenKey'));
  const refreshToken = getStore(_authConfig('refreshTokenKey'));

  return {
    user,
    token,
    refreshToken,
  };
}

export function _authConfig(item?: keyof AuthOptions) {
  const config = getStore('hanaAuthConfig');

  if (item) {
    return config[item];
  }

  return config;
}

export function _login(
  data: LoginData & { redirect?: boolean },
  {
    setUser,
    setToken,
    setRefreshToken,
  }: {
    setUser: (user: any) => void;
    setToken: (token: string) => void;
    setRefreshToken: (refreshToken: string) => void;
  }
) {
  return new Promise<LoginData>((resolve, reject) => {
    try {
      setUser(data.user);
      setToken(data.token);

      if (typeof data.refreshToken !== 'undefined') {
        setRefreshToken(data.refreshToken);
      }

      if (data.redirect ?? true) {
        _handleRedirect('dashboardPath');
      } else {
        resolve({
          user: data.user,
          token: data.token,
          refreshToken: data.refreshToken,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function _logout({
  setUser,
  setToken,
  setRefreshToken,
  redirect,
}: {
  setUser: (user: any) => void;
  setToken: (token: any) => void;
  setRefreshToken: (refreshToken: any) => void;
  redirect?: boolean;
}) {
  return new Promise((resolve, reject) => {
    try {
      setUser(null);
      setToken(null);
      setRefreshToken(null);

      if (redirect) {
        _handleRedirect('loginPath');
      } else {
        resolve(true);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function _handleRedirect(to: 'loginPath' | 'dashboardPath') {
  if (_authConfig('environment') === 'react') {
    if (typeof window !== 'undefined') {
      window.location.replace(_authConfig(to));
    }
  }

  return null;
}
