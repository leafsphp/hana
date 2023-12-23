import { Reducer } from '../@types/functions';
import { Hook, Plugin, PluginClass } from '../@types/plugin';
import {
  Options,
  State,
  InternalOptions,
  PropertyListener,
} from '../@types/core';

export default class Manager {
  private static _plugins: PluginClass[] = [];
  private static _options: InternalOptions = {
    defaultState: {},
    state: {},
    reducers: {},
    compareState: false,
    listeners: new Map<string, Set<PropertyListener>>(),
  };

  /**
   * Initialize and configure your Hana store
   *
   * @param {Options|null} options Config for Hana store
   */
  public static store(options: Options | null = null) {
    let state = this.createCleanObject(options?.state);
    let reducers = this.createCleanObject(options?.reducers);
    let modules = options?.modules || [];
    const plugins = options?.plugins || [];

    this._options.compareState = !!options?.compareState;

    if (modules.length > 0) {
      modules.forEach((module) => {
        let key: string | null = null;

        if (module.namespace && module.namespace.length > 0) {
          key = module.namespace;
        }

        if (module.state) {
          const moduleState = module.state;

          if (key === null) {
            state = this.createCleanObject({
              ...state,
              ...moduleState,
            });
          } else {
            state = this.createCleanObject({
              ...state,
              [key]: moduleState,
            });
          }
        }

        if (module.reducers) {
          const moduleReducers = module.reducers;

          if (key === null) {
            reducers = this.createCleanObject({
              ...reducers,
              ...moduleReducers,
            });
          } else {
            reducers = this.createCleanObject({
              ...reducers,
              [key]: moduleReducers,
            } as Record<string, Record<string, Reducer>>);
          }
        }
      });
    }

    this._options.defaultState = this.set(state, false)!;
    this._options.reducers = reducers;

    this._pluginInit(plugins);
    this.applyPluginHook('onReady', state);
  }

  /**
   * Run a plugin hook
   *
   * @param {Hook} hookName Name of the hook to run
   * @param {State} state Current state of the store
   */
  public static applyPluginHook(hook: Hook, state: any) {
    for (const plugin of this._plugins) {
      if (plugin[hook]) {
        plugin[hook]!(state);
      }
    }
  }

  /**
   * Set the global state
   *
   * @param {State} state The new state
   * @param {boolean} withPlugins Whether to run the plugin hooks or not
   * @param {boolean} reactive Whether to run the property listeners or not
   */
  public static set(state: any, withPlugins = true, reactive = true) {
    let finalState: State = {};
    const globalState: State = this.get();

    if (typeof state === 'function') {
      const callableState = state as (prevState: State) => State;

      finalState = this.createCleanObject({
        ...finalState,
        ...globalState,
        ...callableState(globalState),
      });
    } else {
      finalState = this.createCleanObject({
        ...finalState,
        ...globalState,
        ...state,
      });
    }

    if (withPlugins) {
      this.applyPluginHook('onSave', finalState);
    }

    if (this._options.compareState && this._compareState(finalState)) {
      return;
    }

    this._options.state = finalState;

    if (reactive) {
      for (const stateItem of Object.keys(finalState)) {
        this._options.listeners.get(stateItem)?.forEach((propertyListener) => {
          propertyListener();
        });
      }
    }

    return finalState;
  }

  /**
   * Get the global state
   */
  public static get<Shape = State>(
    state?: string | null,
    propertyListener?: PropertyListener
  ) {
    if (!state) {
      /**
       * @author Charles Stover <https://github.com/CharlesStover/reactn>
       */
      return (Object.keys(this._options.state) as (keyof Shape)[]).reduce(
        (accumulator: Partial<Shape>, key: keyof Shape): Partial<Shape> => {
          Object.defineProperty(accumulator, key, {
            configurable: false,
            enumerable: true,
            get: (): Shape[keyof Shape] => {
              if (propertyListener) {
                (function (item: string) {
                  Manager.addPropertyListener(item, propertyListener);
                })(key as string);
              }

              return this._options.state[key as string];
            },
          });

          return accumulator;
        },
        Object.create(null)
      );
    }

    this.applyPluginHook('onRead', state);

    const parts = state.split('.');
    let selectedState = this._options.state[parts[0]];

    if (parts.length > 1) {
      selectedState = selectedState?.[parts[1]];
    }

    return selectedState;
  }

  /**
   * Call a reducer
   * @param {string|Function} reducer The reducer to call
   */
  public static useReducer<PayloadType = any>(
    reducer: string | Reducer<State>,
    propertyListener?: PropertyListener
  ) {
    const runner = <PayloadType = any>(reducer: Reducer) => {
      return async (payload?: PayloadType) => {
        Manager.set(
          await reducer(Manager.get(null, propertyListener), payload),
          true,
          !!propertyListener
        );
      };
    };

    const reducerFunction = (reducerName: string): Reducer => {
      const parts = reducerName.split('.');
      let base: any = this._options.reducers[parts[0]];

      if (parts.length > 1) {
        base = base[parts[1]];
      }

      return base;
    };

    if (typeof reducer === 'string') {
      return runner<PayloadType>(reducerFunction(reducer));
    }

    this._options.reducers[reducer.name] = reducer;
    return runner<PayloadType>(reducerFunction(reducer.name));
  }

  /**
   * Reset state to it's default value
   */
  public static reset() {
    this.applyPluginHook('onReset', this._options.defaultState);
    this._options.state = this._options.defaultState;

    for (const items of Object.keys(this._options.state)) {
      this._options.listeners.get(items)?.forEach((propertyListener) => {
        propertyListener();
      });
    }
  }

  /**
   * Map component instance to a state property.
   *
   * @param {string} property The state property to map to.
   * @param {PropertyListener} propertyListener The listener to map.
   */
  public static addPropertyListener(
    property: string,
    propertyListener: PropertyListener
  ) {
    if (this._options.listeners.has(property)) {
      this._options.listeners.get(property)?.add(propertyListener);
    } else {
      this._options.listeners.set(property, new Set([propertyListener]));
    }
  }

  /**
   * Remove a property listener.
   *
   * @param {PropertyListener} propertyListener The listener to remove.
   */
  public static removePropertyListener(propertyListener: PropertyListener) {
    let removed = false;

    for (const propertyListeners of this._options.listeners.values()) {
      if (propertyListeners.delete(propertyListener)) {
        removed = true;
      }
    }

    return removed;
  }

  protected static _pluginInit(plugins: Plugin[]) {
    for (const plugin of plugins) {
      /**
       * ----
       * Plugins could be initialized by the user. This check is to prevent
       * the same plugin from being initialized twice and causing errors.
       * ----
       */
      if (typeof plugin === 'object') {
        this._plugins.push(plugin);
      } else {
        const p = new plugin();
        this._plugins.push(p);
      }
    }
  }

  protected static createCleanObject<Item = any>(object?: Item): Item {
    return Object.assign(Object.create(null), object ?? {});
  }

  protected static _compareState(state: State | string) {
    if (typeof state === 'string') {
      return state === JSON.stringify(this._options.state);
    }

    return JSON.stringify(state) === JSON.stringify(this._options.state);
  }
}
