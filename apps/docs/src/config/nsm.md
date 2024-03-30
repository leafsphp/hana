# Application Environment

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

When building an application, it is helpful to distinguish between what is "running locally" versus what is "running in production". For example, you may have a different database running locally than you do on your production server.

To make this a breeze, Leaf provides robust support for environment based configuration, allowing you to conveniently handle configuration values for different environments.

## Environment variables

In a sense of your applications, environment variables are dynamic values that affect the way your applications behave. They are part of the environment in which a process runs. For example, your app can use the value of the TEMP environment variable to discover a suitable location to store temporary files. Environment variables are easy to change between environments, such as development, staging, and production.

<VideoDocs
  title="New to environment variables?"
  subject="Watch this video by Beachcasts"
  description="Adam Culp of Beachcasts php programming videos shares how to use phpdotenv to store environment variables with PHP, and then how to retrieve them from $_ENV for usage in a PHP app."
  link="https://www.youtube.com/embed/oTrJfgUF1SI"
/>

## Loading env variables

Leaf doesn't come with an env loader out of the box, but you can add one yourself. Env loaders allow you to load environment variables from a `.env` file into PHP's `$_ENV` and `$_SERVER` globals. You can then access these variables using the `_env()` helper function that Leaf provides. Here's a list of some of the most popular env loaders:

- [vlucas/phpdotenv](https://github.com/vlucas/phpdotenv)
- [symfony/dotenv](https://github.com/symfony/dotenv)

## Using env variables

After loading your env variables, you can access them using the `_env()` helper function. The `_env()` function takes in a key and a default value. If the key is found, the value is returned, otherwise the default value is returned.

```php
$serverEnvironment = _env('APP_ENV', 'development');
```

## Application Modes

Using the concept of environments like `development`, `testing`, and `production` is a common way to prepare an application to behave correctly in each environment. Leaf takes this concept one step further and introduces the concept of application modes. Application modes allow you to configure your application for a specific purpose.

For example, you may want to enable debugging in “development” mode but not in “production” mode. The examples below demonstrate how to configure Leaf differently for a given mode.

### Setting your application mode

Leaf will automatically set the application mode based on the value of the `APP_ENV` environment variable. If the `APP_ENV` environment variable is not set, Leaf will set the application mode to `development`. This is because Leaf assumes you are developing your application locally when no environment is set.

You can also set the application mode manually using the `mode` setting in your application settings.

<div class="class-mode">

```php
$app->config([
  'mode' => 'production'
]);
```

</div>
<div class="functional-mode">

```php
app()->config([
  'mode' => 'production'
]);
```

</div>

### Using your application mode

The Leaf instance provides a `script()` method that allows you to register a callable that will be invoked when the application mode matches the given mode. The `script()` method accepts two arguments: the mode and a callable.

<div class="class-mode">

```php
$app->script('production', function () use ($app) {
  $app->config([
    'log.enable' => true,
    'debug' => false
  ]);
});
```

</div>
<div class="functional-mode">

```php
app()->script('production', function () {
  app()->config([
    'log.enable' => true,
    'debug' => false
  ]);
});
```

</div>

The above example will enable logging and disable debugging when the application mode is set to `production`.
