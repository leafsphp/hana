import Manager from './store';

import type { SetStateAction } from 'react';
import type { Options, State } from '../@types';

export function createStore(options?: Options): void {
  return Manager.store(options);
}

export function setStore<StateType extends State = State>(
  item: SetStateAction<StateType>
) {
  return Manager.set(item, true, false);
}

export function getStore<StateType = any>(item?: string): StateType {
  return Manager.get(item);
}

export function resetStore() {
  return Manager.reset();
}
