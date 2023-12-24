import { createAuth } from '@hanabira/auth';
import { PersistedState, createStore } from '@hanabira/store';

import './../styles/index.css';

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
  plugins: [
    new PersistedState({
      include: ['count'],
    }),
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
