# Project Structure

<!-- <script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script> -->

Hana comes with a straightforward directory structure that makes it easy to organize your code. It is a mixture of what you get with Vite and Next.js. This guide will walk you through the structure of a Hana application.

<!-- <VideoDocs
  title="New to Docker?"
  subject="Docker Tutorial for Beginners"
  description="This video by Mosh Hamedani will walk you through the basics of Docker."
  link="https://www.youtube.com/embed/pTFZFxd4hOI"
/> -->

## Tree Structure

```bash
.
├── index.html
├── package.json
├── pages
│   ├── _app.jsx
│   ├── index.jsx
│   └── vite-env.d.ts
├── public
└── vite.config.ts
```

As you can see, this is a very simple structure. Let's go over each file and directory.

## Directories

### `pages`

This is the only Hana specific directory. It is where all your routes (pages) will be stored. Almost every file in the `pages` directory will be treated as a route. You can read more about this [here](/docs/router/).

### `public`

This is where you will store all your static assets. You can read more about it [here](https://vitejs.dev/guide/assets.html#the-public-directory).

## Files

### `index.html`

This is the entry point to your application. It is where you will load your application's JavaScript file. You can also add any global styles or scripts here. It is used by Vite to generate your application's HTML file.

### `pages/_app(.jsx/.tsx)`

This is where you will define your app's layout. Any component or logic that should be accessible to all your components can be registered in this file. You can read more about this [here](/docs/router/root).

### `package.json`

This is your application's package file. All your application's dependencies and scripts will be stored here. You can read more about it [here](https://docs.npmjs.com/cli/v7/configuring-npm/package-json).

### `vite.config.ts`

This is your application's [Vite configuration file](https://vitejs.dev/config/). It is also where Hana router's configuration can be found. You can read more about that [here](/docs/routing/config/).

## .hana

Hana creates a `.hana` directory in your project's root directory. This is used internally by Hana to load your application and so should not be modified. You should also add this directory to your `.gitignore` file since a new one will be created every time you run your `dev` or `build` script.
