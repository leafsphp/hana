<!-- markdownlint-disable no-inline-html -->
# Hana Router

<!-- <script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script> -->

<p class="flex flex:start-all" style="gap:10px;">
  <a href="https://npmjs.com/package/@hanabira/router" target="_blank"><img src="https://img.shields.io/npm/v/@hanabira/router" alt="npm version" height="18"></a>
  <img src="https://img.shields.io/npm/dt/@hanabira/router" class="m:0" alt="">
</p>

One of Hana's most powerful features is its file based routing. This means that you can create a route by simply creating a file in the `pages` directory. This is a feature that is heavily inspired by Next.js.

Under the hood, Hana router compiles all the files in the `pages` directory into a single route file and serves it using [react router](https://reactrouter.com/). This makes it easy to create routes without having to worry about setting up a router.

## Installation

It is recommended to use the [create-hana-app CLI](/cli/) to create a new Hana app. This will automatically set up the router for you. However, if you have an existing app, you can check out the [manual installation](/introduction/installation.html#manual-setup) guide.

## Creating a Route

To create a route, simply create a jsx or tsx file in the `pages` directory. For example, if you create a file called `home.tsx` in the `pages` directory, it will create a route for `/home`. Note that every Hana route should contain a default export which is a React component.

```tsx
// Path: /pages/home.tsx
export default function Home() {
  return <div>Hello World</div>
}
```

## Ignored Files

We mentioned that every JavaScript or TypeScript file in the `pages` directory is compiled into a route. However, there are some files that are ignored by the router. These files are:

- Files that start with an underscore (`_`)
- Files that end with `.d.ts`

Files that start with an underscore are seen as setup files by the router. An example of a setup file is `_app.tsx`. This file is used to set up any global styles or components that should be available to all routes. You can learn more about setup files [here](/routing/#setup-files).

Files that end with `.d.ts` are declaration files. These files are used to declare types and interfaces. They are ignored by the router because they are not valid React components.

## Index Routes

Hana automatically maps index files (index.jsx/index.tsx) to the directory name. For example, if you create a file called `index.tsx` in the `pages/home` directory, it will create a route for `/home`. An `index.jsx` file in the `pages` directory will create a route for `/`.

- `pages/index.tsx` -> `/`
- `pages/home/index.jsx` -> `/home`

## Nested Routes

To create a nested route, you can nest folders and files inside other folders. For example, you can add a new `/dashboard/settings` route by nesting a `settings.tsx` file inside a `dashboard` folder or by an `index.tsx` file inside a `settings` folder inside a `dashboard` folder.

- `pages/dashboard/settings.tsx` -> `/dashboard/settings`
- `pages/dashboard/settings/index.tsx` -> `/dashboard/settings`

## Setup Files

Setup files are files that start with an underscore (`_`). These files are used to set up different functionality for your app. For example, you can use a setup file to set up global styles or components that should be available to all routes.

### _app.tsx

The `_app.tsx` file is used to set up global styles or components that should be available to all routes. It is also used to wrap all routes in a layout component. This file is heavily inspired by Next.js' `_app.tsx` file. The example below sets up Hana Store.

```tsx
// Path: /pages/_app.tsx

import React from 'react';
import { PersistedState, createStore } from '@hanabira/store';

import './index.css';

createStore({
  state: {
    count: 0,
  },
  reducers: {
    increment(state) {
      return {
        count: state.count + 1,
      };
    },
  },
  plugins: [PersistedState],
});

const Application: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export default Application;
```

### _error/_404.tsx

Hana allows you to set up error handlers for both 500 and 404 errors. You can check out the [error handling](/routing/errors) section to learn more.

### _loading.tsx

Hana allows you to set up a loading component that is shown when a route is loading. You can check out the [loading component](/routing/loading) section to learn more.
