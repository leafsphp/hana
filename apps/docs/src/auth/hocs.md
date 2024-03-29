# Higher Order Components (HOCs)

HOCs are functions that take in a component and return a new component with additional functionality. Hana Auth provides 2 HOCs that can be used to set/verify auth states for particular routes. These are:

- [`withAuthState`](#withauthstate)
- [`withGuestState`](#withgueststate)

## withAuthState

This HOC is used to verify that the user is authenticated before rendering the component. If the user **is not authenticated**, the user is redirected to the login page.

*The redirect paths can be configured using the `loginPath` and `dashboardPath` options as described [here](/auth/#auth-configuration).*

```jsx
import { withAuthState } from '@hanabira/auth';

const Dashboard = () => {
  return <div>Dashboard</div>;
};

export default withAuthState(Dashboard);
```

This will automatically handle redirects for you, but there is more you can do with this HOC. `withAuthState` also automatically passes the `user`, `token` and `refreshToken` props together with their setter functions and a `logout()` function to your component. This means that you can access the user and token information in the component.

```jsx
import { withAuthState } from '@hanabira/auth';

const Dashboard = ({ user, token, refreshToken, setUser, setToken, setRefreshToken, logout }) => {
  console.log(user, token, refreshToken);

  return (
    <div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default withAuthState(Dashboard);
```

If you're ever in a situation where you need to update the state of the user or tokens, you can use the setter functions to do that.

```jsx
import { withAuthState } from '@hanabira/auth';

const Dashboard = ({ user, token, refreshToken, setUser, setToken, setRefreshToken, logout }) => {
  const updateUser = () => {
    setUser({ name: 'John Doe' });
  };

  const updateToken = () => {
    setToken('new-token');
  };

  const updateRefreshToken = () => {
    setRefreshToken('new-refresh-token');
  };

  return (
    <div>
      <button onClick={() => logout()}>Logout</button>
      <button onClick={() => updateUser()}>Update user</button>
      <button onClick={() => updateToken()}>Update token</button>
      <button onClick={() => updateRefreshToken()}>Update refresh token</button>
    </div>
  );
};
```

**A general rule of thumb is to always `withAuthState` to wrap your components that require authentication.**

## withGuestState

This HOC is used to verify that the user is not authenticated before rendering the component. If the user **is authenticated**, the user is redirected to the "dashboard" page.

*The redirect paths can be configured using the `loginPath` and `dashboardPath` options as described [here](/auth/#auth-configuration).*

```jsx
import { withGuestState } from '@hanabira/auth';

const Login = () => {
  return <div>Login</div>;
};

export default withGuestState(Login);
```

`withGuestState` automatically passes the `login()` function to your component. This function allows you to change the auth state of the user to authenticated and save the user information.

```jsx
import { withGuestState } from '@hanabira/auth';

const Login = ({ login }) => {
  return (
    <div>
      <h2>Login</h2>
      <button
        onClick={() => {
          login({
            user: { name: 'John Doe' },
            token: 'some-token-here',
          });
        }}
      >
        Login
      </button>
    </div>
  );
};

export default withGuestState(Login);
```

This `login()` function takes in an object with the following properties:

- `user`: The user information to save.
- `token`: The token to save.
- `refreshToken`: The refresh token to save.

**A general rule of thumb is to always use `withGuestState` to wrap your components that require the user to be unauthenticated.**
