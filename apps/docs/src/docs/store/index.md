# Hana Store

Hana Store is a simple, lightweight and easy to use state management library for React. It focuses on maintaining a great developer experience and ease of use. It requires no boilerplate, no configuration, and no extra dependencies to get started. It is inspired by React's state management hooks, VueX and ReactN.

Although Hana Store is built as a Hana component, it can be used in any React application and even in React Native applications.

## Why Hana Store?

Hana Store is built with the following principles in mind:

- **Ease of use**: Hana Store is designed to be easy to use and easy to learn. It requires no boilerplate, no configuration, and no extra dependencies to get started.
- **Developer experience**: Hana Store is designed to provide a great developer experience. It is built with TypeScript and provides full support for TypeScript users.
- **Performance**: Hana Store is designed to be fast and lightweight. It is built with performance in mind and is optimized for performance.

## Installation

You can install Hana Store using your favorite package manager:

```bash
npm install @hanabira/store
```

```bash
yarn add @hanabira/store
```

## Intro

At the centre of every Hana application is the Store. The Store is a global object that contains all the data that your application needs. It is accessible from any component in your application. You can imagine a Store as a container that holds all your application's state, functions that update the state and any other data that you need for your app.

Unlike other state management libraries, you don't explicitly need to set up your store and export it to use it. Hana will automatically use the Store created by `createStore()` if it is available. This means that you can start using the Store right away without any setup. If you need to set up a default state or reducers, you can check out `createStore()` in the [Optional Config](/docs/store/#optional-config) section.

## Usage

Hana Store requires no boilerplate, no configuration, and no extra dependencies to get started. After installing it, you can start using it right away.

```jsx
import { useStore } from '@hanabira/store';

...

const [item, setItem] = useStore('item');

return (
  <div>
    <p>Value: {item}</p>
    <button onClick={() => setItem('New value')}>Set Item</button>
  </div>
);
```

Although Hana Store requires no setup, it allows you to customize it to your needs. You can find a list of all the options below.

## Optional Config

Hana provides a `createStore()` function that allows you to configure the Store. It accepts an object with the following properties:

- `state`: An object containing the initial state of the Store.
- `reducers`: An object containing the reducers of the Store.
<!-- - `modules`: An object containing the modules of the Store. -->
- `compareState`: A boolean indicating whether to compare the state before updating it. Defaults to `true`.
- `plugins`: An array of plugins to use with the Store.

```jsx
import { createStore } from '@hanabira/store';

const store = createStore({
  state: {
    item: 'Initial value',
  },
  reducers: {
    setItem: (state, payload) => ({ ...state, item: payload }),
  },
  compareState: false,
  plugins: [],
});
```

<!-- // modules: {
  //   user: {
  //     state: {
  //       name: 'John Doe',
  //     },
  //     reducers: {
  //       setName: (state, payload) => ({ ...state, name: payload }),
  //     },
  //   },
  // }, -->

::: tip Note
You should only use `createStore()` once in your application. It is recommended to create the Store in a root component so that it is available to all components. Hana will automatically use the Store created by `createStore()` if it is available. Multiple stores are not yet supported.
:::

## Next Steps

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/docs/store/state">
    <h3 class="next-steps-link">Using the Store</h3>
    <small class="next-steps-caption">Learn how to set and get values from the Store.</small>
  </a>
  <a class="vt-box" href="/docs/store/reducers">
    <h3 class="next-steps-link">Reducers</h3>
    <small class="next-steps-caption">Learn how Hana reducers can make your code easier.</small>
  </a>
  <a class="vt-box" href="/docs/store/#optional-config">
    <h3 class="next-steps-link">Store plugins</h3>
    <small class="next-steps-caption">Learn about Hana Store plugins and how they help your development.</small>
  </a>
</div>
