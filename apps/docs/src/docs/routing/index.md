<!-- markdownlint-disable no-inline-html -->
# Basic Routing

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

::: tip
Leaf router is now separated from Leaf and is now available as an installable module via composer or the leaf cli.

<details>
<summary>Using Leaf router outside leaf</summary>

To use Leaf router outside of a leaf app, simply install the leaf router module:

```bash
composer require leafs/router
```

or

```bash
leaf install router
```

After this, you can use all of leaf router's functionality with the router class below.

## Router class

The router class is the interface you interact with to perform any routing actions in your app. Leaf core directly integrates with the router class, which means that there is no need to use this class directly, if however, you are using leaf router outside of leaf, you will need to use the router class itself.

```php
use Leaf\Router;

Router::get('/', 'PagesController@index');

Router::run();
```

</details>
:::

Leaf router uses a single root file, to which all the server requests are redirected, it then takes these requests and matches them to rules you have defined. The results are then displayed to the user. Then entire routing process is actually based on this simple concept.

To make things simpler, we tied leaf router directly to the leaf instance, so once you initialize leaf, you can use routing.

<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->json(['name' => 'Leaf']);
});

app()->run();
```

</div>
<div class="class-mode">

```php
<?php

require __DIR__ . "/vendor/autoload.php";

$app = new \Leaf\App();

$app->get('/', function () use($app) {
  $app->response()->json(['name' => 'Leaf']);
});

$app->run();
```

</div>

<!-- <VideoDocs
  subject="Watch the routing guide on youtube"
  description="Watch how to use the leaf router in your leaf applications."
  link="https://www.youtube.com/embed/BTcUgeOZLyM"
/> -->

## Using a different router in Leaf

Although Leaf integrates leaf router directly, you are free to import and use any router you want.

1. Install whatever you want

```bash
composer require imaginary/router
```

2. Import and use it in your project

<div class="functional-mode">

```php
// initialise imaginary router
$imr = new Imaginary\Router();

$imr->get('/', function () {
  // you can still use leaf modules
  response()->json(['title' => 'hello']);
});
```

</div>
<div class="class-mode">

```php
// initialise imaginary router
$imr = new Imaginary\Router();
$response = new Leaf\Http\Response();

$imr->get('/', function () use($response) {
  // you can still use leaf modules
  $response->json(['title' => 'hello']);
});
```

</div>

## Creating Routes

::: warning IMPORTANT
From this point onwards, we will assume that you are using Leaf router inside a leaf app, as such, we will use the app syntax:

<div class="functional-mode">

```php
app()->get('/', function () {...});
```

</div>
<div class="class-mode">

```php
$app->get('/', function () {...});
```

</div>

If however, you are using leaf router outside leaf, simply change `app()`/`$app` to the router class:

```php
Router::get('/', function () {...});
```

:::

You can define application routes using proxy methods on the Leaf\App instance. Leaf supports different types of requests, let's look at them.

### GET

You can add a route that handles only GET HTTP requests with the Leaf router's get() method. It accepts two arguments:

- The route pattern (with optional named placeholders or PCRE based patterns)
- The route callback

<div class="functional-mode">

```php
app()->get('/home', function () {
  // your code
});
```

</div>
<div class="class-mode">

```php
$app->get('/home', function () {
  // your code
});
```

</div>

### POST

You can add a route that handles only POST HTTP requests with the Leaf router's post() method. It accepts two arguments:

- The route pattern (with optional named placeholders or PCRE based patterns)
- The route callback

<div class="functional-mode">

```php
app()->post('/users/add', function () {
  $user = request()->get('user');
  // create a new user
});
```

</div>
<div class="class-mode">

```php
$app->post('/users/add', function () use($request) {
  $user = $request->get('user');
  // create a new user
});
```

</div>

Using Post Params
View [Request](/modules/http/v/2/request) for more info on handling params

### PUT requests

You can add a route that handles only PUT HTTP requests with the Leaf router’s put() method. It accepts two arguments:

- The route pattern (with optional named placeholders or PCRE based patterns)
- The route callback

<div class="functional-mode">

```php
app()->put('/book/edit/{id}', function ($id) {
  // your code
});
```

</div>
<div class="class-mode">

```php
$app->put('/book/edit/{id}', function ($id) {
  // your code
});
```

</div>

### DELETE requests

You can add a route that handles only DELETE HTTP requests with the Leaf router's delete() method. It accepts two arguments:

- The route pattern (with optional named placeholders or PCRE based patterns)
- The route callback

<div class="functional-mode">

```php
app()->delete('/quotes/{id}', function ($id) {
  // delete quote
});
```

</div>
<div class="class-mode">

```php
$app->delete('/quotes/{id}', function ($id) {
  // delete quote
});
```

</div>

### OPTIONS requests

You can add a route that handles only OPTIONS HTTP requests with the Leaf router's options() method. It accepts two arguments:

- The route pattern (with optional named placeholders or PCRE based patterns)
- The route callback

<div class="functional-mode">

```php
app()->options('/quotes/{id}', function ($id) {
  // return headers
});
```

</div>
<div class="class-mode">

```php
$app->options('/quotes/{id}', function ($id) {
  // return headers
});
```

</div>

### PATCH requests

You can add a route that handles only PATCH HTTP requests with the Leaf router's patch() method. It accepts two arguments:

- The route pattern (with optional named placeholders or PCRE based patterns)
- The route callback

<div class="functional-mode">

```php
app()->patch('/post/{id}', function ($id) {
  // your code
});
```

</div>
<div class="class-mode">

```php
$app->patch('/post/{id}', function ($id) {
  // your code
});
```

</div>

### ALL requests

You can add a route that handles all HTTP requests with the Leaf router's all() method. It accepts two arguments:

- The route pattern (with optional named placeholders or PCRE based patterns)
- The route callback

<div class="functional-mode">

```php
app()->all('/post/{id}', function ($id) {
  // your code
});
```

</div>
<div class="class-mode">

```php
$app->all('/post/{id}', function ($id) {
  // your code
});
```

</div>

### Resource Routes

This section assumes you've read [working with controllers](/docs/routing/controller). In an MVC application, controllers play a major role as they're the bridge between your view and your model.

A resource route simply creates all the routes needed to successfully handle a particular feature. This sounds a bit bleak, let's look at an example.

<div class="functional-mode">

```php
app()->resource('/posts', 'PostsController');

