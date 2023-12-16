# Installation

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

Hana is built by design to be simple to integrate into any project. At it's core, it's just a simple Vite and React setup.

There are three primary ways of adding Leaf PHP to a project:

1. [Setup a project using create-hana-app [RECOMMENDED]](#create-hana-app).
2. [Manually set up Hana](#manual-setup)
3. [Use components](#hana-components)

## Technical Requirements

Before creating your first Hana application you must:

- Install Node JS (minimum version required by Vite is 18);
- Anywhere Vite can run, Hana can run.

## Create Hana App

Hana comes with a [create-hana-app](/docs/cli/) CLI tool that allows you to quickly create a new Hana app. It is the recommended way of setting up a Hana app. It allows you to customize your installation and choose between TypeScript and JavaScript.

```bash
npx create-hana-app@latest # for npm users
pnpx create-hana-app@latest # for pnpm users
```

Or

```bash
npm create hana-app@latest # for npm users
yarn create hana-app@latest # for yarn users
pnpm create hana-app@latest # for pnpm users
```

This will take you through a series of prompts that will help you set up your project. After that, a new Hana app will be created in the directory you specified. You can then run your app with `npm run dev`.

## Manual Setup

This is a bit more complex than using the CLI tool, but it's still pretty simple. You can set up Hana manually by following the steps below:

1. Create a new Vite + React app or use an existing one.
2. Install Hana router or any other Hana component you want to use.

In your existing Vite + React app, you can install Hana router by running:

```bash
npm install @hanabira/router
```

From there, open your Vite config file and add the Hana plugin. The plugin takes in options that allow you to customize Hana router. You can find a list of all the options [here](/docs/routing/config).

```js
import { defineConfig } from 'vite';
import { hana } from '@hanabira/router';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    hana({
      root: __dirname,
      typescript: true,
      usePageTransition: true,
      mode: 'history',
    }),
  ],
});
```

Once you've done that, you can create a new folder in your `src` directory named `pages`. This is where all your routes (pages) will be stored. Every file in the `pages` directory will be treated as a route. You can read more about this [here](/docs/routing/). You also need to add an `_app.jsx` or `_app.tsx` file to your `pages` directory. This is where you will define your app's layout. You can read more about this [here](/docs/routing/).

```js
const Application = ({ children }) => {
  return <>{children}</>;
};

export default Application;
```

You can use this as a base layout or a place to load your global styles and components. Just be sure to render the `children` prop as that is where your pages will be rendered.

The last thing you need to do is to update your `index.html` file. You need to set the application file to `.hana/_app.jsx` or `.hana/_app.tsx` depending on your setup.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/.hana/_app.tsx"></script>
  </body>
</html>
```

## Hana Components

The last way to add Hana to your project is by using Hana components. Hana components are a collection of components that you can use in your React app. They are built to work with Hana, but they can also be used in any React app. You can find a list of all the components [here](/docs/introduction/). You can install them by running:

```bash
npm install @hanabira/<component-name>
```

From there, you can import and use the component in your app.

## Next Steps

Now that you have set up Hana, you can start building your app.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/docs/introduction/structure">
    <h3 class="next-steps-link">Project Structure</h3>
    <small class="next-steps-caption">Learn about the structure of a Hana application.</small>
  </a>
  <a class="vt-box" href="/docs/cli">
    <h3 class="next-steps-link">Create-Hana-App</h3>
    <small class="next-steps-caption">Read about the options available with the CLI</small>
  </a>
  <a class="vt-box" href="/docs/routing/">
    <h3 class="next-steps-link">Routing</h3>
    <small class="next-steps-caption">Jump straight into learning about the Hana Router</small>
  </a>
</div>
