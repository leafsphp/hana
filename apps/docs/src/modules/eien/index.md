# Eien Server

Eien is Leaf's implementation of a high-speed, high-performance server based on powerful tools like [Open Swoole](https://swoole.co.uk/) and [Swoole](https://github.com/swoole/swoole-src). Eien loads your app in memory and shares a state between requests to achieve amazing speeds.

When serving Leaf apps with Eien, you gain additional performance improvements due to Leaf's lightweight and super fast nature.

::: warning Note that
Eien runs on Swoole, so you need to have the swoole extension installed.

- [Swoole Installation docs](https://openswoole.com/docs/get-started/installation)
- [In case you have errors installing swoole on Mac](https://parsinta.com/articles/setup-php-swoole-in-your-mac-os)
:::

## Installation

You can easily install Eien using the [Leaf CLI](/docs/cli/):

```bash
leaf install eien
```

Or with [Composer](https://getcomposer.org/).

```bash
composer require leafs/eien
```

## Prerequisites

Eien has been configured to rely on some features available in only v3 of Leaf. This means that you can't use Eien with earlier versions of the Leaf framework. Not to worry, if you're on Leaf 2, migrating to Leaf 3 should take less than 10 minutes. You can follow this [documentation to help you migrate](/docs/migration/introduction.html)

## Benchmarks

<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:10px;">
  <div>
    <b>Leaf WITHOUT Eien:</b>
    <img width="759" alt="IMG_0785" src="https://user-images.githubusercontent.com/26604242/194716365-40e6e77c-6cb3-403e-a890-62382d14976e.png">
  </div>
  <div>
    <b>Leaf WITH Eien:</b>
    <img width="746" alt="IMG_5389" src="https://user-images.githubusercontent.com/26604242/209473926-43485e5b-7ab2-4851-a5ee-fdb2b90973e7.png">
  </div>
</div>

***From the Benchmarks above, Leaf was 76x faster when used with Eien.***

## Basic Usage

Eien just like the rest of Leaf 3 was built with developer experience in mind. This means that for basic usage, which for most people will be speeding up their applications and simple http features, you don't need to make any modification to your application after installing Eien. Once Leaf detects Eien, it will automatically setup everything and get your app running faster than anything you've seen.

::: warning Note
Eien is still in it's dev phase, we have occasional releases, but Eien has not yet been fully tested in production and we'll need your help with that.
:::

## Serving Your Application

You can start your application using the `php <filename>` command. This command will start Eien which will then load your app. Since Eien loads your application to memory, any changes to your application's files will not be reflected when you refresh your browser so we don't recommend this method. You can think of it as starting your nodejs application with `node index.js`.

What we really need in this case is to watch your files and restart them when there's any update. For this, we tweaked the `leaf serve` command from the Leaf CLI a bit. You can use the Leaf serve command to start Eien and watch for any changes.

```bash
leaf serve <filename>
```

## Drawbacks

Since Eien is tied to Leaf, it means that you can't use it with other frameworks. This is because Leaf is built with a very specific architecture that makes it very fast and efficient. This means that you can't use Eien with other frameworks like Laravel, Symfony, etc.

Another major thing to watch out for is the use of PHP functions for responses. All your headers and cookies need to pass through Leaf directly, otherwise Eien won't be able to handle them right. This means you can't use inbuilt PHP functions like `header()` or `setcookie()`. You'll need you use Leaf's `response->withHeader()` and `response->withCookie()` functions instead.

## WebSockets <sup class="vt-badge experimental" data-text="Beta" />

> A WebSocket server is a network communication protocol which supports full-duplex communication over a TCP connection. A WebSocket server usually operations on traditional HTTP ports like 80 or 443, this makes it compatible with the HTTP protocol, but you can select other ports to run on. Compared with the HTTP protocol, which is stateless, a WebSocket Server can maintain a persistent connection, making it a stateful protocol. The connection between the client and server is kept alive.

Eien now allows you to create routes that use websockets with Leaf. Just as with all of Leaf, there's no need for any configuration. You can just create a route and start using websockets.

::: warning Note
Since Eien's WebSocket functionality is still not fully production tested, it is only available through the beta channel. You'll need to install the beta versions of Leaf, Eien and Leaf Http to use websockets. You can do this by running the following commands:

```bash
leaf install leaf@3.2.2-beta eien@dev-main http@dev-main
```

:::

To create a websocket route, simply use the `ws` method on the leaf app. Note that under the hood, only one websocket instance is created, however, you can create as many routes as you want. These routes will share the instance and will be smartly handled automatically by Eien.

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->ws('/ws-route', function () {
  response()->json([
    'message' => 'Hello from websocket'
  ]);
});

app()->run();
```

As you can see, the websocket route is just like any other route. The only difference is that you use the `ws` method instead of the `get` or `post` method. You can use Leaf request, response, db and other modules just as you would in any other part of your app.

The handler function for the websocket route is a callback function that will be called when a client sends a message to the websocket route. The callback function receives a `Swoole\WebSocket\Server` instance as it's first argument. It also receives a `Swoole\WebSocket\Frame` instance as it's second argument. The `Swoole\WebSocket\Server` instance is the websocket server instance and the `Swoole\WebSocket\Frame` instance is the message sent by the client.

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->ws('/ws-route', function ($server, $frame) {
  $server->push($frame->fd, 'Hello from websocket');
});

app()->run();
```

Of course, you can use Leaf's request and response modules to handle your websocket routes which is recommended over directly using the `Swoole\WebSocket\Server` instance.

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->ws('/ws-route', function () {
  response()->json([
    'message' => 'Hello from websocket'
  ]);
});

app()->run();
```
