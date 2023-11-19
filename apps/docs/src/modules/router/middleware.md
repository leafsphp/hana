# Middleware
<!-- markdownlint-disable no-inline-html -->

Middleware are just methods that run before your code runs, be it a particular route or your whole application. Unlike many other frameworks and systems, Leaf gives you the opportunity to set global middleware that run before any and every route.

## ⏳ Before Route Middlewares

Leaf's Core router supports Before Route Middlewares, which are executed before the route handling is processed.

Like route handling functions, you hook a handling function to a combination of one or more HTTP request methods and a specific route pattern.

```php
$app->before('GET|POST', '/admin/.*', function () {
    if (!isset($_SESSION['user'])) {
        header('location: /auth/login');
        exit();
    }
});
```

## Middleware route option

This is a new way to quickly setup middleware for a particular route. Leaf has the before method which allows you to set a route specific middleware, but that means defining the same route twice, not to mention, you may mistake the middleware for the main route as they have the same syntax. This problem is solved by the middleware option. **If your prefer using `before`, you can always do so.**

```php
// you can define it in a different file
$homeMiddleware = function () {
    echo "Home middleware";
};

$app->get("/home", ["middleware" => $homeMiddleware, function () {
    echo "User Home";
}]);
```

Unlike route handling functions, more than one before route middleware is executed when more than one route match is found.

## ✨ Before Router Middlewares

Before route middlewares are route specific. Using a general route pattern (viz. all URLs), they can become Before Router Middlewares (in other projects sometimes referred to as before app middlewares) which are always executed, no matter what the requested URL is.

```php
$app->before('GET', '/.*', function () {
    // ... this will always be executed
});
```

### Router Hooks

Hooks basically allow you to hook into Leaf router and execute a callback at a given time. For instance, you can execute a function just before Leaf fires off routes. You can also execute a callback before the main middleware executes or even after Leaf has completely executed a route.

There are 6 hooks that you can now use with Leaf router listed below in execution order:

#### `router.before`

This hook runs before Leaf router begins any operations, even before app middleware are triggered.

#### `router.before.route`

This hook runs just after the app middleware have run, just before the route specific middleware.

#### `router.before.dispatch`

This hook runs just before routes are dispatched.

#### `router.after.dispatch`

This hook runs just after routes are dispatched.

#### `router.after.route`

This hook runs after Leaf router has finished up with routing and cleaning up, just before the execution of internal code.

#### `router.after`

This hook runs when leaf completely finishes route execution and cleans up on the internal code as well. This is the last thing Leaf router does before exiting.

**Note** Unlike the above hooks, `router.after` can be directly assigned by passing a function into Leaf router's `run` method.

```php
$app = new Leaf\App;

$app->run(function () {
    echo "Final thing to run";
});
```

Also note that the final function may return a value for further use if need be.

```php
$time = Leaf\Router::run(function () {
    return Leaf\Date::now();
});

saveToLogs("app finished executing", $time);
```

To get started with hooks, simply use the `hook` method to define the hook you want to use.

**It doesn't matter the order in which you define hooks. Leaf router will run them in the correct order.**

```php
$app->hook("router.before", function () {
    Leaf\Http\Headers::resetStatus(202);
});
```

The example above makes sure that every response gets sent with a `202 Accepted` https status instead of the original status code. As you can see, `hook` takes in the hook you wish to set and a callable/callback to execute.

### App middleware

::: warning
If you are using leaf router outside of leaf, we suggest you use router hooks or before router middleware above.
:::

App middleware which are created using `Leaf\Middleware` have also received a lot of fixes which make them easier and faster to use.

::: danger NOTE
Router `add` has been renamed to `use`. This means that you will be using `use` to load your middleware instead.
:::

```php{14}
// usually in a different file
class Test extends Leaf\Middleware
{
    public function call()
    {
        echo "my test middleware";
        
        $this->next();
    }
}

$app = new Leaf\App;

$app->use(new Test);
```
