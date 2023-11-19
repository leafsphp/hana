# Viewi Integration

<!-- markdownlint-disable no-inline-html -->

When developing a web application, you either use a javascript framework or go with a backend template engine and lose reactivity. To get both at the same time requires some complex manipulations, and it's not always efficient.

Viewi allows you to create reactive web applications using PHP. It converts your code into native javascript code to run it in the browser. This way, you get a perfectly rendered HTML page on the first load, and at the same time, your page will remain reactive without requesting each next page on link clicks, etc.

It's a new approach to writing web applications that target both sides: server and browser. Do not sacrifice one for another.

[Read the Viewi docs for more info](https://viewi.net/).

To start using Viewi in your Leaf apps, you simply need to install the Leaf Viewi module. This module has everything you need to quickly and easily setup and build your Viewi app with Leaf.

## Installation

You can install the Viewi module with the Leaf CLI:

```bash
leaf install viewi
```

Or with composer:

```bash
composer require leafs/viewi
```

## Introduction

::: tip How does Viewi work?
Viewi takes your components with templates and converts them into special HTML tokens and JavaScript code. This way you don't need to duplicate your logic twice. And it keeps to be SEO friendly and fully dynamic out of the box.

Viewi is not bound to specific framework and has its own template engine which is so simple to use. It also has built in Router and renders new pages without interaction with the server.
:::

After installing the Viewi module, you need to initialize viewi and let both Viewi and Leaf know about each other's prescence. Your approach changes based on whether you're using functional mode or class mode.

<div class="functional-mode">

```php{5}
<?php

require __DIR__ . "/vendor/autoload.php";

viewi()->init();

app()->get('/route', function () {
  echo 'This is a leaf route';
});

app()->run();
```

</div>
<div class="class-mode">

```php{7-9}
<?php

require __DIR__ . "/vendor/autoload.php";

$app = new Leaf\App();

$viewi = new Leaf\Viewi\Engine();
$viewi->setLeafInstance($app);
$viewi->init();

$app->get('/route', function () {
  echo 'This is a leaf route';
});

$app->run();
```

</div>

## Your first Viewi component

After setting up the viewi module, all you need to do is to add your Viewi components and register them to routes. So all we need to do is create the folders described in the [Viewi docs installation](https://viewi.net/docs/installation#manual).

Create the following folders:

- `viewi-app/`
- `viewi-app/build` for compiled server-side components
- `viewi-app/Components` for your front-end application (templates, services, models)

::: tip Autoloading your components
One neat trick to help you avoid manually importing your Viewi components is to set them up with composer's autoloader. We can do this by heading over to our `composer.json` file and adding the `viewi-app/Components` folder to our `composer.json` file.

```json
...
"autoload": {
  "psr-4": {
    "Components\\": "viewi-app/Components/"
  }
}
```

RUN THE `composer update` COMMAND TO UPDATE THE COMPOSER AUTOLOADER.
:::

With this, we can call our components on the `Components` namespace. In our little example, we'll be creating the counter example found on the Viewi docs. To start, we'll create our `viewi-app/Components/Views/Counter/Counter.php` file:

```php
<?php

namespace Components\Views\Counter;

use Viewi\BaseComponent;

class Counter extends BaseComponent
{
  public int $count = 0;

  public function increment()
  {
    $this->count++;
  }

  public function decrement()
  {
    $this->count--;
  }
}
```

Now all that is left is to create an HTML view for this component. We'll do this in a new `viewi-app/Components/Views/Counter/Counter.html` file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Viewi App</title>
</head>
<body>
  <button (click)="decrement()" class="mui-btn mui-btn--accent">-</button>
  <span class="mui--text-dark mui--text-title">$count</span>
  <button (click)="increment()" class="mui-btn mui-btn--accent">+</button>

  <ViewiScripts />
</body>
</html>
```

With this, our component has been created successfully. Now, we need to add a route and link this component to that route.

## Adding your Viewi routes

Adding viewi routes has been made simpler with the Viewi module. All you need to do is call whatever request method you need on the <span class="functional-mode">`viewi()` method</span><span class="class-mode">`$viewi` object</span>.

<div class="functional-mode">

```php
// get request
viewi()->get('/', Components\Views\Counter\Counter::class);

// post request
viewi()->post('/post', Components\Views\Counter\Counter::class);
```

Or:

```php
use Components\Views\Counter\Counter;

// get request
viewi()->get('/', Counter::class);

// post request
viewi()->post('/post', Counter::class);
```

</div>
<div class="class-mode">

```php
// get request
$viewi->get('/', Components\Views\Counter\Counter::class);

// post request
$viewi->post('/post', Components\Views\Counter\Counter::class);
```

Or:

```php
use Components\Views\Counter\Counter;

// get request
$viewi->get('/', Counter::class);

// post request
$viewi->post('/post', Counter::class);
```

</div>

## Putting it together

<div class="functional-mode">

```php
<?php

use Components\Views\Counter\Counter;

require __DIR__ . "/vendor/autoload.php";

viewi()->init();

viewi()->get('/', Counter::class);

app()->get('/route', function () {
  echo 'This is a leaf route';
});

app()->run();
```

</div>
<div class="class-mode">

```php
<?php

use Components\Views\Counter\Counter;

require __DIR__ . "/vendor/autoload.php";

$app = new Leaf\App();

$viewi = new Leaf\Viewi\Engine();
$viewi->setLeafInstance($app);
$viewi->init();

$viewi->get('/', Counter::class);

$app->get('/route', function () {
  echo 'This is a leaf route';
});

$app->run();
```

</div>

## Configuring Viewi

Viewi takes in a bunch of configuration options which can be found on [their documentation](https://viewi.net/docs/configuration). This allows you to customize the way Viewi behaves. Since we're using the Leaf Viewi module, your configuration will be passed through the `init` method we saw above.

<div class="functional-mode">

```php
<?php

use Viewi\PageEngine;
use Components\Views\Counter\Counter;

require __DIR__ . "/vendor/autoload.php";

viewi()->init([
  PageEngine::SOURCE_DIR => __DIR__ . '/Components',
  PageEngine::SERVER_BUILD_DIR => __DIR__ . '/build',
  PageEngine::PUBLIC_ROOT_DIR => __DIR__ . '/../public',
  PageEngine::PUBLIC_BUILD_DIR => '/viewi-build',
  PageEngine::DEV_MODE => true,
  PageEngine::RETURN_OUTPUT => true,
  PageEngine::COMBINE_JS => false,
  PageEngine::MINIFY => false
]);

viewi()->get('/', Counter::class);

app()->get('/route', function () {
  echo 'This is a leaf route';
});

app()->run();
```

</div>
<div class="class-mode">

```php
<?php

use Viewi\PageEngine;
use Components\Views\Counter\Counter;

require __DIR__ . "/vendor/autoload.php";

$app = new Leaf\App();

$viewi = new Leaf\Viewi\Engine();
$viewi->setLeafInstance($app);
$viewi->init([
  PageEngine::SOURCE_DIR => __DIR__ . '/Components',
  PageEngine::SERVER_BUILD_DIR => __DIR__ . '/build',
  PageEngine::PUBLIC_ROOT_DIR => __DIR__ . '/../public',
  PageEngine::PUBLIC_BUILD_DIR => '/viewi-build',
  PageEngine::DEV_MODE => true,
  PageEngine::RETURN_OUTPUT => true,
  PageEngine::COMBINE_JS => false,
  PageEngine::MINIFY => false
]);

$viewi->get('/', Counter::class);

$app->get('/route', function () {
  echo 'This is a leaf route';
});

$app->run();
```

</div>

One thing to note is that you can pick only the options you need and configure those. You don't need to pass in the entire Viewi configuration.

## Deployment

To make your application production ready you need to make these steps:

- Ensure that `PageEngine::DEV_MODE` is set to `false`
- Recommended (but not required) to set `PageEngine::MINIFY` to `true`
- Optionally you can set `PageEngine::COMBINE_JS` to `true`

Then you need to build your app:

<div class="functional-mode">

```php{8-12,17}
<?php

use Viewi\PageEngine;
use Components\Views\Counter\Counter;

require __DIR__ . "/vendor/autoload.php";

viewi()->init([
  PageEngine::DEV_MODE => false,
  PageEngine::MINIFY => true,
  PageEngine::COMBINE_JS => true
]);

viewi()->get('/', Counter::class);

// after your viewi routes
viewi()->compile();

app()->get('/route', function () {
  echo 'This is a leaf route';
});

app()->run();
```

</div>
<div class="class-mode">

```php{12-16,21}
<?php

use Viewi\PageEngine;
use Components\Views\Counter\Counter;

require __DIR__ . "/vendor/autoload.php";

$app = new Leaf\App();

$viewi = new Leaf\Viewi\Engine();
$viewi->setLeafInstance($app);
$viewi->init([
  PageEngine::DEV_MODE => false,
  PageEngine::MINIFY => true,
  PageEngine::COMBINE_JS => true
]);

$viewi->get('/', Counter::class);

// after your viewi routes
$viewi->compile();

$app->get('/route', function () {
  echo 'This is a leaf route';
});

$app->run();
```

</div>
