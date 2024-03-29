---
aside: none
---

# Migrating from other frameworks

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

This page is for developers who have a working application in another framework and want to port over to Leaf. As far-fetched as this sounds, Leaf 3 makes it super easy to sprinkle pieces of Leaf into any existing application, gradually rewriting it without breaking any code. Leaf has always allowed users to integrate other libraries seamlessly into their leaf apps with no conflicts or complexities, now Leaf 3 allows you to go the other way: **integrating Leaf seamlessly into any application no matter which libraries or frameworks it was built with.**

<!-- <VideoDocs
  subject="Watch the migration guide on youtube"
  description="Follow along as we migrate a Slim PHP application to use Leaf 3 and modules."
  link="https://www.youtube.com/embed/BTcUgeOZLyM"
/> -->

## Quickstart

All of Leaf's features are now available as modules, this means that if there's a particular feature of Leaf you will love to try out, there's no need to pack the whole framework anymore. Just find that feature you want and install it.

Below is a [Slim PHP 4](https://www.slimframework.com/) application which we want to use Leaf 3 in:

```php
<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

$app->get('/', function (Request $request, Response $response, $args) {
    $name = $args['name'];
    $response->getBody()->write("Hello, $name");
    return $response;
});

$app->run();
```

We can start off by swapping out the Slim request and response objects with Leaf's. We can achieve this by replacing only lines 11-13 with Leaf.

```php{2-3,11-13}
<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

$app->get('/', function (Request $request, Response $response, $args) {
    $name = $args['name'];
    $response->getBody()->write("Hello, $name");
    return $response;
});

$app->run();
```

All we have to do now is to install the leaf http module.

```bash
composer require leafs/http
```

Now, we replace Slim's http handlers with Leaf's.

<div class="class-mode">

```php{8,11-12}
<?php

use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();
$leaf = new Leaf\App();

$app->get('/', function () use($leaf) {
    $name = $leaf->request()->get('name');
    $leaf->response()->markup("Hello, $name");
});

$app->run();
```

</div>
<div class="functional-mode">

```php{9-10}
<?php
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

$app->get('/', function () {
    $name = request()->get('name');
    response()->markup("Hello, $name");
});

$app->run();
```

</div>

In all aspects, this is still a slim 4 app, only using the Leaf request and response objects. Just as with the example above, you can use any Leaf module  or Leaf 3 itself with any framework or library. To test the app above, we can use the built in php server

```bash
php -S localhost:5500
```
