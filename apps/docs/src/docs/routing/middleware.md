<!-- markdownlint-disable no-inline-html -->
# Middleware

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

<!-- <VideoDocs
  subject="Watch the middleware guide on youtube"
  description="Leaf how to use middleware in your leaf apps."
  link="https://www.youtube.com/embed/BTcUgeOZLyM"
/> -->

## What is middleware?

In simple terms, middleware is a piece of code that runs before your application runs. It can be used to perform various tasks like authentication, error handling, logging, etc. It can also help to optimize the performance of an application by caching data, compressing responses, or distributing load across multiple servers, although those are more advanced use-cases. It's a great way to keep your code clean and organized.

::: tip Note
Leaf has modules that can be used to perform some of the tasks middleware can do. For example, Leaf has [Leaf Auth](/modules/auth/v/2.1/) which can be used to handle authentication, a [logger module](/docs/tooling/logging) and many more useful [modules](/modules/). This means you don't need to use middleware to perform these tasks. However, middleware can be used to perform tasks that Leaf modules don't cover.
:::

## How does middleware work?

Middleware is a concept that is used in many frameworks, and they have different ways of implementing it. Leaf's implementation is based on the concept of middleware stacks. A middleware stack is a list of middleware that are executed in a specific order. The order is important because each middleware can perform a task and pass the request to the next middleware in the stack. This is how middleware works in Leaf.

