import { SetStateAction } from 'react';

import { Options, State } from '../@types/core';
import { SetStoreFn, Reducer } from '../@types/functions';
import Manager from './store';

export function createStore(options?: Options): void {
  return Manager.store(options);
}

export function useStore<StateType = any>(): [State, SetStoreFn<State>];
export function useStore<StateType = any>(
  item: string,
  callback?: (value: StateType) => any
): [StateType, SetStoreFn<StateType>];

export function useStore<StateType = any>(
  item?: string,
  callback?: (value: StateType) => any
): [StateType, SetStoreFn<StateType>] {
  Manager
}

export function useStaticStore<StateType = any>(): [State, SetStoreFn<State>];
export function useStaticStore<StateType = any>(
  item: string
): [StateType, SetStoreFn<StateType>];

/**
 * Use state from store without re-rendering component
 */
export function useStaticStore<StateType = any>(
  item?: string
): [StateType, SetStoreFn<StateType>] {
  return [
    Manager.get(item),
    function (state: SetStateAction<StateType>) {
      Manager.set({
        ...Manager.get(),
        item: state,
      });
    },
  ];
}

export function useReducer<PayloadType = any>(
  reducer: string | Reducer<State>
) {
  //
}

export function setStore<StateType extends State = State>(
  item: SetStateAction<StateType>
) {
  return Manager.set(item);
}
