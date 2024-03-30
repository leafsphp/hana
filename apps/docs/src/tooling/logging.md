<!-- markdownlint-disable no-inline-html -->
# Logging

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

<!-- <VideoDocs
  subject="Watch the logging guide on youtube"
  description="Learn how to set up logging in your leaf apps."
  link="https://www.youtube.com/embed/BTcUgeOZLyM"
/> -->

Leaf now provides very well defined logging support for your apps. A sample log looks like this:

```log{4-5}
[2021-03-31 22:44:53]
ERROR - ErrorException: Trying to access array offset on value of type int in /home/mychi/Projects/leafphp/leaf/src/Experimental/Cache.php:83
Stack trace:
#0 /home/mychi/Projects/leafphp/leaf/src/Experimental/Cache.php(83): Leaf\Exception\General::handleErrors()
#1 /home/mychi/Projects/leafphp/leaf/test/index.php(45): Leaf\Experimental\Cache::get()
#2 [internal function]: {closure}()
#3 /home/mychi/Projects/leafphp/leaf/src/Router.php(337): call_user_func_array()
#4 /home/mychi/Projects/leafphp/leaf/src/Router.php(392): Leaf\Router::invoke()
#5 /home/mychi/Projects/leafphp/leaf/src/Router.php(443): Leaf\Router::handle()
#6 /home/mychi/Projects/leafphp/leaf/src/App.php(863): Leaf\Router::run()
#7 /home/mychi/Projects/leafphp/leaf/test/index.php(52): Leaf\App->run()
#8 {main}
```

The first lines usually contain the most important information, however, it may be different depending on the structure of your application.

Leaf logger provides a log object that writes data to a specific output. The actual writing of data is delegated to a log writer.

## Getting started

To get started with logging, you need to first install the Leaf logger module. This will allow leaf log all errors and exception if the config is enabled. You can do this with leaf CLI:

```bash
leaf install logger
```

Or with composer:

```bash
composer require leafs/logger
```

::: tip Quick Tip
Logger is already integrated with Leaf core on a base level and so there's no need to initialize it. You might never even need to use the logger module yourself.
:::

## Setup

::: warning NOTE
Unlike other modules, logger uses global configuration from leaf instead of some local config. You can do this setup on Leaf init or with the config class.

```php
$app = new Leaf\App([
  "log.dir" => __DIR__ . "/logs/",
]);
```

:::

Once installed, the next thing to do is to tell leaf to log all exceptions/errors. You can do this simply by enabling the `log.enabled` configuration option.

```php
Leaf\Config::set('log.enabled', true);
```

You can also tell leaf which directory to save logs into:

```php
Leaf\Config::set("log.dir", __DIR__ . "/logs/");
```

You can also specify the name of the file to save the log to:

```php
Leaf\Config::set("log.file", getDateToday() . "_crash_logs.log");
```

This line above will create a new log file for every day there's a log.

> `getDateToday` is a custom function that returns the date for a specific day.

Putting it all together, we'll have something like this:

<div class="class-mode">

```php
$app = new Leaf\App([
  'log.enabled' => true,
  'log.dir' => __DIR__ . '/logs/',
  'log.file' => getDateToday() . '_crash_logs.log',
]);

$app->get('/', function () {
  echo 'something';
});

$app->run();
```

</div>
<div class="functional-mode">

```php
Leaf\Config::set([
  'log.enabled' => true,
  'log.dir' => __DIR__ . '/logs/',
  'log.file' => getDateToday() . '_crash_logs.log',
]);

app()->get('/', function () {
  echo 'something';
});

app()->run();
```

</div>

## How to log data

As mentioned before, you might never need to use the logger manually, however, if you want to manually log some data, you can do it on the logger method found on the leaf instance. This is automatically created by leaf when the logger module is installed.

<div class="class-mode">

```php
$log = $app->logger();
```

</div>
<div class="functional-mode">

```php
$log = app()->logger();
```

</div>

The log object provides the following PSR-3 interface

<div class="class-mode">

```php
$app->logger()->debug(mixed $object);
$app->logger()->info(mixed $object);
$app->logger()->notice(mixed $object);
$app->logger()->warning(mixed $object);
$app->logger()->error(mixed $object);
$app->logger()->critical(mixed $object);
$app->logger()->alert(mixed $object);
$app->logger()->emergency(mixed $object);
```

</div>
<div class="functional-mode">

```php
app()->logger()->debug(mixed $object);
app()->logger()->info(mixed $object);
app()->logger()->notice(mixed $object);
app()->logger()->warning(mixed $object);
app()->logger()->error(mixed $object);
app()->logger()->critical(mixed $object);
app()->logger()->alert(mixed $object);
app()->logger()->emergency(mixed $object);
```

</div>

Each log object method accepts one mixed argument. The argument is usually a string, but the argument can be anything. The log object will pass the argument to its log writer. It is the log writer’s responsibility to write arbitrary input to the appropriate destination.
