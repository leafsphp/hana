import { createAuth } from '@hanabira/auth';
import { type Module, PersistedState, createStore } from '@hanabira/store';

import './../styles/index.css';

const authModule: Module = {
  namespace: 'auth',
  state: {
    user: {
      name: 'Test User',
      email: 'test@example.com',
    },
  },
  reducers: {
    setUser(state, user) {
      return {
        ...state,
        user,
      };
    },
  },
};

createStore({
  state: {
    count: 0,
  },
  reducers: {
    increment(state) {
      return {
        count: state.count + 1,
      };
    },
  },
  modules: [authModule],
  plugins: [
    new PersistedState(),
  ],
});

const Application: React.FC<React.PropsWithChildren> = ({ children }) => {
  createAuth({
    cookie: {
      path: '/',
      expires: 60,
      domain: 'localhost',
      sameSite: 'Lax',
    },
  });

  return <>{children}</>;
};

export default Application;
