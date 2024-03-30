# TypeScript Support

Hana Store is written in TypeScript and provides full support for TypeScript users. Every function and hook is fully typed and will provide type hints in your IDE.

## `useStore()`/`useStaticStore()`/`getStore()`

These functions allow you to add types to shape your state using the same method as React's `useState()` hook.

```tsx{4-6}
import { useStore, useStaticStore, getStore } from '@hanabira/store';

const Component = () => {
  const myItem = getStore<string>('item');
  const [item, setItem] = useStore<string>('item');
  const [state, setState] = useStaticStore<{ item: string }>();

  return (
    <div>
      <p>{item}</p>
      <button onClick={() => setItem('New value')}>Set item</button>
    </div>
  );
};
```

## `useReducer()`/`useStaticReducer()`

```tsx{4,5}
import { useReducer, useStaticReducer } from '@hanabira/store';

const Component = () => {
  const addSomething = useReducer<number>('add');
  const addSomethingStatic = useStaticReducer<string>('add');

  addSomething(1);
  addSomethingStatic('1');

  addSomething('1'); // Error
  addSomethingStatic(1); // Error
  
  ...
};
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
