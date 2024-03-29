# Linking and Navigating

One of the most important parts of any web app is the ability to jump from one page to another. Hana provides two ways to do this:

- [`<Link>`](#link)
- [`useNavigate`](#usenavigate)

## `<Link>`

`<Link>` is a built-in component that renders an HTML `<a>` tag. It allows users navigate to another page by clicking or tapping on it. It is the primary way to navigate between routes in Hana.

### Basic Usage

```jsx
import { Link } from '@hanabira/router';

export default function Home() {
  return (
    <div>
      <Link to="/about">About</Link>
    </div>
  );
}
```

### Props

- `to` - The path to navigate to. This can be a string or an object.
- `replace` - If `true`, clicking the link will replace the current entry in the history stack instead of adding a new one.
- `state` - The `state` property can be used to set a stateful value for the new location which is stored inside history state. This value can subsequently be accessed via `useLocation()`.

```jsx
<Link to="/next-path" state={{ some: "value" }}>
  ...
```

On the `/next-path` page, you can access the state value like this:

```jsx
import { useLocation } from '@hanabira/router';

export default function NextPath() {
  const { state } = useLocation();

  return <div>{state.some}</div>;
}
```

For more information on the `<Link>` component, check out the base [React Router documentation](https://reactrouter.com/en/main/components/link#link).

## `useNavigate`

The `useNavigate` hook is used to navigate to a new location. It is the programmatic way to navigate between routes in Hana.

```jsx
import { useNavigate } from '@hanabira/router';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/about')}>About</button>
    </div>
  );
}
```

### Options

The `navigate` function accepts a route string as its first argument and an options object as its second argument.

```jsx{3}
const navigate = useNavigate();

navigate('/about', { replace: true });
```

- `replace` - If `true`, the current entry in the history stack will be replaced instead of adding a new one.
- `state` - The `state` property can be used to set a stateful value for the new location which is stored inside history state. This value can subsequently be accessed via `useLocation()`.

You can find more information on the `useNavigate` hook in the base [React Router documentation](https://reactrouter.com/en/main/hooks/use-navigate).

## `useSearchParams`

The `useSearchParams` hook is used to access the query string parameters of the current location. It returns an array containing an object with the query string parameters and a function to update the query string parameters.

```jsx
import { useSearchParams } from '@hanabira/router';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <div>Search Params: {JSON.stringify(searchParams)}</div>
      <button onClick={() => setSearchParams({ name: 'Hana' })}>
        Set Search Params
      </button>
    </div>
  );
}
```
