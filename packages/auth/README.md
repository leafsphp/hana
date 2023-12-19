# Hana Auth

Hana auth is a lightweight authentication service for React-based applications. It gives you these features out of the box:

- Simple authentication flow
- Lightweight and easy to use
- Strongly typed with Typescript

## Example

```jsx
import { useLogin, GuestState } from '@hanabira/auth';

const MyPage = () => {
  const login = useLogin();

  return (
    <GuestState>
      <button
        onClick={() => {
          login({
            token: 'some-token',
            user: { name: 'John Doe' },
          });
        }}
      >
        Login
      </button>
    </GuestState>
  );
}

export default MyPage;
```

```jsx
import { withGuestState } from '@hanabira/auth';

const MyPage = ({ login }) => {
  return (
    <button
      onClick={() => {
        login({
          token: 'some-token',
          user: { name: 'John Doe' },
        });
      }}
    >
      Login
    </button>
  );
}

export default withGuestState(MyPage);
```

## Installation

```bash
npm i @hanabira/auth # npm users
yarn add @hanabira/auth # yarn users
pnpm i @hanabira/auth # pnpm users
```
