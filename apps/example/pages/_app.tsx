import React from 'react';
import ReactDOM from 'react-dom/client';
import { PersistedState, createStore } from '@hanabira/store';

import App from './App.tsx';

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
    <App />
  </React.StrictMode>
);
