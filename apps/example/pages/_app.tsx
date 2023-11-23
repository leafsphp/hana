import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRouter } from '@hanabira/router';
import { PersistedState, createStore } from '@hanabira/store';

import _404 from '../.hana/_404-page.json';
import routes from '../.hana/routes.json';
import errorPages from '../.hana/error-pages.json';
import loadingPages from '../.hana/loading-pages.json';

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
      root: import.meta.url,
      loadingPages,
      errorPages,
      _404,
      routes,
    })}
  </React.StrictMode>
);
