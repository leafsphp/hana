# Auth Hooks

Although Hana Auth provides Higher Order Components (HOCs) to handle authentication, we realize that not everyone likes to use HOCs. So, we also provide hooks to handle authentication as well.

## Auth States

As mentioned in the [introduction](/auth/), there are 2 main auth states: authenticated and unauthenticated. Hana Auth provides 2 hooks that can be used to set/verify auth states for particular routes. These are:

- [`useAuthState`](#useauthstate)
- [`useGuestState`](#usegueststate)

### `useAuthState`

This hook is used to verify that a user is authenticated. If the user is not authenticated, they will be redirected to the login page. If the user is authenticated, this hook will return an object containing the user, tokens and their setters as well as a `logout()` function.

```jsx
import { useAuthState } from '@hanabira/auth';

const MyComponent = () => {
  const { user, token, refreshToken, logout } = useAuthState();

  return (
    <div>
      <p>{user.name}</p>
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}
```

Sometimes, you might need to update the user's information after they have logged in. For example, you might want to replace the user's details after they update their profile. For this, the `useAuthState` hook also returns `setUser`, `setToken` and `setRefreshToken` functions that can be used to update the user's information.

```jsx{4,8,14,15}
import { useAuthState } from '@hanabira/auth';

const MyComponent = () => {
  const { user, setToken, setRefreshToken, setUser } = useAuthState();

  const updateUser = async () => {
    const updatedUser = await fetch('/api/user');
    setUser(updatedUser);
  };

  const updateToken = async () => {
    const updatedToken = await fetch('/api/token');

    setToken(updatedToken.token);
    setRefreshToken(updatedToken.refreshToken);
  };

  return (
    <div>
      <p>{user.name}</p>
      <button onClick={() => updateUser()}>Update User</button>
    </div>
  );
};
```

### `useGuestState`

This hook is used to verify that a user is unauthenticated. If the user is authenticated, they will be redirected to the home page. If the user is unauthenticated, this hook will return an object containing a `login()` function. This function takes in an object containing the user and tokens and sets them in the appropriate storage.

```jsx
import { useGuestState } from '@hanabira/auth';

const MyComponent = () => {
  const { login } = useGuestState();

  const handleLogin = async () => {
    const res = await makeLoginRequest();

    login({
      user: res.user,
      token: res.token,
      refreshToken: res.refreshToken
    });
  }

  return (
    <div>
      <button onClick={() => handleLogin()}>Login</button>
    </div>
  );
}
```

## useLogin

Although `useGuestState` provides a `login()` function, it is not always convenient to use it. For example, if you have a complex authentication sytem, you might want to be able to login from other components. For this, Hana Auth provides a `useLogin` hook that can be used to login a user.

```jsx
import { useLogin } from '@hanabira/auth';

const MyComponent = () => {
  const login = useLogin();

  const handleLogin = async () => {
    const res = await makeLoginRequest();

    login({
      user: res.user,
      token: res.token,
      refreshToken: res.refreshToken
    });
  }

  return (
    <div>
      <button onClick={() => handleLogin()}>Login</button>
    </div>
  );
}
```

The `login()` function in the example above will automatically redirect the user to the home page after they have been logged in. If you however have an operation that you want to perform after the user has been logged in, you can usethe `login()` function as a promise. You can also pass in a `redirect` option to the `login()` function to make sure the redirect does not happen.

```jsx{13,15-17}
import { useLogin } from '@hanabira/auth';

const MyComponent = () => {
  const login = useLogin();

  const handleLogin = async () => {
    const res = await makeLoginRequest();

    login({
      user: res.user,
      token: res.token,
      refreshToken: res.refreshToken,
      redirect: false
    })
      .then(() => {
        // Do something after the user has been logged in
      });
  }

  return (
    <div>
      <button onClick={() => handleLogin()}>Login</button>
    </div>
  );
}
```

## useLogout

This hook is used to logout a user. It clears the user and tokens from the appropriate storage and redirects the user to the login page.

```jsx
import { useLogout } from '@hanabira/auth';

const MyComponent = () => {
  const logout = useLogout();

  return (
    <div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
```

The `logout()` function in the example above will automatically redirect the user to the login page after they have been logged out. If you however have an operation that you want to perform after the user has been logged out, you can usethe `logout()` function as a promise. You can also pass in a `redirect` option to the `logout()` function to make sure the redirect does not happen.

```jsx
import { useLogout } from '@hanabira/auth';

const MyComponent = () => {
  const logout = useLogout();

  const handleLogout = async () => {
    logout({ redirect: false })
      .then(() => {
        // Do something after the user has been logged out
      });
  }

  return (
    <div>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
}
```

## useUser

This hook is used to get the user's information. It returns the user's information if the user is authenticated. The returned object contains the user, tokens and their setters.

```jsx
import { useUser } from '@hanabira/auth';

const MyComponent = () => {
  const { user, token, refreshToken } = useUser();

  return (
    <div>
      <p>{user.name}</p>
    </div>
  );
}
```

## getAuth

You might be in a situation where you need to get the user's information outside of a component. For example, you might need to get the user's information or tokens in a utility function. For this, Hana Auth provides a `getAuth` function that can be used to get the user's information.

```jsx
import { getAuth } from '@hanabira/auth';

const MyComponent = () => {
  const { user, token, refreshToken } = getAuth();

  return (
    <div>
      <p>{user.name}</p>
    </div>
  );
}
```
