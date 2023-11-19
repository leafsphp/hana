# Routing

<!-- markdownlint-disable no-inline-html -->

Leaf MVC, Leaf API and Skeleton all rely on Leaf's powerful routing engine. The only difference is that routing the MVC way makes use of controllers instead of callable functions. Everything else works the same way. This document will cover the basics of Leaf MVC routing.

::: tip Leaf Routing
If you're not familiar with Leaf's routing, you should read the [Leaf Routing](/docs/routing/) document first.
:::

## The Routes Folder

Leaf MVC, Leaf API and Skeleton all have a `routes` folder in which all your application's routes are defined. The `routes` folder is located in the `app` directory in Leaf MVC and Leaf API but is located in the root directory in Skeleton. The `routes` folder contains a single file called `index.php` which is where all your application's routes are defined. This file is automatically loaded by Leaf when your application starts.

## Linking Controllers

Controllers provide a way to organize your application's logic. They are a great way to keep your routes file clean and easy to read. Controllers are just classes that implement the `App\Controllers\Controller` protocol. You can find more information about controllers in the [Controllers](/docs/mvc/controllers) document. This document will focus on how to link controllers to routes.

Leaf provides a simple interface for interacting with controllers and their methods from inside your routes. The idea is to run a method inside your controller whenever a route is matched. This is done by telling Leaf which controller to use and which method to run. Leaf will then create an instance of the controller and run the method.

### Example

Let's say you have a controller called `App\Controllers\HomeController` and you want to run the `index` method inside it whenever the `/` route is matched. You can do this by passing a string containing your controller name and method to your route. The string should be in the format `controllerName@methodName`.

<div class="class-mode">

```php
$app->get('/', '\App\Controllers\HomeController@index');
```

</div>
<div class="functional-mode">

```php
app()->get('/', '\App\Controllers\HomeController@index');
```

</div>

## Controller Namespaces

In case you're using an auto loader or using leaf in another framework and  you have your controllers in another directory, you can do sommething like this

<div class="functional-mode">

```php
app()->get('/(\d+)', '\App\Controllers\User@showProfile');
```

</div>
<div class="class-mode">

```php
$app->get('/(\d+)', '\App\Controllers\User@showProfile');
```

</div>

But this gets tedious if you have a lot of routes. So Leaf allows you to set a "general" namespace, you can set the default namespace to use on your router instance via `setNamespace()`

<div class="functional-mode">

```php
app()->setNamespace('\App\Controllers');

app()->get('/users/(\d+)', 'User@showProfile');
app()->get('/cars/(\d+)', 'Car@showProfile');
```

</div>
<div class="class-mode">

```php
$app->setNamespace('\App\Controllers');

$app->get('/users/(\d+)', 'User@showProfile');
$app->get('/cars/(\d+)', 'Car@showProfile');
```

</div>

This has already been setup for you in the root routes file of your MVC application.

## Next Steps

Follow along with the next steps to learn more about Leaf MVC.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/docs/mvc/controllers">
    <h3 class="next-steps-link">Controllers</h3>
    <small class="next-steps-caption">Learn how to use controllers in your Leaf applications.</small>
  </a>
  <a class="vt-box" href="/docs/mvc/models">
    <h3 class="next-steps-link">Models</h3>
    <small class="next-steps-caption">Learn how to configure and use models in your Leaf apps.</small>
  </a>
  <a class="vt-box" href="/docs/mvc/migrations">
    <h3 class="next-steps-link">DB Migrations</h3>
    <small class="next-steps-caption">Learn how to use DB migrations in your Leaf applications.</small>
  </a>
</div>
