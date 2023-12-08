import useForceUpdate from 'use-force-update';

import Manager from './store';

import type { SetStateAction } from 'react';
import type { State } from '../@types/core';
import type { SetStoreFn, Reducer } from '../@types/functions';

export function useStore<StateType = any>(): [State, SetStoreFn<State>];
export function useStore<StateType = any>(
  item: string,
  callback?: (value: StateType) => any
): [StateType, SetStoreFn<StateType>];

export function useStore<StateType = any>(
  item?: string
): [StateType, SetStoreFn<StateType>] {
  const forceUpdate = useForceUpdate();

  const stateSetter: SetStoreFn<StateType> = (value) => {
    let stateValue: State = value as State;
    let stateToSet = stateValue;

    if (typeof value === 'function') {
      const callableState = value as (prevState: StateType) => State;
      stateValue = callableState(Manager.get(item));
    }

    if (item) {
      stateToSet = { [item]: stateValue };
    }

    Manager.set(stateToSet);
    Manager.applyPluginHook('onSave', Manager.get());
    forceUpdate();
  };

  return [Manager.get(item), stateSetter];
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
  const stateSetter: SetStoreFn<StateType> = (value) => {
    let stateValue: State = value as State;
    let stateToSet = stateValue;

    if (typeof value === 'function') {
      const callableState = value as (prevState: StateType) => State;
      stateValue = callableState(Manager.get(item));
    }

    if (item) {
      stateToSet = { [item]: stateValue };
    }

    Manager.set(stateToSet);
  };

  return [Manager.get(item), stateSetter];
}

export function useSetStore<StateType extends State = State>(): (
  value: StateType
) => void {
  const forceUpdate = useForceUpdate();

  return (value: SetStateAction<StateType>) => {
    Manager.set(value);
    forceUpdate();
  };
}

export function useReducer<PayloadType = any>(
  reducer: string | Reducer<State>
) {
  const forceUpdate = useForceUpdate();

  return Manager.useReducer<PayloadType>(reducer, forceUpdate);
}

export function useStaticReducer<PayloadType = any>(
  reducer: string | Reducer<State>
) {
  return Manager.useReducer<PayloadType>(reducer);
}

export function useResetStore() {
  const forceUpdate = useForceUpdate();

  return () => {
    Manager.reset();
    forceUpdate();
  };
}