app()->run();
```

</div>
<div class="class-mode">

```php
$app->resource('/posts', 'PostsController');

$app->run();
```

</div>

The code above is equivalent to this:

<div class="functional-mode">

```php
app()->match('GET|HEAD', '/posts', "$controller@index");
app()->post('/posts', "$controller@store");
app()->match('GET|HEAD', '/posts/create', "$controller@create");
app()->match('POST|DELETE', '/posts/{id}/delete', "$controller@destroy");
app()->match('POST|PUT|PATCH', '/posts/{id}/edit', "$controller@update");
app()->match('GET|HEAD', '/posts/{id}/edit', "$controller@edit");
app()->match('GET|HEAD', '/posts/{id}', "$controller@show");

app()->run();
```

</div>
<div class="class-mode">

```php
$app->match('GET|HEAD', '/posts', "$controller@index");
$app->post('/posts', "$controller@store");
$app->match('GET|HEAD', '/posts/create', "$controller@create");
$app->match('POST|DELETE', '/posts/{id}/delete', "$controller@destroy");
$app->match('POST|PUT|PATCH', '/posts/{id}/edit', "$controller@update");
$app->match('GET|HEAD', '/posts/{id}/edit', "$controller@edit");
$app->match('GET|HEAD', '/posts/{id}', "$controller@show");

