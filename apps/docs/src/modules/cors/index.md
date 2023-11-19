# CORS

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

From Wikipedia, Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page to be accessed from another domain outside the domain from which the first resource was served.

<details>
<summary>New to CORS?</summary>

<VideoDocs
  subject="Watch this video on CORS by Fireship.io"
  description="Cross-Origin Resource Sharing or CORS is a mechanism that allows browsers to request data from 3rd party URLs (or origins) and is a common pain point for web developers. Learn the basics of CORS in 100 seconds."
  link="https://www.youtube.com/embed/4KHiSt0oLJ0"
/>
</details>

## The CORS Module

Since CORS is a common pain point for web developers, Leaf provides a simple way to deal with most CORS issues. Of course, you can always handle CORS manually, but this module just offers a more convenient and flexible way to do so. It is heavily inspired by the [ExpressJS](https://github.com/expressjs/express) [CORS package](https://github.com/expressjs/cors).

## Installation

You can install CORS through the Leaf CLI.

```bash
leaf install cors
```

or with composer

```bash
composer require leafs/cors
```

## Using the CORS Module

After installing the cors module, Leaf automatically links it to your app, so it can be used directly on the Leaf instance as the `cors()` method.

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App();
$app->cors();

// ... your app
```

</div>
<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->cors();

// ... your app
```

</div>

::: tip Usage Outside leaf
Leaf CORS can also be used without leaf's core. You simply need to reference methods on `Leaf\Http\Cors` which is the class for cors.

```php
Leaf\Http\Cors::config([
  'origin' => 'http://example.com',
  'optionsSuccessStatus' => 200,
]);
```

:::

## Basic usage

When you call `cors()` on your app, it enables CORS for all origins, headers and methods. This is the simplest way to enable CORS on your app.

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->cors();

$app->get('/products/{id}', function () use($app) {
  $app->response()->json([
    'message' => 'This is CORS-enabled for all origins!'
  ]);
});

$app->run();
```

</div>
<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->cors();

app()->get('/products/{id}', function () {
  response()->json([
    'message' => 'This is CORS-enabled for all origins!'
  ]);
});

app()->run();
```

</div>

However, there are times when you might want to be more restrictive by allowing only some origins to access your app. You can do this by passing in an options array to the `cors()` method. This array allows you to configure specific origins, methods, headers, etc. For example, the following code shows how to allow a single origin (http://example.com) to access your app using the `origin` option:

<div class="class-mode">

```php
$app->cors([
  'origin' => 'http://example.com',
  'optionsSuccessStatus' => 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
]);
```

</div>
<div class="functional-mode">

```php
app()->cors([
  'origin' => 'http://example.com',
  'optionsSuccessStatus' => 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
]);
```

</div>

A full list of all the options available can be found below.

## Configuration Options

* `origin`: Configures the **Access-Control-Allow-Origin** CORS header. Possible values:
  * `String` - set `origin` to a specific origin. For example if you set it to `"http://example.com"` only requests from "http://example.com" will be allowed.
  * `RegExp` - set `origin` to a regular expression pattern which will be used to test the request origin. If it's a match, the request origin will be reflected. For example the pattern `/example\.com$/` will reflect any request that is coming from an origin ending with "example.com".
  * `Array` - set `origin` to an array of valid origins. Each origin can be a `String` or a `RegExp`. For example `["http://example1.com", /\.example2\.com$/]` will accept any request from "http://example1.com" or from a subdomain of "example2.com".
  * `Function` - set `origin` to a function implementing some custom logic. The function takes the request origin as the first parameter and a callback (called as `callback(err, origin)`, where `origin` is a non-function value of the `origin` option) as the second.
* `methods`: Configures the **Access-Control-Allow-Methods** CORS header. Expects a comma-delimited string (ex: 'GET,PUT,POST') or an array (ex: `['GET', 'PUT', 'POST']`).
* `allowedHeaders`: Configures the **Access-Control-Allow-Headers** CORS header. Expects a comma-delimited string (ex: 'Content-Type,Authorization') or an array (ex: `['Content-Type', 'Authorization']`). If not specified, defaults to reflecting the headers specified in the request's **Access-Control-Request-Headers** header.
* `exposedHeaders`: Configures the **Access-Control-Expose-Headers** CORS header. Expects a comma-delimited string (ex: 'Content-Range,X-Content-Range') or an array (ex: `['Content-Range', 'X-Content-Range']`). If not specified, no custom headers are exposed.
* `credentials`: Configures the **Access-Control-Allow-Credentials** CORS header. Set to `true` to pass the header, otherwise it is omitted.
* `maxAge`: Configures the **Access-Control-Max-Age** CORS header. Set to an integer to pass the header, otherwise it is omitted.
* `preflightContinue`: Pass the CORS preflight response to the next handler.
* `optionsSuccessStatus`: Provides a status code to use for successful `OPTIONS` requests, since some legacy browsers (IE11, various SmartTVs) choke on `204`.

The default configuration is the equivalent of:

```json
{
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "allowedHeaders": "*",
  "exposedHeaders": "",
  "credentials": false,
  "maxAge": null,
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
}
```
