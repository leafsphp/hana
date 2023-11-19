import React from 'react';
import Manager from './store';

export default function getContext() {
  return React.createContext(Manager);
}
