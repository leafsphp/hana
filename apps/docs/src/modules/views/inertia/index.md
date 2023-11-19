# Inertia JS

[Inertia](https://inertiajs.com/) is a new approach to building classic server-driven web apps. It allows you to create fully client-side rendered, single-page apps, without the complexity that comes with modern SPAs. It does this by leveraging existing server-side patterns that you already love.

## Usage with Leaf MVC

Leaf MVC and Leaf API come with built-in support for Inertia.js. This means you can build amazing frontend applications using Inertia.js and Leaf right out of the box without any extra configuration.

Leaf CLI comes with a `view:install` command to help you get on your way as fast as possible. Since inertia provides support for a variety of frontend frameworks, this command will help you install and setup inertia for your preferred frontend framework.

To get started, run:

```bash
php leaf view:install
```

Or with the Leaf CLI:

```bash
leaf view:install
```

This will prompt you to select your preferred frontend framework. You can choose from Vue, React, and Svelte. There is also support for styling with Tailwind/Bootstrap. After selecting your preferred framework, Leaf will automatically install and setup inertia for you, including examples for you to get started with.

::: tip view:install
If you know the specific frontend framework you want to use, you can pass the `--{framework}` flag to the `view:install` command. For example, to install inertia for Vue, you can run:

```bash
php leaf view:install --vue
```

:::

To run your app, you should start the server for both your frontend and backend. To start the backend server, run:

```bash
php leaf serve

# or with the Leaf CLI

leaf serve
```

To start the frontend server, run:

```bash
npm run dev

# or with the Leaf CLI

php leaf view:dev
leaf view:dev
```

## Usage with Leaf Core

Inertia has been fine-tuned to work with Leaf MVC and Leaf API. However, you can still use inertia with Leaf Core, however, you'll need to install and setup inertia yourself. There are 2 ways to do this:

- [Using the Leaf CLI](#using-the-leaf-cli)
- [Manually setting up inertia](#manually-setting-up-inertia)

::: tip This guide
This guide also applies to using Inertia outside of Leaf applications. You can use this guide to setup inertia for any PHP application.
:::

### Using the Leaf CLI

The Leaf CLI comes with a `view:install` command to help you get on your way as fast as possible. Since inertia provides support for a variety of frontend frameworks, this command will help you install and setup inertia for your preferred frontend framework.

To get started, run:

```bash
leaf view:install
```

This will prompt you to select your preferred frontend framework. You can choose from Vue, React, and Svelte. There is also support for styling with Tailwind/Bootstrap. After selecting your preferred framework, Leaf will automatically install and setup inertia for you, including examples for you to get started with.

::: tip view:install
If you know the specific frontend framework you want to use, you can pass the `--{framework}` flag to the `view:install` command. For example, to install inertia for Vue, you can run:

```bash
leaf view:install --vue
```

:::

Using this will install and setup Vite and inertia for you, however, depending on your own setup, you might need to make some changes to the setup. For example, you might need to change the entry-point for Vite. You can do this by changing the `input` option in your vite config file.

```js
leaf({
  input: ['js/app.jsx'],
  ...
}),
```

Read more about setting up Vite [here](/modules/views/vite/#vite-config).

To run your app, you should start the server for both your frontend and backend. To start the backend server, run:

```bash
leaf serve
```

To start the frontend server, run:

```bash
npm run dev
```

### Manually setting up inertia

If you don't want to use the Leaf CLI, you can manually setup inertia. This guide will show you how to setup inertia with Vite and React. You can use this guide to setup inertia with any frontend framework.

### Setting up Vite

To get started, you need to setup Vite. We have a Leaf plugin that takes care of a lot of the heavy lifting for you. We have a detailed guide on how to setup vite with Leaf [here](/modules/views/vite/#usage-with-leaf-core).

```bash
npm i -D vite @leafphp/vite-plugin
leaf install vite
```

### Vite Config

The [Leaf Vite docs](/modules/views/vite/#vite-config) have a detailed guide on how to setup vite config files. You should however note that for the best developer experience, you should point Vite to your view directory so you can enjoy hot module reloading.

```js
...

export default defineConfig({
  plugins: [
    leaf({
      ...
      refresh: ['yourviews/**'],
    }),
  ],
});
```

Also note that your entry-point should be your base JavaScript file. For the best experience, CSS and other assets should be imported from your base JavaScript file.

```js
leaf({
  input: ['js/app.jsx'],
  ...
}),
```

### Setting up Inertia

To setup inertia, you need to install the inertia package for whatever frontend framework you want to use, together with the Vite plugin for that framework. For example, if you want to use React, you should install the Inertia React package, React Vite plugin as well as React itself:

```bash
npm i react react-dom @inertiajs/react @vitejs/plugin-react
```

You should also install the Leaf Inertia PHP adapter:

```bash
leaf install inertia
```

Or with composer:

```bash
composer require leafs/inertia
```

After adding the React Vite plugin, you should add it to your vite config file:

```js{3,10}
import { defineConfig } from 'vite';
import leaf from '@leafphp/vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    leaf({
      ...
    }),
    react(),
  ],
});
```

### Setting up your base JavaScript file

You should create a base JavaScript file that will be used to mount your app. This file should import your CSS and other assets. For example, if you're using React, your base JavaScript file should look like this:

```jsx
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from '@leafphp/vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Leaf PHP';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./DIRECTORYFORCOMPONENTS/${name}.jsx`,
      import.meta.glob('./DIRECTORYFORCOMPONENTS/**/*.jsx')
    ),
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
```

`DIRECTORYFORCOMPONENTS` is the directory where your React pages are located. You can change this to whatever you want. You should also change the `setup` function to match your frontend framework. For example, if you're using Vue, you should change the `setup` function to:

```js
setup({ el, App, props }) {
  createApp({
    render: () => h(App, props),
  }).mount(el);
},
```

### Setting up your base PHP file

You should create a base PHP file that will be used to render your app. By default, the Leaf Inertia PHP adapter will look for a file named `_inertia.view.php` in your views directory. You can change this by passing the path to your base PHP file to the `Inertia::setRoot` method.

```php
Inertia::setRoot('myfiles/_base');
```

Since the Leaf Inertia PHP adapter is built using the [Bare UI engine](/modules/views/bareui/), your base file needs to maintain the `.view.php` extension. For example, if you're using React, your base PHP file should look like this:

```php
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title inertia>Document</title>
  <?php echo \Leaf\Vite::reactRefresh(); ?>
  <?php echo vite(['/js/app.jsx', "/js/Pages/{$page['component']}.jsx"]); ?>
  <?php
    if (!isset($__inertiaSsrDispatched)) {
      $__inertiaSsrDispatched = true;
      $__inertiaSsrResponse = (new \Leaf\Inertia\Ssr\Gateway())->dispatch($page);
    }

    if ($__inertiaSsrResponse) {
      echo $__inertiaSsrResponse->head;
    }
  ?>
</head>

<body>
  <?php
    if (!isset($__inertiaSsrDispatched)) {
      $__inertiaSsrDispatched = true;
      $__inertiaSsrResponse = (new \Leaf\Inertia\Ssr\Gateway())->dispatch($page);
    }

    if ($__inertiaSsrResponse) {
      echo $__inertiaSsrResponse->body;
    } else {
      echo '<div id="app" data-page="' . json_encode($page) . '"></div>';
    }
  ?>
</body>

</html>
```

This might look pretty ugly, but you'll never have to touch this file again. You can also use the Leaf CLI to generate this file for you:

```bash
leaf view:install --inertia
```

### Setting up your frontend framework

In the setup above, we told Inertia to look for our frontend framework files in `./DIRECTORYFORCOMPONENTS/`. You should create this directory and add your frontend framework files to it. For example, if you're using React, you should create a file named `Home.jsx` in this directory:

```jsx
const Home = () => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

export default Home;
```

## Setting up your routes

Your routing does not change when using Inertia. You can use the same routing you use for your backend. For example, if you're using Leaf, define your routes the same way:

```php
app()->get('/', function () {
  echo 'This is a route';
});
```

The only difference is that you need to return an Inertia response instead of a normal response. You can do this by using the `Inertia::render` method:

```php
app()->get('/', function () {
  Inertia::render('Home');
});
```

The `Home` argument is the name of the file you created in `./DIRECTORYFORCOMPONENTS/`. You can also pass data to your frontend framework by passing an array as the second argument to the `Inertia::render` method:

```php
app()->get('/', function () {
  return Inertia::render('Home', [
    'name' => 'Leaf',
  ]);
});
```

You can then access this data in your frontend framework as props. For example, if you're using React, you can access the `name` prop like this:

```jsx
const Home = ({ name }) => {
  return (
    <div>
      <h1>Hello {name}</h1>
    </div>
  );
};

export default Home;
```
