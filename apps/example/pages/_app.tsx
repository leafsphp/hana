import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRouter } from '@hanabira/router';
import { PersistedState, createStore } from '@hanabira/store';

import routes from '../.hana/routes.json';

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {createRouter({
      mode: 'hash',
      root: import.meta.url,
      routes,
    })}
  </React.StrictMode>
);
