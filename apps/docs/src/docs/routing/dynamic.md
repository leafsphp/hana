# Dynamic Routing
<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

<!-- <VideoDocs
  subject="Watch the routing guide on youtube"
  description="Learn how leaf handles dynamic routing."
  link="https://www.youtube.com/embed/BTcUgeOZLyM"
/> -->

*This guide assumes you have read [the routing intro](/docs/routing/)*

Dynamic routing is the idea of creating routes that can be accessed dynamically. For example, you can create a route that accepts a user id and displays the user with that id. This is useful when you want to create routes that can be accessed using dynamic information like ids, usernames, etc.

## Creating Dynamic Routes

Since all Hana routes are basically just files in the `pages` directory, dynamic routes are no different. The only thing you need to note is that to make a route dynamic, the filename should be wrapped in square brackets (`[]`). For example, if you create a file called `[id].tsx` in the `pages/users` directory, it will create a route for `/users/:id`. This makes the `id` parameter dynamic, and you can access it using the `useParams()` hook.

```jsx
// Path: /pages/users/[id].tsx
import { useParams } from '@hanabira/router';

export default function User() {
  const { id } = useParams();

  return <div>User ID: {id}</div>
}
```

Note that the name of the file is used as the name of the parameter. For example, if you create a file called `[userId].tsx` in the `pages/users` directory, it will create a route for `/users/:userId`. That means that the name of the parameter is `userId`.

The `useParams` hook is used to access the parameters of a dynamic route. It returns an object containing the parameters of the route. It can also be typed to provide type safety.

```tsx
// Path: /pages/users/[id].tsx

// The type of the id parameter is string
const { id } = useParams<{ id: string }>();
```

This also works when a folder's name is made up of square brackets. For example, if you create a file called `stats.tsx` in the `pages/users/[user]` directory, it will create a route for `users/:user/stats`. That means that the name of the parameter is `user`.

```jsx
// Path: /pages/users/[user]/stats.tsx
import { useParams } from '@hanabira/router';

export default function UserStats() {
  const { user } = useParams();

  return <div>User: {user}</div>
}
```

## Nested Dynamic Routes

You can also nest dynamic routes. For example, you can create a route that accepts a user id and a post id. This can be done by creating a file called `[id].tsx` in the `pages/users/[user]/posts` directory. This will create a route for `/users/:user/posts/:id`. Similar to what we did above, you can access the parameters using the `useParams` hook.

```jsx
// Path: /pages/users/[user]/posts/[id].tsx
import { useParams } from '@hanabira/router';

export default function Post() {
  const { user, id } = useParams();

  return (
    <div>
      User: {user}
      <br />
      Post ID: {id}
    </div>
  )
}
```

## Dynamic Routes with Query Parameters

You can also create dynamic routes that accept query parameters. This can be done by creating a file called `[id].tsx` in the `pages/users` directory. This will create a route for `/users/:id`. You can then access the query parameters using the `useQueryParams` hook.

```jsx
// Path: /pages/users/[id].tsx
import { useParams, useQueryParams } from '@hanabira/router';

export default function User() {
  const { id } = useParams();
  const { name } = useQueryParams();

  return (
    <div>
      User ID: {id}
      <br />
      Name: {name}
    </div>
  )
}
```

## Optional Dynamic Routes

Optional dynamic routes are dynamic routes that can be accessed with or without a parameter. This can be done by wrapping the parameter in double square brackets (`[[]]`). For example, if you create a file called `[[query]].tsx` in the `pages/search` directory, it will create a route for `/search/[[query]]`. This route will be accessible on `/search` and `/search/:query`. You can then access the query parameter using the `useParams` hook.

```jsx
// Path: /pages/search/[[query]].tsx
import { useParams } from '@hanabira/router';

export default function Search() {
  const { query } = useParams();

  return <div>Query: {query}</div>
}
```
