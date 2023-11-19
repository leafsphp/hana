# BareUI

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

Most templating engines out there ship with a nice syntax, handy ways to use expressions, layouts and code blocks, however, there's one problem: speed! Bare UI is here to solve that. Bare UI is a barebones templating engine focused on speed, speed and more speed! It lacks all the syntactic sugar added in other engines like blade, but it also requires no compiling, no caching, just speed!

<details>
<summary>New to template engines?</summary>

Watch this video by Dave Hollingworth as an introduction to template engines.

<VideoDocs
  title="Templating engines in PHP"
  subject="Templating engines in PHP: what they are and how they can improve your code"
  description="Learn how using a template engine can improve your view files with simpler syntax, autoescaping of variables and template inheritance."
  link="https://www.youtube.com/embed/OK_JCtrrv-c"
/>
</details>

## Installation

You can always install BareUI with the Leaf CLI:

```bash
leaf install bareui
```

Or with composer:

```bash
composer require leafs/bareui
```

## Usage with Leaf MVC

Leaf MVC and Leaf API come with [Leaf Blade](/modules/views/blade/) out of the box, however, since Leaf is modular at it's core, Leaf MVC and Leaf API allow you easily swap out the blade engine for BareUI (or any other view engine). To do this, you need to swap out the blade engine in your `public/index.php`:

```php
// public/index.php
Leaf\View::attach(\Leaf\Blade::class); // remove this
Leaf\View::attach(\Leaf\BareUI::class); // add this
```

After this, you will also need to change the config in `config/view.php`:

```php
<?php

use Leaf\View;

return [
    /*
    |--------------------------------------------------------------------------
    | Template Engine [EXPERIMENTAL]
    |--------------------------------------------------------------------------
    |
    | Leaf MVC unlike other frameworks tries to give you as much control as
    | you need. As such, you can decide which view engine to use.
    |
    */
    'viewEngine' => \Leaf\BareUI::class,

    /*
    |--------------------------------------------------------------------------
    | Custom config method
    |--------------------------------------------------------------------------
    |
    | Configuration for your templating engine.
    |
    */
    'config' => function ($config) {
        View::bareui()->config($config['views']);
    },

    /*
    |--------------------------------------------------------------------------
    | Custom render method
    |--------------------------------------------------------------------------
    |
    | This render method is triggered whenever render() is called
    | in your app if you're using a custom view engine.
    |
    */
    'render' => function ($view, $data = []) {
        return View::bareui()->render($view, $data);
    },
];
```

This will tell Leaf how to work with BareUI.

## Introduction

BareUI takes a fully static approach which means you can use all of it's methods without having to initilaize the package first. Also, there are only 2 things you need to keep in mind about Bare UI

::: tip Quick Tip
BareUI has deep integrations with Leaf core by default. This means that if you're using BareUI in leaf, it will always be available on the leaf instance as `template`.

<div class="functional-mode">

```php
app()->template->config('path', './views');
```

</div>
<div class="class-mode">

```php
$app->template->config('path', './views');
```

</div>

:::

### config

This method allows you to configure bare ui.

```php
Leaf\BareUI::config('path', './templates');

// or

Leaf\BareUI::config(['path' => './templates', ...]);
```

#### Available options

There are currently only 2 options to configure.

- path (string): This tells leaf where to look for templates.
- params (array): These are a bunch of base parameters that will be available in all of your templates.

<div class="functional-mode">

```php
// app() will be available in all templates
app()->template->config('params', ['app' => function () {
  // do something
  return app();
}]);
```

</div>
<div class="class-mode">

```php
// app() will be available in all templates
$app->template->config('params', ['app' => function () use ($app) {
  // do something
  return $app;
}]);
```

</div>

`template.view.php`

<div class="functional-mode">

```php
<?php

if (!$something) {
  // you can nest templates
  echo app()->template->render('error');
}
```

</div>
<div class="class-mode">

```php
<?php

if (!$something) {
  // you can nest templates
  echo $app->template->render('error');
}
```

</div>

### render

As the name implies, this method allows you to return an bare ui. It takes in the UI to render.

::: tip NOTE
BareUI files end with `.view.php`. This allows you easily distinguish them from the rest of your files.
:::

Let's look at a simple template:

`welcome.view.php`

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php echo $var; ?>
</body>
</html>
```

We can render this from where we want the UI to show:

<div class="functional-mode">

```php
echo app()->template->render("welcome", [
    "var" => "Something",
]);
```

</div>
<div class="class-mode">

```php
echo $app->template->render('welcome', [
    'var' => 'Something',
]);
```

</div>

Since bare UI templates are just raw PHP, you can do stuff like this:

<div class="functional-mode">

```php
echo app()->template->render('app', [
    'items' => ['i1', 'i2'],
]);
```

</div>
<div class="class-mode">

```php
echo $app->template->render('app', [
    'items' => ['i1', 'i2'],
]);
```

</div>

`app.view.php`

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php if (count($items) > 0) : ?>
        <ul>
            <?php foreach($items as $item) : ?>
                <li><?php echo $item; ?></li>
            <?php endforeach; ?>
        </ul>
    <?php else : ?>
        <p>There are no items</p>
    <?php endif; ?>
</body>
</html>
```
