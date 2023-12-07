# Store Plugins

Sometimes, you may need access to some functionality that is not provided by Hana. In this case, you can use a plugin. Plugins are functions that are called at specific points in the Store lifecycle. They can be used to add additional functionality to the Store.

## Creating a Plugin

A plugin is basically a class that implements the `Plugin` interface. This interface contains the following methods:

- `onReady()`: Called when the Store is ready.
- `onSave()`: Called when a value is saved or updated in the Store.
- `onRead()`: Called when a value is read from the Store.
- `onReducerInvoke()`: Called when a reducer is called.
- `onReset()`: Called when the Store is reset.

Example:

```jsx
class MyPlugin implements Plugin {
  onReady(state) {
    console.log('Store is ready');
  }

  onSave(state) {
    console.log('The updated state is ', JSON.stringify(value));
  }

  onRead(state) {
    // 
  }

  onReducerInvoke(state) {
    // 
  }

  onReset(state) {
    // 
  }
}
```

## Using a Plugin

To use a plugin, you need to pass it to the `createStore()` function as part of the configuration object. This object takes in a `plugins` property which is an array of plugins to use with the Store.

```jsx
import { createStore } from '@hanabira/store';

const store = createStore({
  plugins: [MyPlugin],
});
```

Depending on the plugin, you may need to pass some options to it. For example, the Persisted State plugin can take options to exclude certain values from being persisted. For those cases, you may want to pass an initialized instance of the plugin to the `createStore()` function.

```jsx
import { createStore } from '@hanabira/store';

const store = createStore({
  plugins: [new MyPlugin({ ...options })],
});
```

Hana is smart enough to know that the plugin is already initialized and will not try to initialize it again.

## Persisted State Plugin

There are times when you may want to save the state of your application even after the user closes the browser or native app. This is where the Persisted State plugin comes in. This plugin allows you to save the state of your application to a specified storage medium. It also allows you to load the state from the storage medium when the application starts.

This plugin is included in the `@hanabira/store` package and can be used by passing it to the `createStore()` function.

```jsx
import { PersistedState, createStore } from '@hanabira/store';

createStore({
  plugins: [PersistedState],
});
```

By default, the persisted state plugin works in a browser environment and uses `localStorage` as the storage medium. However, you can switch this for any other storage medium that implements the `Storage` interface. This includes `localStorage`, `sessionStorage`, and `AsyncStorage` from React Native. To actually switch this, you need to pass a configuration object to the plugin.

```jsx
import { PersistedState, createStore } from '@hanabira/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

createStore({
  plugins: [
    new PersistedState({
      storage: AsyncStorage,
      env: 'react-native',
    }),
  ],
});
```

- The `env` property is used to tell the plugin that it is running in a React Native environment. This is important because React Native does not have a `window` object. If you do not pass this property, the plugin will assume that it is running in a browser environment.

- The `storage` property is used to tell the plugin which storage medium to use. This property can be any object that implements the `Storage` interface. This includes `localStorage`, `sessionStorage`, and `AsyncStorage` from React Native.

- It also supports a `key` property which is used to specify the key to use when saving the state. This defaults to `hana-store`.

```js
createStore({
  plugins: [
    new PersistedState({
      key: 'my-app-store',
    }),
  ],
});
```

- There is also an `exclude` property is an array of keys that should not be persisted. This is useful for excluding sensitive data like passwords and tokens from being persisted. If a value is excluded, it will not be persisted, but it will still be available in the state object.

```jsx
createStore({
  plugins: [
    new PersistedState({
      exclude: ['password', 'token'],
    }),
  ],
});
```

- The `include` property is an array of keys that should be persisted. This is useful for persisting only certain values in the state object. If the `include` property is set, the `exclude` property will be ignored and only the values in the `include` property will be persisted.

```jsx
createStore({
  plugins: [
    new PersistedState({
      include: ['user'],
    }),
  ],
});
```

## Next Steps

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/docs/store/#optional-config">
    <h3 class="next-steps-link">Optional Config</h3>
    <small class="next-steps-caption">Customize Hana Store to match your needs.</small>
  </a>
  <a class="vt-box" href="/docs/store/state">
    <h3 class="next-steps-link">Using the Store</h3>
    <small class="next-steps-caption">Learn how to set and get values from the Store.</small>
  </a>
  <a class="vt-box" href="/docs/store/reducers">
    <h3 class="next-steps-link">Reducers</h3>
    <small class="next-steps-caption">Learn how Hana reducers can make your code easier.</small>
  </a>
</div>
