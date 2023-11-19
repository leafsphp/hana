# Installation

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

Leaf 3 is built by design to be incrementally adoptable. This means that it can be integrated into a project multiple ways depending on the requirements.

There are four primary ways of adding Leaf PHP to a project:

1. [Use the Leaf CLI to scaffold a project [RECOMMENDED]](#leaf-cli).
2. [Download leaf through composer](#composer)
3. [Scaffold a Leaf MVC or Leaf API project](#mvc-setup)

## Technical Requirements

Before creating your first Leaf application you must:

- Install PHP 7.4 or higher and these PHP extensions (which are installed and enabled by default in most PHP installations): json, zip;
- [Install Composer](https://getcomposer.org/download/), which is used to install PHP packages.
- Optionally, you can also install [Leaf CLI](/docs/cli/). This provides all the tools you need to create and manage your Leaf application locally. This is optional but highly recommended.

<details>
<summary>Not sure where to start?</summary>

- Laravel released an amazing tool called [Laravel Herd](https://herd.laravel.com/) that provides a quick and easy way to set up a local PHP development environment for Mac. It's a great way to get started with PHP and Leaf.

- On Windows and Mac, you can use [Xampp](https://www.apachefriends.org/), which is a free and open-source cross-platform web server solution stack package developed by Apache Friends, consisting mainly of the Apache HTTP Server, MariaDB database, and interpreters for scripts written in the PHP and Perl programming languages.

</details>

## Leaf CLI

<VideoDocs
  subject="Watch the leaf 3 installation walkthrough"
  description="You can take a look at our leaf cli setup walkthrough on youtube."
  link="https://www.youtube.com/embed/PuOk5xqTIsA"
/>

Leaf provides an [official CLI](https://github.com/leafsphp/cli) for quickly creating and managing your Leaf applications. It takes just a few seconds to get up and running with your leaf app. See [the Leaf CLI docs](/docs/cli/) for more details.

Using the CLI, you can quickly scaffold a new Leaf 3 project with:

```bash
leaf create <project-name>
```

Besides the core of the framework, Leaf also ships with a ton of installable functionality. We call these independent libraries modules. You can install modules using the `install` command:

```bash
leaf install <module-name>
```

The CLI also allows you to completely customize the installation you wish to create. You can choose different features like database, authentication, etc. This is done using the `--custom` flag:

```bash
leaf create <project-name> --custom
```

You can then run your app using the `serve` command:

```bash
leaf serve
```

## Composer

<!-- <VideoDocs
  subject="Watch the composer setup on youtube"
  description="Learn how to set up a leaf app with composer."
  link="https://www.youtube.com/watch?v=t-pNURSTOKw"
/> -->

Leaf also allows a more traditional approach to installation. You can install leaf through composer. You can use this method if you don't want to use the leaf cli or if you want to use leaf as a dependency in your project. The disadvantage of this method is that you don't get a quick-start setup like you do with the leaf cli.

```bash
composer require leafs/leaf
```

After insalling Leaf, you need to create your index.php file which will be the entry point to your application.

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/', function () use($app) {
  $app->response()->json(['message' => 'Hello World!']);
});

$app->run();
```

</div>

<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->json(['message' => 'Hello World!']);
});

app()->run();
```

</div>

When hosting your application on a webserver, all requests coming into your app must be routed through Leaf. It is really simple to do, and all needed instructions can be found @ [URL rewriting](/docs/introduction/url-rewriting.html).

## MVC Setup

Although Leaf allows you to select exactly what you want to install, some applications go beyond the basic setup. Leaf MVC is a full but ridiculously light-weight MVC framework that allows you to build complex applications with Leaf. It comes with a lot of features like authentication, database, http related functionality and a powerful CLI. To get started with Leaf's MVC setup, you can check out the [MVC docs](/docs/mvc/).

## Hello world example

Below is a "hello world" example which takes you through the core of Leaf. Other parts of the docs cover deeper examples. You can also refer to our [codelab experiments](/codelabs/) for real world examples and use-cases.

A base Leaf app that outputs hello world in your browser looks like this:

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/', function () {
  echo 'Hello world';
});

$app->run();
```

</div>

<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  echo 'Hello world';
});

app()->run();
```

</div>

You might have noticed that we used `echo` to output our data. Using `echo` is not a bad thing, but it can be confusing when you're trying to output data of a different type. For example, if we wanted to output JSON data, we would have to use `echo json_encode($data)`. This can be confusing because we're not sure if the content type is set to JSON or not.

To simplify this, Leaf comes with a `Response` object that automatically handles content the right way for us. Let's look at an example below.

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/', function () use($app) {
  $app->response()->markup('Hello world');
});

$app->run();
```

</div>
<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->markup('Hello world');
});

app()->run();
```

</div>
