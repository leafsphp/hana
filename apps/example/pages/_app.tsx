import nprogress from 'nprogress';
import React, { useEffect } from 'react';
import { PersistedState, createStore } from '@hanabira/store';

import './index.css';

createStore({
  state: {
    count: 0,
  },
  reducers: {
    INCREMENT(state) {
      return {
        count: state.count + 1,
      };
    },
  },
  plugins: [PersistedState],
});

const Application: React.FC<React.PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    nprogress.start();

    setTimeout(() => {
      // will figure this out later
      // this won't work because it needs the location object
      // that is passed to the router, but at this point the router
      // hasn't been initialized yet
      nprogress.done();
    }, 3000);
  }, []);

  return <>{children}</>;
};

export default Application;
