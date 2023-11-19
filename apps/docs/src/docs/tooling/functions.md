# Functional Mode
<!-- <Badge text="new" /> -->

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

<!-- <VideoDocs
  subject="Watch the functional mode guide on youtube"
  description="Learn about leaf 3's new functional mode."
  link="https://www.youtube.com/embed/BTcUgeOZLyM"
/> -->

Functional Mode, as we call it is just a fancy name given to a bunch of predefined functions in your leaf app which allow you to create your entire app or API without relying on classes with lengthy initializers and namespaces. With functional mode, everything is handled for you under the hood and is given to you in one global function.

Functional mode is 100% optional as seen in the examples in the introduction section. It also requires zero setup or configuration since it's available right after installing Leaf.

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->json(['message' => 'Leaf is amazing!']);
});

app()->run();
```

## app

This function returns the current instance of the Leaf application. If none exists, it creates and returns it.

```php{4}
$app = new Leaf\App;

$app->get('/', function () {
  app()->response()->json(['name' => 'Leaf']);
});
```

`app()` on line 4 will return the leaf instance `$app` defined on line 1. If however, no leaf instance is found, `app()` will create a new instance and return it.

```php{5}
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->json(['name' => 'Leaf']);
});

app()->run();
```

As seen on line 5, no app instance already exists and so one is created and returned. This gives you powerful tooling and lets you get rid of imports, namespaces and lengthy initializers.

::: warning NOTE
In other frameworks like Laravel which also ship an `app()` method, calling `app()` will return the Laravel instance, not leaf's. In such situations, you can use the [app instance config](/docs/config/nsm#config-app-instance) if you absolutely need to use the leaf app instance.
:::

## _env

This global function allows you to get environment variables set in your `.env` file. `_env` takes in 2 parameters:

- The name of the env variable to get (required)
- The default value of the env variable to get if it doesn't exist (optional)

```php
// get value
$mode = _env('APP_MODE');

// get value with default
$mode = _env('APP_MODE', 'production');
```

## Extending

As mentioned earlier, some leaf modules come with their own globals. For instance, the [leaf http module](/modules/http/v/2/) comes with the `request()` and `response()` globals. All globals are named carefully to avoid conflicts with other popular PHP packages.

::: warning NOTE
Leaf and it's modules **only** set a global if a function with that name doesn't exist. This is to avoid unintentionally overwriting important functions in your code.
:::

If you run into a challenge like this, you can rename your functions if you defined them yourself.

**Throughout the docs, modules that support functional mode will have a section for the globals they provide.**

## Http Module

The [leaf http module](/modules/http/v/2/) comes with 2 globals:

### request

`request()` is a global function which returns the leaf request object. This is available out of the box in your Leaf applications, so there's no need to install the http module. Read more about the request object [here](/modules/http/v/2/request).

```php
$username = request()->get('username');
```

### response

`response()` is a global function which returns the leaf response object. This is available out of the box in your Leaf applications, so there's no need to install the http module. Read more about the response object [here](/modules/http/v/2/response).

```php
response()->markup("<b>Mychi</b>");
```

## Leaf Cookie

This global allows you to set/get a cookie or return the leaf cookie object. The cookie global is provided from the [leaf cookie module](/modules/cookies/).

```php
cookie()->set(["name" => "Mychi", "code" => "PHP"]);
```

## Leaf CSRF

Leaf CSRF provides 2 globals which make working with the package a whole lot easier. To get started you will need to install the [leaf csrf module](/modules/anchor/csrf/).

### _token

This method returns a generated CSRF token.

```php
$token = _token();
```

### _csrfField

This method generates a CSRF field in a form for you.

```php
<form>
  <?php _csrfField(); ?>
  ...
</form>
```

## Leaf Form

Leaf form also provides a `form` method which returns the entire leaf form object.

```php
form()->validate(...);
```

You will however need to install the leaf form module to get started.

## Leaf Db

After installing the leaf db module, you'll have access to the `db` global. This function returns an active instance of the database class.

```php
db()->connect(...);
```

## Leaf Auth

The leaf auth module provides an `auth()` global. This method returns an instance of the leaf auth class.

```php
auth()->login(...);
```
