# Reducers

When working with components, you will often need to update the state of the Store. Hana provides a few ways to directly update the state of the Store. However, these methods can quickly become cumbersome when you need to update multiple values in the state object, especially when you need to update the state based on the result of an operation.

Hana reducers are functions that can be used to perform some "complex" operations (including business logic) and update the state of the Store. They are inspired by VueX's actions but unlike VueX's actions, Hana reducers update the state of the Store directly instead of committing mutations.

## Defining a reducer

At their core, Hana reducers are functions that accept two arguments: the current state and the payload. They return the new state of the Store. The payload is an optional argument that can be used to pass data to the reducer function.

```jsx
const reducer = (state, payload) => {
  // Perform some operations
  return newState;
};
```

## Registering a reducer

Hana provides two ways to register reducers:

- Using the `createStore()` function
- Using the `useReducer()` hook

### Using `createStore()`

The `createStore()` function accepts an object with a `reducers` property. This property is an object containing all of the reducers of the Store. Using `createStore()` to register reducers allows you to register and cache all your reducers in one place. This makes it easier to manage and use them.

```jsx
import { createStore } from '@hanabira/store';

createStore({
  ..., // Other config
  reducers: {
    setItems: (state, payload) => {
      // perform some operation
      const items = state.items.reverse();

      return {
        items: [
          ...items,
          ...payload
        ],
      };
    },
  },
});
```

The example above registers a reducer called `setItems` that reverses the order of the items in the state object and adds the payload to the end of the array. This reducer can be used in any component using the `useReducer()` hook, but we will get to that later.

### Using `useReducer()`

This hook takes in the reducer function you want to register, and uses the name of the function as the name of the reducer. This means that the name of the reducer function must be the same as the name of the reducer you want to register.

```jsx
import { useReducer } from '@hanabira/store';

const setItems = (state, payload) => {
  // perform some operation
  const items = state.items.reverse();

  return {
    items: [
      ...items,
      ...payload
    ],
  };
};

const Component = () => {
  const addToList = useReducer(setItems);

  return (
    <div>
      <button onClick={() => addToList(['New item'])}>Add to list</button>
    </div>
  );
};
```

The example above registers a reducer called `setItems` that reverses the order of the items in the state object and adds the payload to the end of the array. Once the reducer is registered, you can use it in a child component using the same `useReducer()` hook.

```jsx
import { useReducer } from '@hanabira/store';

const Component = () => {
  const setItems = useReducer('setItems');

  // items is an array of items the user wants to add to the list
  const addItemsToList = (items) => {
    setItems(items);
  };
  
  ...
};
```

## Using a reducer

Hana provides a dead-simple `useReducer()` hook that can be used to call reducers in components as we mentioned earlier. Unlike reducers you have probably seen before, Hana reducers are simply functions that accept a payload and return the new state of the Store. The `useReducer()` hook takes care of passing the current state of the Store to the reducer function.

```jsx{23}
import { createStore, useStore, useReducer } from '@hanabira/store';

createStore({
  state: {
    items: [],
  },
  reducers: {
    setItems: (state, payload) => {
      const items = state.items.reverse();

      return {
        items: [
          ...items,
          ...payload
        ],
      };
    },
  },
});

const Component = () => {
  const [items] = useStore('items');
  const setItems = useReducer('setItems');

  const addToList = () => {
    setItems([`New item - ${items.length}`]);
  };

  ...
};
```

The example above registers a reducer called `setItems` that reverses the order of the items in the state object and adds the payload to the end of the array. Once the reducer is registered, it can be used in the component using the `useReducer()` hook, but instead of passing the reducer function, we pass the name of the reducer which is `setItems`.

Note how the return value of `useReducer()` is a function that accepts only the payload as an argument. This is because although the reducer function accepts two arguments, the first argument is the current state of the Store which is automatically passed to the reducer function by Hana.

## Valueless reducers

Sometimes, you may need to perform an operation that does not require a payload. In this case, you can simply set the payload argument from the reducer function with a default value.

```jsx
import { createStore } from '@hanabira/store';

createStore({
  state: {
    items: [],
  },
  reducers: {
    doSomething: (state, payload = null) => ({
      something: 'static value',
    }),
  },
});
```

Here, the `doSomething` reducer does not require a payload. This means that you can call it without passing a payload.

```jsx
import { useReducer } from '@hanabira/store';

const Component = () => {
  const doSomething = useReducer('doSomething');

  const doSomethingElse = () => {
    doSomething();
  };

  ...
};
```

## Async reducers

Hana is built for simplicity and ease of use. This means that it should be easy to perform asynchronous operations in reducers. Hana reducers are just functions that accept a payload and return the new state of the Store. This means that you can use any asynchronous operation in a reducer function.

```jsx
import { createStore } from '@hanabira/store';

createStore({
  state: {
    items: [],
  },
  reducers: {
    setItems: async (state, payload) => {
      const items = state.items.reverse();

      const newItems = await makeAPICallToGetItems();

      return {
        items: [
          ...items,
          ...newItems
        ],
      };
    },
  },
});
```

And that's it! You can now use the `setItems` reducer in any component using the `useReducer()` hook.

```jsx
import { useReducer } from '@hanabira/store';

const Component = () => {
  const setItems = useReducer('setItems');

  const addToList = (items) => {
    setItems(items);
  };

  ...
};
```

## useStaticReducer()

Sometimes, you may need to use a reducer in a component that does not actually re-render the UI after the reducer is called. In this case, you can use the `useStaticReducer()` hook. It works exactly like the `useReducer()` hook, but it does not cause the component to re-render when the reducer is called.

```jsx
import { useStaticReducer } from '@hanabira/store';

const Component = () => {
  const setItems = useStaticReducer('setItems');

  const addToList = (items) => {
    setItems(items);
  };

  ...
};
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
