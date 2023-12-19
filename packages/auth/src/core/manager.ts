import { PersistedState, createStore } from '@hanabira/store';

import type { AuthOptions, LoginData, StoreOptions } from '../@types/core';

export class Manager {
  static options: AuthOptions = {
    userKey: 'user',
    tokenKey: 'token',
    refreshTokenKey: 'refreshToken',
    loginPath: '/auth/login',
    logoutPath: '/logout',
    dashboardPath: '/dashboard',
    environment: 'react',
    router: null,
  };

  static set(authOptions?: Partial<AuthOptions>) {
    Manager.options = {
      ...Manager.options,
      ...authOptions,
    };
  }

  static get() {
    return Manager.options;
  }
}

export function createAuth(authOptions?: AuthOptions & StoreOptions) {
  createStore({
    plugins: [
      new PersistedState({
        key: authOptions?.persistKey ?? 'hana-auth',
      }),
    ],
  });

  Manager.set(authOptions);
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
  if (Manager.get().environment === 'react') {
    if (typeof window !== 'undefined') {
      window.location.replace(Manager.get()[to]);
    }
  }
}
