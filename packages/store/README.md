# Hana Store

Hana Store is a simple, lightweight and easy to use state management library for Hana. It focuses on developer experience and ease of use. It requires no boilerplate, no configuration, and no extra dependencies to get started.

## Example

```js
import { createStore } from '@hanabira/store';

/**
 * Add default options based on your needs.
 * This is optional.
 */
createStore({
  state: {
    count: 0,
  },
  reducers: {
    increment: (state, payload = null) => {
      return {
        count: state.count + 1,
      };
    },
  },
});
```

In your components:

```js
import { useStore, useReducer } from '@hanabira/store';

/**
 * Use the store in your components.
 */
const Counter = () => {
  const [count, setCount] = useStore('count');
  const increment = useReducer('increment');

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => increment()}>Increment</button>
    </div>
  );
};
```
