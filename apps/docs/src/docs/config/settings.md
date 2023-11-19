# App Settings

<!-- markdownlint-disable no-inline-html -->

Leaf has lots of configurations which can be used to determine the way Leaf behaves in your application. You can check the [config page](/docs/config/) for more information on how to set and get configs. This page will show you all the configs available in Leaf. Note that we will only cover the user-facing configs, configs that are used internally by Leaf will not be covered here.

## app.down

This configuration tells Leaf whether to place your app in a maintenance like state. By default, this is set to `false`, but you can set it to `true` to place your app in a maintenance like state.

```php
'app.down' => true
```

When your app is in a maintenance like state, Leaf will automatically load the `down` screen. You can customize this screen using Leaf's `setDown` method.

```php
$app->setDown(function () {
  echo 'Custom Down Handler!';
});
```

**You can read more about the down screen [here](/docs/routing/errors#application-down).**

## debug

By default, Leaf will display all errors and warnings you encounter while developing your app. However, when you're ready to deploy your app, you should turn off debugging to prevent users from seeing errors. You can do this by setting the `debug` config to `false`.

```php
'debug' => false
```

Note that when you set `debug` to `false`, Leaf will automatically turn off error reporting and display a custom error page to users. You can customize this page using Leaf's `setError` method.

```php
$app->setError(function () {
  echo "Custom Error Handler!";
});
```

## Logging

Leaf has a built-in logger that can be used to log errors and other messages. You can check the [logging page](/docs/tooling/logging) for more information on how to use Leaf's logger. This page will show you all the configs available for Leaf's logger.

To get started, make sure you have the [logger module](/docs/tooling/logging) installed. Once installed, you should have access to a `logger()` method on the Leaf instance. You can use this method to access Leaf's logger if you want to manually log messages.

```php
$app->logger()->info('Hello World!');
```

Below are all the configs available for Leaf's logger:

### log.enabled

This enables or disables Leaf’s logger. You need to set this to `true` to enable logging.

```php
'log.enabled' => true
```

Note that if `log.enabled` is set to `false`. Leaf will skip initializing anything related to logs, as such, you won't have access to `$app->logger()`, `$app->log` or `$app->logWriter`.

### log.dir

This tells leaf which directory to save and look for logs.

```php
'log.dir' => __DIR__ . '/logs/'
```

### log.file

This setting tells leaf which file to write logs to.

```php
'log.file' => 'crashes.log'
```

*By default, Leaf will write logs to a file named `log.txt`.*

### log.level

Leaf has these log levels:

- \Leaf\Log::EMERGENCY
- \Leaf\Log::ALERT
- \Leaf\Log::CRITICAL
- \Leaf\Log::ERROR
- \Leaf\Log::WARN
- \Leaf\Log::NOTICE
- \Leaf\Log::INFO
- \Leaf\Log::DEBUG

The `log.level` application setting determines which logged messages will be honored and which will be ignored. For example, if the `log.level` setting is `\Leaf\Log::INFO`, debug messages will be ignored while info, warn, error, and fatal messages will be logged.

### log.open

This option takes in a boolean and determines whether Leaf should create the specified log file if it doesn't exist.

### log.writer

Use a custom log writer to direct logged messages to the appropriate output destination. By default, Leaf’s logger will write logged messages to `STDERR`. If you use a custom log writer, it must implement this interface:

```php
public write(mixed $message, int $level);
```

The `write()` method is responsible for sending the logged message (not necessarily a string) to the appropriate output destination (e.g. a text file, a database, or a remote web service). The `$level` argument is one of the log levels listed above.

```php
'log.writer' => new \My\LogWriter()
```

## views.path

The relative or absolute path to the filesystem directory that contains your Leaf application’s view files.

```php
'views.path' => './views'
```

## views.cachePath

When using a view engine, this config tells Leaf where to store cached views.

```php
'views.cachePath' => './views/cache'
```
