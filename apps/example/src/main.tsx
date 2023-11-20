import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { PersistedState, createStore } from '@hanabira/store';

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