When a request is made to your application, Leaf will run through the middleware stack and execute each middleware. After the middleware stack is done, Leaf will then execute the route handling function. This is a rough overview of how middleware works in Leaf, however, for a more in-depth explanation, you can check out the video by [Codecourse](https://www.codecourse.com).

<VideoDocs
  title="How Middlware Works"
  subject="How Middlware Works"
  description="A low level overview of how middleware runs in your favourite framework. Starting with a simple app example, we'll build a middleware manager, add middleware to a stack, and run it."
  link="https://www.youtube.com/embed/Hqk9yUJfRKg"
/>

## Middleware in Leaf

Leaf provides 2 interfaces for middleware: application middleware and router hooks.

- Router hooks basically hook into the runtime of the Leaf router and allow you to run code before a route/multiple routes are invoked.
- Application middleware on the other hand is a more structured way to define and use middleware in your apps. It allows you to define middleware classes as done in other frameworks like Laravel. This fits right in if you intend to build MVC applications.

## Application middleware

As mentioned above, application middleware gives you a more structured way to define and use middleware in your apps. It allows you to define middleware as classes instead of using functions.

### Defining application middleware

Leaf provides a `Middleware` class that you can extend to define your application middleware. The `Middleware` class has a `call` method that you can override to define your middleware logic. In the `call` method, you can perform any task you want and then call `$this->next()` to pass the request to the next middleware in the stack or even return a response if you want to break the execution of your application. The example below checks if a request key is set, if it's not, the user is redirected to another route.

```php
class TestMiddleware extends Leaf\Middleware
{
    public function call()
    {
        if (!request()->get('key')) {
            return Custom::redirect('/login');
        }

        return $this->next();
    }
}
```

One thing to note is you should always call `$this->next()`. The `$this->next()` method forwards the incoming request to the next middleware or your application if there's no other middleware.

### Using your application middleware

After defining the middleware, the next step is to tell Leaf to actually run your middleware. You can do this by calling the `use` method on the Leaf instance.

<div class="class-mode">

```php
$app = new Leaf\App();

$app->use(new TestMiddleware);

// ... your routes here
```

</div>
<div class="functional-mode">

```php
app()->use(new TestMiddleware);

// ... your routes here
```

</div>

## Before Route Middlewares

This is a type of router hook that runs before a particular route is invoked. It is technically just a callable/function that holds whatever code you want to execute before the route is executed. To actually create and register the before route middleware, you need to pass the function into the `before` method of the Leaf instance.

The `before` method takes 3 arguments:

- The HTTP method: This can be a single method or a pipe-separated list of methods.
- The route pattern
- The middleware function

This example below shows how to create a before route middleware that checks if a user is logged in before allowing access to the admin dashboard. Note that we're using `/admin/.*` as the route pattern. This means that the middleware will be executed for all routes that start with `/admin/`.

<div class="class-mode">

```php
$app->before('GET|POST', '/admin/.*', function () {
  if (!isset($_SESSION['user'])) {
    header('location: /auth/login');
    exit();
  }
});
```

</div>
<div class="functional-mode">

```php
app()->before('GET|POST', '/admin/.*', function () {
  if (!isset($_SESSION['user'])) {
    header('location: /auth/login');
    exit();
  }
});
```

</div>

### Matching multiple middleware

Unlike route handling functions, more than one before route middleware is executed when more than one route match is found.

<div class="class-mode">

```php
$app->before('GET|POST', '/admin/.*', function () {
  if (!isset($_SESSION['user'])) {
    header('location: /auth/login');
    exit();
  }
});

$app->before('GET|POST', '/admin/.*', function () {
  if (!isset($_SESSION['user_secret'])) {
    header('location: /auth/login');
    exit();
  }
});
```

</div>
<div class="functional-mode">

```php
app()->before('GET|POST', '/admin/.*', function () {
  if (!isset($_SESSION['user'])) {
    header('location: /auth/login');
    exit();
  }
});

app()->before('GET|POST', '/admin/.*', function () {
  if (!isset($_SESSION['user_secret'])) {
    header('location: /auth/login');
    exit();
  }
});
```

</div>

Using this same concept, you can run your middleware on every route. We call this before router middleware.

## Before Router Middlewares

Before route middlewares are route specific. Using a general route pattern (viz. all URLs), they can become Before Router Middlewares (in other projects sometimes referred to as before app middlewares) which are always executed, no matter what the requested URL is.

<div class="class-mode">

```php
$app->before('GET', '/.*', function () {
  // ... this will always be executed
});
```

</div>
<div class="functional-mode">

```php
app()->before('GET', '/.*', function () {
  // ... this will always be executed
});
```

</div>

As you can see, the only difference between before route and before router middleware is the route pattern.

## Middleware route option

This is a new way to quickly setup middleware for a particular route. Leaf has the before method which allows you to set a route specific middleware, but that means defining the same route twice, not to mention, you may mistake the middleware for the main route as they have the same syntax. This problem is solved by the middleware option. **If your prefer using `before`, you can always do so.**

Let's take this function which we're using as our middleware:

```php
$midfn = function () {
  echo 'Home middleware';
};
```

We can use this middleware directly on our route like this:

<div class="class-mode">

```php
$app->get('/home', ['middleware' => $midfn, function () {
  echo 'User Home';
}]);
```

</div>
<div class="functional-mode">

```php
app()->get('/home', ['middleware' => $midfn, function () {
  echo 'User Home';
}]);
```

</div>

## Named Middleware Route Options <sup class="vt-badge">New</sup>

You can name your middleware and use it on multiple routes. This is useful when you have a lot of routes that use the same middleware. You can name your middleware like this:

<div class="class-mode">

```php
$app->registerMiddleware('home', function () {
  echo 'Home middleware';
});

$app->get('/home', ['middleware' => 'home', function () { ... }]);
$app->get('/home/about', ['middleware' => 'home', function () { ... }]);
```

</div>

<div class="functional-mode">

```php
app()->registerMiddleware('home', function () {
  echo 'Home middleware';
});

app()->get('/home', ['middleware' => 'home', function () { ... }]);
app()->get('/home/about', ['middleware' => 'home', function () { ... }]);
```

</div>

Named middleware can also be used with route groups:

<div class="class-mode">

```php
$app->registerMiddleware('home', function () {
  echo 'Home middleware';
});

$app->group('/group', ['middleware' => 'home', function () use ($app) {
  $app->get('/home', function () { ... });
  $app->get('/home/about', function () { ... });
}]);
```

</div>

<div class="functional-mode">

```php
app()->registerMiddleware('home', function () {
  echo 'Home middleware';
});

app()->group('/group', ['middleware' => 'home', function () {
  app()->get('/home', function () { ... });
  app()->get('/home/about', function () { ... });
}]);
```

</div>

## Router Hooks

Hooks basically allow you to hook into Leaf router and execute a callback at a given time. For instance, you can execute a function just before Leaf fires off routes. You can also execute a callback before the main middleware executes or even after Leaf has completely executed a route.

There are 6 hooks that you can now use with Leaf router listed below in execution order:

**It doesn't matter the order in which you define hooks. Leaf router will run them in the correct order.**

### `router.before`

This hook runs before Leaf router begins any operations, even before app middleware are triggered.

<div class="class-mode">

```php
$app->hook('router.before', function () {
  // do something
});
```

</div>
<div class="functional-mode">

```php
app()->hook('router.before', function () {
  // do something
});
```

</div>

### `router.before.route`

This hook runs just after the app middleware have run, just before the route specific middleware.

<div class="class-mode">

```php
$app->hook('router.before.route', function () {
  // do something
});
```

</div>
<div class="functional-mode">

```php
app()->hook('router.before.route', function () {
  // do something
});
```

</div>

### `router.before.dispatch`

This hook runs just before routes are dispatched.

<div class="class-mode">

```php
$app->hook('router.before.dispatch', function () {
  // do something
});
```

</div>
<div class="functional-mode">

```php
app()->hook('router.before.dispatch', function () {
  // do something
});
```

</div>

### `router.after.dispatch`

This hook runs just after routes are dispatched.

<div class="class-mode">

```php
$app->hook('router.after.dispatch', function () {
  // do something
});
```

</div>
<div class="functional-mode">

```php
app()->hook('router.after.dispatch', function () {
  // do something
});
```

</div>

### `router.after.route`

This hook runs after Leaf router has finished up with routing and cleaning up, just before the execution of internal code.

<div class="class-mode">

```php
$app->hook('router.after.route', function () {
  // do something
});
```

</div>
<div class="functional-mode">

```php
app()->hook('router.after.route', function () {
  // do something
});
```

</div>

### `router.after`

This hook runs when leaf completely finishes route execution and cleans up on the internal code as well. This is the last thing Leaf router does before exiting.

<div class="class-mode">

```php
$app->hook('router.after', function () {
  // do something
});
```

</div>
<div class="functional-mode">

```php
app()->hook('router.after', function () {
  // do something
});
```

</div>

::: tip Note
Unlike the above hooks, `router.after` can be directly assigned by passing a function into Leaf router's `run` method.

<div class="class-mode">

```php
$app = new Leaf\App;

// define routes

$app->run(function () {
  echo "Final thing to run";
});
```

</div>
<div class="functional-mode">

```php
// define routes

app()->run(function () {
  echo "Final thing to run";
});
```

</div>

Also note that the final function may return a value for further use if need be.

<div class="class-mode">

```php
$time = $app->run(function () {
  return Leaf\Date::now();
});

saveToLogs("app finished executing", $time);
```

</div>
<div class="functional-mode">

```php
$time = app()->run(function () {
  return Leaf\Date::now();
});

saveToLogs("app finished executing", $time);
```

</div>

:::
