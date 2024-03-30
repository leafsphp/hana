# Loading Pages

<!-- markdownlint-disable no-inline-html -->

<!-- <script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script> -->

<!-- <VideoDocs
  subject="Watch the error handling guide on youtube"
  description="Learn how to handle errors in your leaf app, during and after development."
  link="https://www.youtube.com/embed/BTcUgeOZLyM"
/> -->

Hana allows you to display a loading component while a page is being fetched. This is useful for pages that take a long time to load. It uses React's [Suspense](https://react.dev/reference/react/Suspense) API under the hood, so you can use it with any asynchronous data fetching library.

## Creating a Loading Component

Hana automatically detects your loading component by looking for a `_loading.tsx` file in the `pages` directory. The `_loading.tsx` file should export a React component that will be rendered while a page is being fetched.

```tsx
// Path: /pages/_loading.tsx

import React from 'react';

const Loading: React.FC = () => {
  return <div>Loading...</div>;
};

export default Loading;
```

## Multiple Loading Components

Hana allows you to have multiple `_loading.tsx` files. For example, you can have a `_loading.tsx` file in the `pages/users` directory that will be used for all pages in the `/users` directory.

```tree
|- pages
  |- index.tsx
  |- _loading.tsx
  |- users
    |- _loading.tsx
```

Considering the directory structure above, the `_loading.tsx` file in the `pages/users` directory will be used for all pages in the `/users` directory. The `_loading.tsx` file in the `pages` directory will be used for all other pages.
