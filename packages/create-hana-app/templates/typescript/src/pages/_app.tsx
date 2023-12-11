import React from 'react';
import { PersistedState, createStore } from '@hanabira/store';

import './../styles/index.css';

/**
 * Hana store allows you to use global state in your application.
 * This createStore function allows you to set default state and reducers.
 * It also allows you to use plugins. It is not required, but
 * is useful depending on your use case.
 */
createStore({
  // This is your default global state. It is setup and loaded
  // before your application renders
  state: {
    count: 0,
  },

  // reducers are functions that allow you to update your state
  // you can call them using useReducer('REDUCER_NAME')
  reducers: {
    increment(state) {
      return {
        count: state.count + 1,
      };
    },
  },
  plugins: [
    // The persisted state plugin allows you to save your
    // global state to local storage. You can remove the plugins
    // section if you don't need it
    PersistedState
  ],
});

const Application: React.FC<React.PropsWithChildren> = ({ children }) => {
  /**
   * This is the root of your application. You can add any
   * global components here. You can also add a global layout
   * here if you want to wrap all of your pages in a layout.
   */
  return <>{children}</>;
};

export default Application;
