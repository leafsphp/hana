# State

After installing the Hana Store, you can immediately jump into setting and grabbing your state. If you need to set up a default state or reducers, you can check out `createStore()` in the [Optional Config](/docs/store/#optional-config) section.

## Concepts

Hana Store keeps track of your state in a single object. This object is called the **state object**. The state object is a plain JavaScript object that contains all of your state and is the single source of truth for your application. Hana provides a couple of ways to set and get values from the state object. These are called **state setters** and **state getters**.

These setters and getters are available in all components and can be used to set and get values from the state object.

## Accessing your state

Hana provides a couple of ways to access your state. Among these methods, the most common is the `useStore()` hook. This hook is modelled after React's `useState()` hook and can be used to set and get values from the store.

```jsx{4}
import { useStore } from '@hanabira/store';

const Component = () => {
  const [item, setItem] = useStore('item');

  return (
    <div>
      <p>{item}</p>
      <button onClick={() => setItem('New value')}>Set item</button>
    </div>
  );
};
```

The `useStore()` hook can also be used to set and get the entire state object. This is useful when you need to access multiple values from the state object.

```jsx{4}
import { useStore } from '@hanabira/store';

const Component = () => {
  const [state, setState] = useStore();

  return (
    <div>
      <p>{state.item}</p>
      <button onClick={() => setState({ item: 'New value' })}>Set item</button>
    </div>
  );
};
```

## `getStore()` and `setStore()`

Hana also provides two functions that can be used to set and get values from the state object. These functions are called `getStore()` and `setStore()`.

```jsx{4,9}
import { getStore, setStore } from '@hanabira/store';

const Component = () => {
  const item = getStore('item');

  return (
    <div>
      <p>{item}</p>
      <button onClick={() => setStore({ item: 'New value' })}>Set item</button>
    </div>
  );
};
```

The only difference between the values returned from `useStore()` and `setStore()` is that `setStore()` is not reactive. This means that if you set a value using `setStore()`, the component will not re-render. In simpler terms, you will not see values updated in your component if you use `setStore()`. This is useful when you need to set a value without re-rendering the component.

## `useSetStore()`

To fix the issue of `setStore()` not being reactive, Hana provides a `useSetStore()` hook. This hook is modelled  return a function that can be used to set values from the state object. This function is reactive and will cause the component to re-render when called.

```jsx{4,9}
import { useSetStore, getStore } from '@hanabira/store';

const Component = () => {
  const setStore = useSetStore();

  return (
    <div>
      <p>{getStore('item')}</p>
      <button onClick={() => setStore({ item: 'New value' })}>Set item</button>
    </div>
  );
};
```

## `useStaticStore()`

Hana also provides a `useStaticStore()` hook. This hook is non-reactive version of `useStore()` and will not cause the component to re-render when the value changes.

```jsx{4,9}
import { useStaticStore } from '@hanabira/store';

const Component = () => {
  const [item, setItem] = useStaticStore('item');

  return (
    <div>
      <p>{item}</p>
      <button onClick={() => setItem('New value')}>Set item</button>
    </div>
  );
};
```

## Resetting the state

Hana provides a `useResetStore()` hook that can be used to reset the state object to its initial value. This hook is useful when you need to reset the state object to its initial value.

```jsx{4,8}
import { useResetStore } from '@hanabira/store';

const Component = () => {
  const resetStore = useResetStore();

  return (
    <div>
      <button onClick={() => resetStore()}>Reset state</button>
    </div>
  );
};
```

## Next Steps

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/docs/store/#optional-config">
    <h3 class="next-steps-link">Optional Config</h3>
    <small class="next-steps-caption">Customize Hana Store to match your needs.</small>
  </a>
  <a class="vt-box" href="/docs/store/typescript">
    <h3 class="next-steps-link">TypeScript Support</h3>
    <small class="next-steps-caption">Add Types to your Hana Store.</small>
  </a>
  <a class="vt-box" href="/docs/store/reducers">
    <h3 class="next-steps-link">Reducers</h3>
    <small class="next-steps-caption">Learn how Hana reducers can make your code easier.</small>
  </a>
</div>