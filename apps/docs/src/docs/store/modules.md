# Modules

Just like Vuex, Hana uses the single state tree pattern. This means that all of the state of your application is stored in a single object. This object is called the **Store**. As your application grows, the Store can get really bloated. To solve this problem, Hana allows you to split your Store into **modules**.

Modules are basically mini stores that belong to a specific part of your application. They have their own state and reducers, and can be used to organize your Store. You can also use modules to neatly separate the state of your application into different parts if the single state tree pattern does not work for you.

## Defining a module

Contrary to the grandiose name, modules are just objects. They have the following properties:

- `state`: An object containing the initial state of the module.
- `reducers`: An object containing the reducers of the module.

```jsx
const items = {
  state: {
    item: 'Initial value',
  },
  reducers: {
    setItem: (state, payload) => ({ ...state, item: payload }),
  },
};
```

## Registering a module

You can register a module using the `createStore()` function. The `createStore()` function accepts an object with a `modules` property. This property is an object containing all of the modules of the Store. In the modules object, the key is the name of the module and the value is the module itself.

```jsx
import { createStore } from '@hanabira/store';

const store = createStore({
  ..., // Other config
  modules: {
    items: {
      state: {
        item: 'Initial value',
      },
      reducers: {
        setItem: (state, payload) => ({ ...state, item: payload }),
      },
    },
  },
});
```

The example above registers a module called `items` that has a state object with an `item` property and a reducer called `setItem`. This module can be used in any component using the `useStore()` hook, but we will get to that later.

## Using state from a module

Using state from a module is very similar to using state from the Store. The only difference is that you need to specify the name of the module when grabbing the state. This is done by passing the name of the module, a dot, and the name of the state property.

```jsx{4,9}
import { useStore } from '@hanabira/store';

const Component = () => {
  const [item] = useStore('items.item');

  return (
    <div>
      <p>{item}</p>
      <button onClick={() => setStore({ item: 'New value' })}>Set item</button>
    </div>
  );
};
```

In the example above, we are grabbing the `item` property from the `items` module. This is done by passing `items.item` to the `useStore()` hook. The same can be done with any other Hana function that accepts a state property.

## Using reducers from a module

Using reducers from a module is also very similar to using reducers from the Store. The only difference is that you need to specify the name of the module when grabbing the reducer. This is done by passing the name of the module, a dot, and the name of the reducer.

```jsx{4,9}
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
