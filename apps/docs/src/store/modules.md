# Modules

Just like Vuex, Hana uses the single state tree pattern. This means that all of the state of your application is stored in a single object. This object is called the **Store**.

As your application grows, the Store can quickly get out of hand and become difficult to manage. To solve this problem, Hana allows you to split your Store into **modules**.

Modules are basically mini stores that belong to a specific part of your application. They have their own state and reducers, and can be used to organize your Store. You can also use modules to neatly separate the state of your application into different parts if the single state tree pattern does not work for you.

## Defining a module

Contrary to the grandiose name, modules are just objects. They have the following properties:

- `state`: An object containing the initial state of the module.
- `reducers`: An object containing the reducers of the module.

```jsx
const itemStore = {
  state: {
    item: 'Initial value',
  },
  reducers: {
    setItem: (state, payload) => ({ ...state, item: payload }),
  },
};
```

## Registering a module

You can register a module in the `createStore()` function. The `createStore()` has a `modules` property that accepts an array of modules.

```jsx
import { createStore } from '@hanabira/store';

import itemStore from './itemStore';

const store = createStore({
  ..., // Other config
  modules: [itemStore],
});
```

The example above registers a module called `itemStore` that has a state object with an `item` property and a reducer called `setItem`. This module can be used in any component using the `useStore()` hook, but we will get to that later.

## Naming your modules

When registering a module, you can specify a `namespace` for it. This namespace will be used to access the module's state and reducers. If you do not specify a namespace, Hana will treat the state and reducers of the module as if they were registered in the root of the Store.

```js{2}
const itemStore = {
  namespace: 'items', 
  state: {
    item: 'Initial value',
  },
  reducers: {
    setItem: (state, payload) => ({ ...state, item: payload }),
  },
};
```

In the example above, we are creating the `itemStore` module with the `items` namespace. This means that the state of the module will be accessible in the Store using the `items` property. The same goes for the reducers.

```jsx{4,9}
import { useStore } from '@hanabira/store';

const Component = () => {
  const [item, setItem] = useStore('items.item');

  return (
    <div>
      <p>{item}</p>
      <button onClick={() => setItem('New value')}>Set item</button>
    </div>
  );
};
```

## Using state from a module

As shown in the previous section, using state from a module is very similar to using state from the Store. The only difference is that you need to specify the name of the module when grabbing the state. This is done by passing the name of the module, a dot, and the name of the state property.

```js
const [item, setItem] = useStore('items.item');
```

Note that if you do not specify a namespace for your module, you can skip the first part of the path.

```js
const [item, setItem] = useStore('item');
```

## Using reducers from a module

Using reducers from a module is also very similar to using reducers from the Store. The only difference is that you need to specify the name of the module when grabbing the reducer. This is done by passing the name of the module, a dot, and the name of the reducer.

```jsx{4}
import { useReducer } from '@hanabira/store';

const Component = () => {
  const setItem = useReducer('items.setItem');

  return (
    <div>
      <button onClick={() => setItem('New value')}>Set item</button>
    </div>
  );
};
```

In the example above, we are grabbing the `setItem` reducer from the `items` module. This is done by passing `items.setItem` to the `useReducer()` hook. The same can be done with any other Hana function that accepts a reducer.

Note that if you do not specify a namespace for your module, you can skip the first part of the path.

```js
const setItem = useReducer('setItem');
```

## Next Steps

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/store/#optional-config">
    <h3 class="next-steps-link">Optional Config</h3>
    <small class="next-steps-caption">Customize Hana Store to match your needs.</small>
  </a>
  <a class="vt-box" href="/store/state">
    <h3 class="next-steps-link">Using the Store</h3>
    <small class="next-steps-caption">Learn how to set and get values from the Store.</small>
  </a>
  <a class="vt-box" href="/store/reducers">
    <h3 class="next-steps-link">Reducers</h3>
    <small class="next-steps-caption">Learn how Hana reducers can make your code easier.</small>
  </a>
</div>