$app->run();
```

</div>

Resource routes are handled by a [resource controller](/docs/routing/controller?id=resource-controller).

## Route "Hooking"

You can add a route that handles a couple of HTTP methods with the Leaf router's match() method. It accepts three arguments:

- The HTTP method(s) seperated by `|`
- The route pattern (with optional named placeholders or PCRE based patterns)
- The route callback

<div class="functional-mode">

```php
app()->match('GET|POST', '/people', function () {
  // your code
});
```

</div>
<div class="class-mode">

```php
$app->match('GET|POST', '/people', function () {
  // your code
});
```

</div>

## Running your routes

After setting all the routes, you'll need to dispatch the routes. This is achieved through Leaf's run() method.

<div class="functional-mode">

```php
app()->run();
```

</div>
<div class="class-mode">

```php
$app->run();
```

</div>

## Route options

Route options simply allow you to configure the way groups and individual routes by passing in additional parameters. In actual sense, all new features were generated as a result of this single feature. Let's see how it works.

Leaf route handlers are usually callable functions like this:

<div class="functional-mode">

```php
app()->get("/home", function () {
  echo 'User Home';
});
```

</div>
<div class="class-mode">

```php
$app->get("/home", function () {
  echo 'User Home';
});
```

</div>

Or sometimes controllers, like this:

<div class="functional-mode">

```php
app()->get('/home', 'HomeController@index');
```

</div>
<div class="class-mode">

```php
$app->get('/home', 'HomeController@index');
```

</div>

This means there was no space to chain additional items to the route, this is solved by route options.

<div class="functional-mode">

```php
app()->get('/home', ['name' => 'home', function () {
  echo 'User Home';
}]);
```

</div>
<div class="class-mode">

```php
$app->get('/home', ['name' => 'home', function () {
  echo 'User Home';
}]);
```

</div>

When an array is passed into a leaf route as the handler, leaf will take all `key => value` as options for that route, the first non key-value `function` or `controller` in the array is taken as the handler.

<div class="functional-mode">

```php
app()->get('/form', ['name' => 'userForm', 'FormsController@index']);
```

</div>
<div class="class-mode">

```php
$app->get('/form', ['name' => 'userForm', 'FormsController@index']);
```

</div>

As mentioned before, this feature is also available on groups:

<div class="functional-mode">

```php
app()->group('/user', ['namespace' => '\\', function () {
    // ...
}]);
```

</div>
<div class="class-mode">

```php
$app->group('/user', ['namespace' => '\\', function () {
    // ...
}]);
```

</div>

**This doesn't mean that you should always pass in an array, if you don't need the other options, you can pass in your function or controller directly as you've always done.**

## Naming your routes

You can give names to your routes which allows you to use your route names for navigation instead of your route paths. This feature is heavily inspired by vue-router.

<div class="functional-mode">

```php
app()->get('/home', ['name' => 'home', function () {
  echo 'User Home';
}]);
```

</div>
<div class="class-mode">

```php
$app->get('/home', ['name' => 'home', function () {
  echo 'User Home';
}]);
```

</div>

### Getting a route by its name

You can also get the route path by its name.

<div class="functional-mode">

```php
app()->route('home'); // Would return: /home
```

</div>
<div class="class-mode">

```php
$app->route('home'); // Would return: /home
```

</div>

Also, if you have routes with named parameters, you can do as follows:

Route 1:

<div class="functional-mode">

```php
app()->get('/movies/{movieId}', ['name' => 'movies', function () {
  echo 'User Movies';
}]);

app()->route('movies', 'my-movie') // Would return: /movies/my-movie
```

</div>
<div class="class-mode">

```php
$app->get('/movies/{movieId}', ['name' => 'movies', function () {
  echo 'User Movies';
}]);

$app->route('movies', 'my-movie') // Would return: /movies/my-movie
```

</div>

Route 2:

<div class="functional-mode">

```php
app()->get('/movies/{movieId}/photos/{photoId}', ['name' => 'moviesAndPhotos', function () {
  echo 'User Movies and Photos';
}]);

app()->route('moviesAndPhotos', ['movieId' => 'my-movie', 'photoId' => 'my-photo']);

// Would return: /movies/my-movie/photos/my-photo
```

</div>
<div class="class-mode">

```php
$app->get('/movies/{movieId}/photos/{photoId}', ['name' => 'moviesAndPhotos', function () {
  echo 'User Movies and Photos';
}]);

$app->route('moviesAndPhotos', ['movieId' => 'my-movie', 'photoId' => 'my-photo']);

// Would return: /movies/my-movie/photos/my-photo
```

</div>

### Pushing to a route

This is simply redirecting to a route and can be done using `push`. `push` also allows you to reference the route by it's name instead of it's path.

<div class="functional-mode">

```php
app()->push('/home');
```

</div>
<div class="class-mode">

```php
$app->push('/home');
```

</div>

When an array is passed into push, Leaf will search for a route name matching the string in the array and redirect to that route:

<div class="functional-mode">

```php
// home was defined above
app()->push(['home']);
```

</div>
<div class="class-mode">

```php
// home was defined above
$app->push(['home']);
```

</div>

## Getting the current route

There are times when you need to get information about the current route from within one of your route handlers, views or controllers. For example, you may wish to generate a URL for the current route or redirect to the current route. You may also need to access the route's parameters. You may do all of this using the `Router::getRoute()` method:

<div class="functional-mode">

```php
app()->get('/home', ['name' => 'home', function () {
  $route = app()->getRoute();
  echo $route['name'];
}]);
```

</div>
<div class="class-mode">

```php
$app->get('/home', ['name' => 'home', function () use ($app) {
  $route = $app->getRoute();
  echo $route['name'];
}]);
```

</div>

The output of `getRoute()` looks something like this:

```json
{
  "pattern": "/users/(.*?)",
  "path": "/users/1",
  "method": "GET",
  "name": "mycontroller",
  "handler": "MyNamespace\\Controller@index",
  "params": [
    "1"
  ]
}
```

- `pattern` is the route pattern
- `path` is the current route path
- `method` is the current route method
- `name` is the current route name
- `handler` is the current route handler (custom function or controller)
- `params` is an array of the current route's parameters (dynamic values)
