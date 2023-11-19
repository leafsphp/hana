# Asset Bundling

<!-- markdownlint-disable no-inline-html -->

Vite is a modern build tool for frontend applications. It aims to provide a faster and leaner development experience for modern web projects. Using the Vite module, you can seamlessly bundle your CSS and JS assets using vite.

<details>
  <summary>New to bundling?</summary>
  <p>
    Check out these articles from SitePoint and Next JS:
    <ul>
      <li>
        <a href="https://www.sitepoint.com/javascript-modules-bundling-transpiling">JavaScript Modules: Bundling & Transpiling</a>
      </li>
      <li>
        <a href="https://nextjs.org/learn/foundations/how-nextjs-works/bundling">How Next.js Works</a>
      </li>
    </ul>
  </p>
</details>

## Usage with Leaf MVC

Leaf MVC comes with built-in support for Vite, this means you can use Vite to bundle your assets without installing any extra packages. All you need to do is to start your Vite server. You can do this by running:

```bash
leaf view:dev
```

Or with npm/pnpm/yarn:

```bash
npm i && npm run dev
...
pnpm i && pnpm run dev
...
yarn && yarn dev
```

From inside your views, you can use the `vite()` helper to load your assets. For example, to load a CSS file, you can do:

```php
<?php echo vite('app/views/assets/css/app.css'); ?>
```

You can also use the path relative to your views directory since vite will automatically look for files in your views directory. For example, if you have a file at `app/views/assets/css/app.css`, you can do:

```php
<?php echo vite('assets/css/app.css'); ?>
```

## Usage with Leaf Core

Since Leaf's core comes with no prior setup or configuration, you'll need to install and setup the vite module yourself. There are 2 ways to do this:

- Using the Leaf CLI's `view:install` command
- Manually installing and configuring vite

### Using the Leaf CLI

The Leaf CLI comes with a `view:install` command that can be used to install and configure vite. You can do this by running:

```bash
leaf view:install --vite
```

This will install vite and the vite-leaf plugin, and will also install the vite module which will be used to load your assets on the server side. It will also create a vite config file at the root of your project. This config file can be used to configure vite, add plugins and more. You can learn more about vite config files [here](#vite-config).

From there, you can start your vite server by running:

```bash
leaf view:dev
```

### Manually installing vite

First, install vite and the vite-leaf plugin:

```bash
npm i -D vite @leafphp/vite-plugin
```

We will also need to install the vite module which will be used to load our assets on the server side:

```bash
leaf install vite
```

Or with composer:

```bash
composer require leafs/vite
```

## Vite Config

Vite will automatically try to resolve a config file named `vite.config.js` at the project root level. This config file can be used to configure vite, add plugins and more. You can learn more about vite config files [here](https://vitejs.dev/config/).

The Leaf Vite plugin requires an array of entry points for your application. These may be JavaScript or CSS files, and include preprocessed languages such as TypeScript, JSX, and Sass.

```js{6-12}
import { defineConfig } from 'vite';
import leaf from '@leafphp/vite-plugin';

export default defineConfig({
  plugins: [
    leaf({
      input: [
        'path/to/entrypoint.css',
        'path/to/entrypoint.js'
      ],
      refresh: true
    })
  ]
});
```

## Running Vite

If you're using a Leaf MVC app or you installed Vite using the `view:install` command, you can start your vite server without any extra configuration. You can do this by running:

```bash
leaf view:dev
```

If you installed vite manually, you'll need to add a script to your `package.json` file to run vite. You can do this by adding the following to your `package.json` file:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

You can then start your vite server using the `view:dev` command above.

## Loading your assets

The vite module comes with a helper function that can be used to load your assets. This helper function is available as `vite()` and can be used to load your scripts and styles. It takes in 2 parameters:

- The path to the asset
- The folder to load the asset from (optional, defaults to the assets path in leaf config or `app/views` if not set)

For example, to load a CSS file, you can do:

```php
<?php echo vite('app.css'); ?>
```

To load assets from a folder, you can do:

```php
<?php echo vite('app.css', 'assets/css'); ?>
```

You can also load multiple assets at once by passing in an array of assets:

```php
<?php echo vite(['app.css', 'app.js']); ?>
```

The `vite()` helper function will automatically load the correct assets depending on the environment. In development, it will load the assets from the vite server with Hot Module Replacement, while in production, it will load the assets from the build folder.

## Aliases

Vite allows you to set up aliases for your assets. This can be done by adding an `alias` key to your vite config. For example, to set up an alias for the `@` symbol, you can do:

```js{14-18}
import { defineConfig } from 'vite';
import leaf from '@leafphp/vite-plugin';

export default defineConfig({
  plugins: [
    leaf({
      input: [
        'path/to/entrypoint.css',
        'path/to/entrypoint.js'
      ],
      refresh: true
    })
  ],
  resolve: {
    alias: {
      '@': '/path/to/folder',
    }
  }
});
```

## Vite + other frameworks

Vite can be used with any framework. You can learn more about using vite with other frameworks [here](https://vitejs.dev/guide/#scaffolding-your-first-vite-project). We've included in-depth guides on using vite with some of the most popular frameworks:

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/modules/views/inertia/">
    <h3 class="next-steps-link">Inertia JS</h3>
    <small class="next-steps-caption">Learn how to set up React or Vue JS to run with Leaf using Inertia and Vite.</small>
  </a>
</div>
