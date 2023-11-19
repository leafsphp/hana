import { State } from './core';

export interface StorageClass extends Storage {}

export interface PersistPluginOptions {
  storage?: Partial<StorageClass>;
  key?: string;
  env?: 'react' | 'react-native';
  exclude?: string[];
}

export type Hook =
  | 'onReady'
  | 'onSave'
  | 'onRead'
  | 'onReducerInvoke'
  | 'onReset';

export interface PluginClass {
  onReady?: (value: State) => any;
  onSave?: (value: State) => any;
  onRead?: (value: State) => any;
  onReducerInvoke?: (value: State) => any;
  onReset?: (value: State) => any;
}

export type Plugin = PluginClass | (new () => PluginClass);
