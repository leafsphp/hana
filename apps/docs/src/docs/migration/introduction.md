# Migration Guide

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

<!-- <VideoDocs
  subject="Watch the migration guide on youtube"
  description="[@mychidarko](https://github.com/mychidarko) gives a walkthrough on migrating a leaf 2 app to use leaf 3 and modules."
  link="https://www.youtube.com/embed/BTcUgeOZLyM"
/> -->

This guide is primarily for users with prior Leaf 2 experience who want to learn about the new features and changes in Leaf 3. **This is not something you have to read from top to bottom before trying out Leaf 3.** While it looks like a lot has changed, a lot of what you know and love about Leaf is still the same; but we wanted to be as thorough as possible and provide detailed explanations and examples for every documented change.

::: warning Coming from another library
Migrating from another framework? [READ THIS](/docs/migration/other) to get started.
:::

- [Quickstart](#quickstart)
- [Breaking Changes](#breaking-changes)
- [Notable New Features](#notable-new-features)
<!-- - [Supporting Libraries](#supporting-libraries) -->

<!-- ## Overview

<br>
<iframe src="https://player.vimeo.com/video/440868720" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

Start learning Leaf 3 at [Leaf Mastery](https://www.Leafmastery.com/courses-path/Leaf3). -->

## Quickstart

If you want to quickly try out Leaf 3 in a new project, create a folder and run:

```bash
composer require leafs/leaf
```

This will quickly setup a leaf 3 with the default modules. From there, create your `index.php` file and add this quickstart.

<div class="functional-mode">

When using functional mode:

```php
<?php

require __DIR__ . "/vendor/autoload.php";

app()->get("/", function () {
  response()->json(["name" => "Leaf"]);
});

app()->run();
```

</div>
<div class="class-mode">

When using classes:

```php
<?php

require __DIR__ . "/vendor/autoload.php";

$app = new \Leaf\App();

$app->get("/", function () use($app) {
  $app->response()->json(["name" => "Leaf"]);
});

$app->run();
```

</div>

You can run this with the built in php server

```bash
php -S localhost:5500
```

Alternatively, you can use the Leaf CLI:

```bash
leaf create <app-name>
```

And run the sample app with:

```bash
leaf serve
```

### Migrating from leaf 2

As mentioned before, we've made leaf 3 as backwards compatible with Leaf 2.5+ as possible. This means that moving from v2 to v3 will be a breeze or close.

- Install leaf 3

```bash
composer require leafs/leaf
```

Or with leaf CLI

```bash
leaf install leaf
```

::: tip Watch out
You should probably delete your `vendor` folder and `package-lock.json` before running the command above to make sure that all the dependencies are accurately reinstalled.
:::

- After this, it's just a matter of installing the modules required in your project.
For example, if you use `Leaf\Auth`, you will need to install the auth module. This can be done with:

```bash
leaf install auth
```

Or with composer:

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

<div class="class-mode">

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

</div>
<div class="functional-mode">

Replace this:

```php
app()->evadeCors(true);

// ...
```

with...

```php
app()->cors();

// ...
```

</div>

The cors method is automatically linked to the cors module by Leaf and so, no extra configuration is needed to make it work. Cors takes in some optional configuration, checkout the [cors module docs](/modules/cors/). Also cors is no longer available on the response object.

### Router

`Leaf\Router::getRequestMethod` has been been moved to `Leaf\Http\Request::getMethod`. This is used in Leaf's core and should not be an issue, but if you do have references to this function, changing it to `Leaf\Http\Request::getMethod` will fix any errors.

## Notable New Features

Some of the new features to keep an eye on in Leaf 3 include:

- [Global functions](/docs/tooling/functions)
- [CORS module](/modules/cors/)
