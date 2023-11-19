import { SetStateAction } from 'react';
import useForceUpdate from 'use-force-update';

import Manager from './store';

import { Options, State } from '../@types/core';
import { SetStoreFn, Reducer } from '../@types/functions';

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
  const forceUpdate = useForceUpdate();
  const removeForceUpdateListener = (): void => {
    // Manager.removePropertyListener(forceUpdate);
  };

  const state = Manager.get(item);

  const stateSetter: SetStoreFn<StateType> = (value) => {
    if (typeof value === 'function') {
      const callableState = value as (prevState: StateType) => State;
      Manager.set(callableState(state));
    } else {
      Manager.set(value);
    }

    Manager.applyPluginHook('onSave', Manager.get());
  };

  // If this component ever updates or unmounts, remove the force update
  //   listener.
  // useEffect((): VoidFunction => removeForceUpdateListener, []);

  return [state, stateSetter];
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
