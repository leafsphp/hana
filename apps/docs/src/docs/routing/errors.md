# Error Handling

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

<!-- <VideoDocs
  subject="Watch the error handling guide on youtube"
  description="Learn how to handle errors in your leaf app, during and after development."
  link="https://www.youtube.com/embed/BTcUgeOZLyM"
/> -->

By default Leaf has error screens which are displayed for application exceptions, 404s and production server errors, however, Leaf also gives you full control and allows you to customize what is shown when an error or exception is encountered.

## Handling 404

Leaf displays a 404 screen for users, however, it may not always be appropriate, especially when you're building an API. You will probably want to return JSON instead of markup. For cases like this, Leaf has prepared a `set404` method on the Leaf instance.

This method allows you to customize what a user sees when they visit a route that doesn't exist in your application. It takes in one parameter, a callable in the form of a function or an array.

The example below displays a custom 404 page.

<div class="functional-mode">

```php
app()->set404(function () {
  response()->page('./pages/404.html');
});
```

</div>
<div class="class-mode">

```php
$app->set404(function () use($app) {
  $app->response()->page('./pages/404.html');
});
```

</div>

## Handling 500

Server errors are a bit more complicated because there are 2 states displayed to the user. The first is a general error state used in development. That screen gives you details on errors that occur during development. If you've ever run into an error during development, you've probably come across a nice looking page that gives you information about your error, line numbers and all that.

The second screen is shown when debugging is turned off. This screen is intended to not give any details on the error, but rather log out issues in the background. To get a preview of this screen locally, you can configure Leaf's `debug` to `false`.

<div class="functional-mode">

```php
app()->config('debug', false);
```

</div>
<div class="class-mode">

```php
$app = new \Leaf\App('debug', false);
```

</div>

You'll have an error page which doesn't give details on the error, however, if logs are enabled, all the errors are saved to a log file in the background.

### Setting your own error screen

Although Leaf handles both debug and production cases, you may want to display your own error/exception screens instead of going with the Leaf defaults. For cases like this, you should use the `setErrorHandler` method on the Leaf instance.

This method takes in a callable in the form of a function or an array. You can take a look at the exaples below:

<div class="class-mode">

```php
// use an error handler from a package
$app->setErrorHandler(['\Leaf\Exception\General', 'defaultError']);

// use a custom function
$app->setErrorHandler(function () use($app) {
  $app->response()->page('./pages/500.html');
});
```

</div>
<div class="functional-mode">

```php
// use an error handler from a package
app()->setErrorHandler(['\Leaf\Exception\General', 'defaultError']);

// use a custom function
app()->setErrorHandler(function () {
  response()->page('./pages/500.html');
});
```

</div>

## Application Down

Leaf is also able to dynamically handle placing your application in maintenance mode using leaf config. We have a `down` config which you can set to `true` to place your application in maintenance mode.

<div class="functional-mode">

```php
app()->config('app.down', true);
```

</div>
<div class="class-mode">

```php
$app->config('app.down', true);
```

</div>

Alternatively, you could also place your application in maintenance mode by setting the `APP_DOWN` environment variable to true. Since `.env` variables are given more priority than router config, the router config will be ignored as long as the env is set. If you decide to use the env variable, you will have to manually load your `.env` file. Check out the [env docs](/docs/config/nsm) for more info.

::: tip Loading your env
Your environment variables are automatically loaded into your application if you are using Leaf MVC, Leaf API or Skeleton.
:::

### Custom Down Handler

Leaf comes with a beautiful application down handler which you can use in production. However, it might not match your theme, or you might have a maintenance screen designed by someone which needs to match that design. Leaf gives you the flexibility to display a custom maintenance error page using the `setDown` method.

<div class="functional-mode">

```php
app()->setDown(function () {
  echo "Down for maintenance";
});
```

</div>
<div class="class-mode">

```php
$app->setDown(function () {
  echo "Down for maintenance";
});
```

</div>
