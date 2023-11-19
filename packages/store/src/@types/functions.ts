import { Dispatch, SetStateAction } from 'react';
import { State } from './core';

export type SetStoreFn<StateType = any> = Dispatch<SetStateAction<StateType>>;
export type GetStoreFn = (state?: string | null) => any;

export type UseStoreFn<StateType = any> = (
  key?: string
) => [StateType, SetStoreFn<StateType>];

export type Reducer<GlobalState extends State = State, Payload = any> = (
  prevState: GlobalState,
  action: Payload
) => State | Promise<State>;

export type ReducerStore = Record<
  string,
  Reducer<State> | Record<string, Reducer<State>>
>;
