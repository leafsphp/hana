# Error Handling

By default Leaf has error screens which are displayed for application exceptions, 404s and production server errors, however, Leaf also gives you full control and allows you to customize what is shown when an error or exception is encountered.

## Handling 404

Leaf displays a 404 screen for users, however, it may not always be appropriate, especially when you're building an API. You will probably want to return JSON instead of markup. For cases like this, Leaf has prepared a `set404` method on the Leaf instance.

This method allows you to customize what a user sees when they visit a route that doesn't exist in your application. It takes in one parameter, a callable in the form of a function or an array.

The example below displays a custom 404 page.

```php
Router::set404(function () use($app) {
  response()->page("./pages/404.html");
});
```

## Application Down

Leaf router is also able to dynamically handle placing your application in maintenance mode using the `configure` method.

```php
Router::configure([
  "app.down" => true,
]);
```

Alternatively, you could also place your application in maintenance mode by setting the `APP_DOWN` environment variable to true. Since `.env` variables are given more priority than router config, the router config will be ignored as long as the env is set.

::: warning Note that
Leaf router expects you to manually load your `.env` file and will not be responsible for this. You can use [vlucas/phpdotenv](https://packagist.org/packages/vlucas/phpdotenv) to do this. After loading your `.env` variables into your app, leaf router will automatically pick them up.
:::

Along with this, we have prepared a simple method to display a custom maintenance error page: `setDown`.

```php
Router::setDown(function () {
  echo "Down for maintenance";
});
```
