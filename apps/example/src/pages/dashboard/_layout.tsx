import { getStore, useReducer, useStore } from '@hanabira/store';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useStore('auth.user');
  const setUser = useReducer('auth.setUser');

  console.log('Current user in layout:', users);

  return (
    <div>
      <h1>Layout</h1>
      <h2>This is something else</h2>
      <h3>Another thing</h3>
      {children}
      Current user: {JSON.stringify(getStore('auth.user'), null, 2)} <br />
      <button
        onClick={() =>
          setUsers({
            name: 'Jane Doe',
            email: 'jane@example.com',
          })
        }
      >
        Set User to Jane Doe
      </button>
      <button
        onClick={() => {
          setUser({
            name: 'Jane Reducer',
            email: 'jane@reducer.com',
          });
        }}
      >
        Set Jane via Reducer
      </button>
    </div>
  );
}
