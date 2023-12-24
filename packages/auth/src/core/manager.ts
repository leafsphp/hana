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

  if (authOptions?.type === 'cookie') {
    const cookie = Cookie.withAttributes(authOptions.cookie!);

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
      type: 'localstorage',
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

export function authConfig(item?: keyof AuthOptions) {
  const config = getStore('hanaAuthConfig');

  if (item) {
    return config[item];
  }

  return config;
}

export function login(
  data: LoginData,
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
  setUser(data.user);
  setToken(data.token);

  if (typeof data.refreshToken !== 'undefined') {
    setRefreshToken(data.refreshToken);
  }

  if (data.user) {
    handleRedirect('dashboardPath');
  }
}

export function logout({
  setUser,
  setToken,
  setRefreshToken,
  callback,
}: {
  setUser: (user: any) => void;
  setToken: (token: any) => void;
  setRefreshToken: (refreshToken: any) => void;
  callback?: VoidFunction;
}) {
  setUser(null);
  setToken(null);
  setRefreshToken(null);

  if (typeof callback === 'function') {
    callback();
    handleRedirect('loginPath');
  } else {
    handleRedirect('loginPath');
  }
}

export function handleRedirect(to: 'loginPath' | 'dashboardPath') {
  if (authConfig('environment') === 'react') {
    if (typeof window !== 'undefined') {
      window.location.replace(authConfig(to));
    }
  }

  return null;
}
