import useForceUpdate from 'use-force-update';
import { SetStateAction, useEffect } from 'react';

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
    Manager.applyPluginHook('onSave', Manager.get());
  };

  return [Manager.get(item), stateSetter];
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

export function setStore<StateType extends State = State>(
  item: SetStateAction<StateType>
) {
  return Manager.set(item);
}

export function getStore<StateType = any>(item?: string): StateType {
  return Manager.get(item);
}
