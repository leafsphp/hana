import { useGuestState } from '@hanabira/auth';

export default function Register() {
  const guestState = useGuestState();

  if (!guestState) {
    return null;
  }

  return (
    <div>
      <h1>Register</h1>
      <button
        onClick={() => {
          guestState.login({
            user: {
              name: 'Michael',
            },
            token: '1234567890',
          });
        }}
      >
        Register
      </button>
    </div>
  );
}
