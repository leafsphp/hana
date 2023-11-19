# Usage with Leaf MVC

Leaf MVC and Leaf API use a routing system based on the [Leaf Core](/docs/routing/) router. This means you can use all of Leaf Core's routing methods on your Leaf MVC and Leaf API apps. You can find the full docs [here](/docs/routing/).

## Adding Routes

Leaf MVC and Leaf API come with an `app/routes` folder. This folder contains all your route files. The `app/routes/index.php` file is the entry point for all your routes and is where you can add all your routes.

## Route Partials

New versions of Leaf MVC and Leaf API come with a new feature called route partials. Route partials allow you to split your routes into multiple files. This is useful if you have a lot of routes and you want to split them into multiple files. To use route partials, you can create a new file in your `app/routes` folder and add your routes to it.

All files in your `app/routes` folder that start with `_` are automatically loaded by Leaf MVC and Leaf API. This means that you can create a file called `app/routes/_auth.php` and add all your auth routes to it. This file will be automatically loaded by Leaf MVC and Leaf API, and all the routes in it will be available in your app.

If you don't want a file to be automatically loaded, create a file that doesn't start with `_`. For example, you can create a file called `app/routes/auth.php` and add all your auth routes to it. This file will **NOT** be automatically loaded by Leaf MVC and Leaf API, and you'll have to load it manually.

## Linking Controllers

Controllers provide a way to organize your application's logic. They are a great way to keep your routes file clean and easy to read. Controllers are just classes that implement the `App\Controllers\Controller` class. You can find more information about controllers in the [Controllers](/docs/mvc/controllers) document. This document will focus on how to link controllers to routes.

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

***This has already been setup for you in the root routes file of your MVC application.***

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
