import React from 'react';
import ReactDOM from 'react-dom/client';

import { createRouter } from '@hanabira/router';
import { PersistedState, createStore } from '@hanabira/store';

import routes from '../.hana/routes.json';

import './index.css';

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
    INCREMENT(state) {
      return {
        count: state.count + 1,
      };
    },
  },
  plugins: [
    // The persisted state plugin allows you to save your
    // global state to local storage. You can remove the plugins
    // section if you don't need it
    PersistedState,
  ],
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {createRouter({
      usePageTransition: true,
      mode: 'history',
      root: import.meta.url,
      routes,
    })}
  </React.StrictMode>
);
