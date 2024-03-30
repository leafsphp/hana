# Layout Pages

<!-- markdownlint-disable no-inline-html -->

<!-- <script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script> -->

<!-- <VideoDocs
  subject="Watch the error handling guide on youtube"
  description="Learn how to handle errors in your leaf app, during and after development."
  link="https://www.youtube.com/embed/BTcUgeOZLyM"
/> -->

Usually in our apps, we run into situations where a couple of pages have the same layout. For example, you might have a `Header` and `Footer` component that you want to use on all your pages.

## Creating a Layout Component

Hana automatically detects your layout component by looking for a `_layout.tsx` file in the `pages` directory. The `_layout.tsx` file should export a React component that will be rendered while a page is being fetched.

```tsx
// Path: /pages/_layout.tsx

import React from 'react';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <header>Header</header>
      <main>
        <div>{children}</div>
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default Layout;
```

## Multiple Layout Components

Hana allows you to have multiple `_layout.tsx` files. For example, you can have a `_layout.tsx` file in the `pages/users` directory that will be used for all pages in the `/users` directory.

```tree
|- pages
  |- index.tsx
  |- _layout.tsx
  |- users
    |- _layout.tsx
```

Considering the directory structure above, the `_loading.tsx` file in the `pages/users` directory will be used for all pages in the `/users` directory. The `_loading.tsx` file in the `pages` directory will be used for all other pages.
