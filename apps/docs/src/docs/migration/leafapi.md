# Introduction

::: tip
Leaf 3 is not yet available with Leaf 3. This means that you need to add Leaf 3 to your project manually.
:::

This guide is primarily for Leaf API users with prior Leaf 2 experience who want to learn about the new features and changes in Leaf 3.

- [Quickstart](#quickstart)
- [Breaking Changes](#breaking-changes)
- [Notable New Features](#notable-new-features)
- [Supporting Libraries](#supporting-libraries)

<!-- ## Overview

<br>
<iframe src="https://player.vimeo.com/video/440868720" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

Start learning Leaf 3 at [Leaf Mastery](https://www.Leafmastery.com/courses-path/Leaf3). -->

## Quickstart

If you want to quickly try out Leaf 3 in a new project:

```bash
composer require leafs/leaf v3.x-dev
```

This will quickly setup leaf 3 with the default modules. From there, create your `index.php` file and add this quickstart.

```php
<?php

require __DIR__ . "/vendor/autoload.php";

app()->get("/", function () {
  app()->response(["name" => "Leaf"]);
});

app()->run();
```

You can run this with the built in php server

```bash
php -S localhost:5500
```

### Migrating from leaf 2

As mentioned before, we've made leaf 3 as backwards compatible with Leaf 2.5+ as possible. This means that moving from v2 to v3 will be a breeze or close.

::: warning
Note that leaf 3 is still under active development. We don't recommend switching to Leaf 3 yet for production ready apps. You can go ahead if it's a personal project or just want to try out leaf 3.
:::

- Install leaf 3

```bash
composer require leafs/leaf v3.x-dev
```

> You can delete your vendor folder before running the command above to make sure that all the dependencies are accurately reinstalled.

- After this, it's just a matter of installing the modules required in your project.
For example, if you use `Leaf\Auth`, you will need to install the auth module. This can be done with:

```bash
composer require leafs/auth
```

Just do this for all other modules in your project. And your app should be back online, working even faster than before.

## Breaking Changes

The following consists a list of breaking changes from 2.x:

### Modules

Leaf 3 only retains the core of the framework with a few utilities, all other features were packaged as modules. This means that you will have errors if you try to use some packages like `Leaf\Auth` or `Leaf\Flash` without installing them first.

This is not really a problem since installing the module will automatically fix any problems that came along with it's abscence.

### CORS

In v2, some basic cors configuration was available on the Leaf object, however, this has been discontinued and replaced with the Cors module. This module contains both basic and advanced CORS configurations and is inspired by the ExpressJS cors package. So if you have any experience with that library, you will have no problems using the leaf cors module.

To fix any problems with cors in your Leaf 2 app, follow these steps:

- Install the cors module

```bash
composer require leafs/cors
```

- Replace the original cors configuration with the cors module. (This is done under the hood for you, all you need to do now call the cors method on your leaf app)

Replace this:

```php
$app = new Leaf\App;

$app->evadeCors(true);

// ...
```

with...

```php
$app = new Leaf\App;

$app->cors();

// ...
```

The cors method is automatically linked to the cors module by Leaf and so, no extra configuration is needed to make it work. Cors takes in some optional configuration, checkout the [cors module docs](/modules/cors/). Also cors is no longer available on the response object.

### Router

`Leaf\Router::getRequestMethod` has been been moved to `Leaf\Http\Request::getMethod`. This is used in Leaf's core and should not be an issue, but if you do have references to this function, changing it to `Leaf\Http\Request::getMethod` will fix any errors.

## Notable New Features

Some of the new features to keep an eye on in Leaf 3 include:

<!-- - [Functional Mode](/docs/core/functional-mode.html) <Badge text="EXPERIMENTAL" type="warning" /> -->
<!-- - [Glopbal functions](/docs/core/globals/) <Badge text="EXPERIMENTAL" type="warning" /> -->
- [CORS module](/modules/cors/)
