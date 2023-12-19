import { withGuestState } from '@hanabira/auth';

const Login = withGuestState(({ login }: any) => {
  return (
    <div>
      <h1>Login</h1>
      <button
        onClick={() =>
          login({
            user: {
              name: 'John Doe',
            },
            token: '1234567890',
          })
        }
      >
        Login
      </button>
    </div>
  );
});

export default Login;
