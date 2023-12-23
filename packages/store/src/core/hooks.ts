import useForceUpdate from 'use-force-update';

import Manager from './store';

import { useEffect, type SetStateAction } from 'react';
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
  const removeForceUpdateListener = (): void => {
    Manager.removePropertyListener(forceUpdate);
  };

  if (typeof item === 'undefined') {
    useEffect((): VoidFunction => removeForceUpdateListener, []);
  } else {
    useEffect((): VoidFunction => {
      // We add the listener as an effect, so that there are not race conditions
      //   between subscribing and unsubscribing.
      // Subscribing outside of useEffect via `spyState()[property]` will
      //   cause the re-render subscription to occur before the unmount
      //   unsubscription occurs. As a result, the unmount unsubscription
      //   removes the re-rendered subscription.
      Manager.addPropertyListener(item, forceUpdate);

      // If this component ever updates or unmounts, remove the force update
      //   listener.
      return removeForceUpdateListener;
    });
  }

  const stateSetter: SetStoreFn<StateType> = (value) => {
    let stateValue: State = value as State;
    let stateToSet = stateValue;

    if (typeof value === 'function') {
      const callableState = value as (prevState: StateType) => State;
      stateValue = callableState(Manager.get(item));
    }

    if (item) {
      const parts = item.split('.');

      if (parts.length === 1) {
        stateToSet = { [item]: stateValue };
      } else {
        const parentState = Manager.get(parts[0]) ?? {};

        stateToSet = {
          [parts[0]]: {
            ...parentState,
            [parts[1]]: stateValue,
          },
        };
      }
    }

    Manager.set(stateToSet);
    Manager.applyPluginHook('onSave', Manager.get());
  };

  return [Manager.get(item, forceUpdate), stateSetter];
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

    Manager.set(stateToSet, false, false);
    Manager.applyPluginHook('onSave', Manager.get());
  };

  return [Manager.get(item), stateSetter];
}

export function useSetStore<StateType extends State = State>(): (
  value: StateType
) => void {
  const forceUpdate = useForceUpdate();
  const removeForceUpdateListener = (): void => {
    Manager.removePropertyListener(forceUpdate);
  };

  useEffect((): VoidFunction => removeForceUpdateListener, []);

  return (value: SetStateAction<StateType>) => {
    Manager.set(value);
  };
}

export function useReducer<PayloadType = any>(
  reducer: string | Reducer<State>
) {
  const forceUpdate = useForceUpdate();
  const removeForceUpdateListener = (): void => {
    Manager.removePropertyListener(forceUpdate);
  };

  useEffect((): VoidFunction => removeForceUpdateListener, []);

  return Manager.useReducer<PayloadType>(reducer, forceUpdate);
}

export function useStaticReducer<PayloadType = any>(
  reducer: string | Reducer<State>
) {
  return Manager.useReducer<PayloadType>(reducer);
}
