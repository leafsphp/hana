# Http Server With Eien

In the previous section, we saw how to get started with Eien. By default Leaf handles creating an Http server with Eien. However, you may want to build your own Eien server instead of just going with what Leaf gives you out of the box. This section will show you how to do just that.

## Creating a Server

Before we get started with creating the server, we need to make a little tweak to our Leaf app. We would need to remove the line which runs our Leaf app. This is because we want to run our app from our own server.

<div class="class-mode">

```php
// remove this line
$app->run();
```

</div>
<div class="functional-mode">

```php
// remove this line
app()->run();
```

</div>

Now all that we need to do is use the Eien server class to craft a beautiful server for our Leaf app.

<div class="class-mode">

TO get started, you simply need to initialize the `Leaf\Eien\Server` class and pass in your Leaf app instance.

```php
$app = new Leaf\App();

// your leaf routes

$server = new Leaf\Eien\Server();
$sever->wrap($app);
```

</div>
<div class="functional-mode">

To get started, you simply need to call the `server` function and pass in your Leaf app instance.

```php
// your leaf routes
server()->wrap(app());
```

</div>

After wrapping your app, you can then start your server by calling the `listen` method. This will tell Eien to listen for traffic, forward your requests and return a response.

<div class="class-mode">

```php
$server->listen();
```

</div>
<div class="functional-mode">

```php
server()->listen();
```

</div>

Putting it all together, your `index.php` file should look like this:

<div class="class-mode">

```php
<?php

require __DIR__ . "/vendor/autoload.php";

$app = new Leaf\App();

$app->get('/', function () {
  return "Hello World";
});

$server = new Leaf\Eien\Server();
$server
  ->wrap($app);
  ->listen();
```

</div>
<div class="functional-mode">

```php
<?php

require __DIR__ . "/vendor/autoload.php";

app()->get('/', function () {
  return "Hello World";
});

server()
  ->wrap(app());
  ->listen();
```

</div>

That's how to build a simple Http server with eien.

## Configuring Eien

Since Eien uses Swoole under the hood, your configuration is mostly applied to Swoole. You can get started by passing in an array of configuration options to the `config` method.

<div class="class-mode">

```php
$server->config([
  'log_level' => 1,
  'log_file' => '/data/swoole.log',
]);
```

</div>
<div class="functional-mode">

```php
server()->config([
  'log_level' => 1,
  'log_file' => '/data/swoole.log',
]);
```

</div>
