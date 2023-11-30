import Manager from '../core/store';

import type { State } from '../@types/core';
import type { PersistPluginOptions, PluginClass } from '../@types/plugin';

const isSSR = typeof window === 'undefined';

export class PersistedState implements PluginClass {
  protected _options: Required<PersistPluginOptions> = {
    storage: (!isSSR && window.localStorage) as any,
    key: 'hana-store',
    env: 'react',
    exclude: [],
    include: [],
  };

  public constructor(options?: PersistPluginOptions) {
    if (options) {
      this._options = {
        ...this._options,
        ...options,
      };
    }
  }

  private isReactNative() {
    return this._options.env === 'react-native';
  }

  public setStorage(storage: any) {
    if (typeof storage === 'function') {
      this._options.storage = storage();
    } else {
      this._options.storage = storage;
    }
  }

  public async retrieveState() {
    if (!this.isReactNative() && isSSR) {
      return;
    }

    const value = await this._options.storage?.getItem?.(this._options.key);

    if (!value) {
      return undefined;
    }

    try {
      return typeof value !== 'undefined' ? JSON.parse(value) : undefined;
    } catch (err) {}

    return undefined;
  }

  public async setState(state: State) {
    let globalState = await Manager.get();

    state = {
      ...globalState,
      ...state,
    };

    await this.saveState(state);
  }

  public async saveState(state: State) {
    if (!this.isReactNative() && isSSR) {
      return;
    }

    let finalState: State = {};

    if (this._options.include.length > 0) {
      this._options.include.forEach((item) => {
        if (state[item]) {
          finalState[item] = state[item];
        }
      });
    } else {
      this._options.exclude.forEach((item) => {
        if (state[item]) {
          delete state[item];
        }
      });

      finalState = state;
    }

    return await this._options.storage?.setItem?.(
      this._options.key,
      JSON.stringify(finalState)
    );
  }

  public async compareState(state: State | string) {
    if (!this.isReactNative() && isSSR) {
      return;
    }

    state = JSON.stringify(state);
    const cache = await this._options.storage?.getItem?.(this._options.key);
    return state === cache;
  }

  public async refresh() {
    const globalState = await Manager.get();
    await this.saveState(globalState);
  }

  public async onSave(state: State) {
    if (!(await this.compareState(state))) {
      this.setState(state);
    }
  }

  public async onReady(state: State) {
    const cache = await this.retrieveState();

    if (cache) {
      Manager.set(cache);
      return true;
    }

    await this.saveState(state);

    return false;
  }
}
