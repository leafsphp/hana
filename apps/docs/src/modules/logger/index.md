# Logger
<!-- markdownlint-disable no-inline-html -->

Leaf now provides very well defined logging support for your apps. A sample log looks like this:

```log
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

A Leaf provides a log object that writes data to a specific output. The actual writing of data is delegated to a log writer.

**You need to configure the log directory so that Leaf knows where to place your files.**

```php
<?php

$app = new Leaf\App([
    "log.dir" => __DIR__ . "/logs/",
]);
```

or

```php
<?php

Config::set("log.dir", __DIR__ . "/logs/");
```

## How to log data

To log data, get a reference to the log object:

```php
<?php
$log = $app->logger();
```

The log object provides the following PSR-3 interface

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

Each log object method accepts one mixed argument. The argument is usually a string, but the argument can be anything. The log object will pass the argument to its log writer. It is the log writer’s responsibility to write arbitrary input to the appropriate destination.
