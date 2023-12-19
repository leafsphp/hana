import React from 'react';
import { useAuthState, useGuestState } from './hooks';

export function withAuthState<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WithAuth(props: P) {
    const authState = useAuthState();

    if (!authState) {
      return null;
    }

    return React.createElement(Component, {
      ...props,
      ...authState,
    });
  };
}

export function withGuestState<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WithGuest(props: P) {
    const guestState = useGuestState();

    if (!guestState) {
      return null;
    }

    return React.createElement(Component, {
      ...props,
      ...guestState,
    });
  };
}
