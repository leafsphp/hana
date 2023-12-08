# Error Handling

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

<!-- <VideoDocs
  subject="Watch the error handling guide on youtube"
  description="Learn how to handle errors in your leaf app, during and after development."
  link="https://www.youtube.com/embed/BTcUgeOZLyM"
/> -->

Hana router provides default error pages for 404 and 500 errors, however, those pages are not very useful in production. In this guide, we will learn how to handle errors in Hana.

## 404 Errors

404 errors occur when a user tries to navigate to a page that does not exist. You can customize the 404 page by creating a `_404.tsx` file in the `pages` directory. The `_404.tsx` file should export a React component that will be rendered when a 404 error occurs.

```tsx
// Path: /pages/_404.tsx

import React from 'react';

const NotFound: React.FC = () => {
  return <div>404 - Not Found</div>;
};

export default NotFound;
```

Hana will automatically detect the `_404.tsx` file and use it as the 404 page.

## 500 Errors

500 errors occur when an error occurs while rendering a page. You can customize the 500 page by creating a `_error.tsx` file in the `pages` directory. The `_500.tsx` file should export a React component that will be rendered when a 500 error occurs.

```tsx
import { useRouteError } from "@hanabira/router";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.log(error, 'error');

  return <div>Error</div>;
}
```

Note that unlike the `_404.tsx` file, you can have multiple `_error.tsx` files. For example, you can have a `_error.tsx` file in the `pages/users` directory that will be used for all errors that occur on routes in the `/users` directory.

```tree
|- pages
  |- index.tsx
  |- _error.tsx
  |- users
    |- _error.tsx
```

Considering the directory structure above, the `_error.tsx` file in the `pages/users` directory will be used for all errors that occur on routes in the `/users` directory. The `_error.tsx` file in the `pages` directory will be used for all other errors.
