# Authentication

Authentication on the frontend is usually handled using a JWT. This is a token that is sent to the frontend from the backend and is used to authenticate the user. The token is usually stored in the browser's local storage and is sent to the backend on every request. The backend then verifies the token and returns the data if the token is valid.

Implementing this functionality can be a bit tricky. Hana provides a simple way to implement authentication in your apps without going through all of the stress you usually would.

## The auth component

Hana provides an Auth utility that takes care of authentication features like saving token and user information, verifying auth states, handling redirects and so much more.

## Installation

You can quickly get started with Hana Auth using your favourite package manager.

```bash
npm i @hanabira/auth # npm
yarn add @hanabira/auth # yarn
pnpm add @hanabira/auth # pnpm
```

## Getting started

After installing Hana Auth, the first thing to do is to initialize your authentication using the `createAuth` function.

```ts
import { createAuth } from '@hanabira/auth';

createAuth();
```

This function takes in an optional config object that can be used to configure the auth utility. It is recommended to call this function in your root component so that it is only called once.

## Auth Configuration

The config object has the following properties:

- `tokenKey`: The key to use when saving the token to local storage. Defaults to `token`.
- `userKey`: The key to use when saving the user to local storage. Defaults to `user`.
- `refreshTokenKey`: The key to use when saving the refresh token to local storage. Defaults to `refreshToken`.
- `loginPath`: The path to redirect to when the user is not authenticated. Defaults to `/login`.
- `logoutPath`: The path to redirect to when the user logs out. Defaults to `/login`.
- `dashboardPath`: The path to redirect to when the user is authenticated. Defaults to `/dashboard`.
- `cookie`: Options to use when saving information to a cookie.

```tsx
import { createAuth } from '@hanabira/auth';

...

createAuth({
  tokenKey: 'token',
  userKey: 'user',
  refreshTokenKey: 'refreshToken',
  loginPath: '/login',
  dashboardPath: '/dashboard',
});
```

## Authentication types

The auth utility provides different types of authentication. These types are:

- `localstorage`: This type of authentication uses the browser's local storage to save the token and user information. This is the default type of authentication.
- `cookie`: This type of authentication uses cookies to save the token and user information.

Auth with local storage is the default type of authentication. To use cookie authentication, you need to pass in the `cookie` option to the `createAuth` function.

```ts
import { createAuth } from '@hanabira/auth';

createAuth({
  cookie: {
    path: '/',
    expires: 60,
    domain: 'localhost',
    sameSite: 'Lax',
  },
});
```

The `cookie` option takes in the following properties:

- `path`: The path where the cookie is available. Defaults to `/`.
- `expires`: Define when the cookie will be removed. Value can be a Number which will be interpreted as days from time of creation or a Date instance. If omitted, the cookie becomes a session cookie.
- `domain`: Define the domain where the cookie is available. Defaults to the domain of the page where the cookie was created.
- `sameSite`: Asserts that a cookie must not be sent with cross-origin requests,providing some protection against cross-site request forgery attacks (CSRF)
- `secure`: A boolean indicating if the cookie transmission requires a secure protocol (https). Defaults to false.

From here, everything else is the same as local storage authentication.

## Auth states

Generally, there are two auth states: authenticated and unauthenticated. When the user is authenticated, the auth utility saves the token and user information to the appropriate storage. This information is then used to verify the auth state of the user and is removed when the user logs out. Hana Auth provides multiple ways to change and verify the auth state of the user.

Hana provides 2 main ways to set/verify auth states for particular routes. These are:

- [Using Higher Order Components (HOCs)](/docs/auth/hocs)
- [Using hooks](/docs/auth/hooks)
