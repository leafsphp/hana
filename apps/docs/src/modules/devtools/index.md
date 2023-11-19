# Leaf DevTools

Leaf DevTools provides a set of tools for debugging and understanding your Leaf applications. At the Core, the DevTools provides a visual tool with a clean and intuitive UI holding information about your Leaf application, and a light-weight library that you can use to interact with the devtools frontend.

<img src="https://user-images.githubusercontent.com/26604242/235434208-82ccdd87-6289-43fd-b93b-5fa09e6acd20.jpg" style="border: 1px solid var(--vt-c-theme-soft); border-radius: 8px;" />

## Installation

You can install the Leaf DevTools using the Leaf CLI:

```bash
leaf install devtools
```

Or with composer:

```bash
composer require leafs/devtools
```

After installing the devtools module, you need to add the hook to your app. This will register the devtools routes and allow your Leaf app to communicate with the DevTools. You can do this by adding this line to your app root.

<div class="class-mode">

```php{7}
<?php

require __DIR__ . "/vendor/autoload.php";

$app = new Leaf\App;

\Leaf\DevTools::install();

...
```

</div>

<div class="functional-mode">

```php{5}
<?php

require __DIR__ . "/vendor/autoload.php";

\Leaf\DevTools::install();

...
```

</div>

## Basic Usage

Once you have completed the process above, you can start your application and open the DevTools in your browser. You can do this by going to `http://localhost:port/leafDevTools` in your browser.

::: tip Dev Experience
Leaf DevTools are still being developed. We're working on making the experience better and more intuitive. If you have any suggestions, please feel free to open an issue on the [GitHub repo](https://github.com/leafsphp/devtools).
:::

## Application Insights

Leaf DevTools has an insights tab that provides information about your Leaf app, like your application config, routes, cookies, sessions, env and more. This information is useful for debugging and understanding your app and why it behaves the way it does.

<img src="https://github.com/leafsphp/devtools/assets/26604242/f3c679a3-8770-4531-9aed-026cb374dc7c" style="border: 1px solid var(--vt-c-theme-soft); border-radius: 8px;">

## Installed Packages

On the packages tab, you can see all the installed packages in your application. The installed packages are separated into two categories: Composer packages and Leaf packages. You can also see the version of each package, a description and a link to the package's GitHub repo.

<img src="https://github.com/leafsphp/devtools/assets/26604242/bac64f7d-a9a7-487f-83e2-fde1679f5726" style="border: 1px solid var(--vt-c-theme-soft); border-radius: 8px;">

## Server Console Logs

The server module allows you to log out data which will be displayed in the dev tools console (just like console.log). Since PHP doesn't have any real implementation of something like JavaScript's console.log, we decided to add something like that as it is useful for debugging.

To get started, call the console method on `Leaf\DevTools`

```php
\Leaf\DevTools::console('This data should be logged in the console');
\Leaf\DevTools::console('This is a warning', 'warn');
\Leaf\DevTools::console('This is an error', 'error');
\Leaf\DevTools::console('This is an info message', 'info');
\Leaf\DevTools::console('This is a debug message', 'log');
```

<img src="https://github.com/leafsphp/devtools/assets/26604242/195e15b1-d063-4cf2-a817-5a60e8ba184d" style="border: 1px solid var(--vt-c-theme-soft); border-radius: 8px;">

## Application Routes

The routes tab shows all the routes in your application. It shows the route's name, method, path, handler and middleware if available.

<img src="https://github.com/leafsphp/devtools/assets/26604242/9e340a62-694e-4c2c-b3b0-ea911f4e0b83" style="border: 1px solid var(--vt-c-theme-soft); border-radius: 8px;">

## Extras

Installing the devtools module also gives you access to the `dump` function from Symfony's VarDumper. You can read more about it [here](https://symfony.com/doc/current/components/var_dumper.html).

```php
dump($data);
```

## Deployment

You should note that the devtools module is meant for use ONLY IN DEVELOPMENT. You should not use it in production as it can be a security risk. For now, the only way to disable the devtools is to remove the hook from your app or uninstall it completely.

A small workaround is to add a condition to the hook so that it only runs in development mode. You can do this using the `script` method on the `Leaf\App` class.

<div class="class-mode">

```php
$app->script('development', function () {
    \Leaf\DevTools::install();
});
```

</div>

<div class="functional-mode">

```php
app()->script('development', function () {
    \Leaf\DevTools::install();
});
```

</div>
