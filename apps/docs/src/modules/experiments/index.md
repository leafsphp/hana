<!-- markdownlint-disable no-inline-html -->
# 🍪 Cookies

The Leaf application provides helper methods to send cookies with the HTTP response. From version 2.2 beta, the old `Leaf\Http\Cookies` package has been replaced by `Leaf\Http\Cookie`. This change also fixes the bug which prevented use of `Leaf\Http\Cookies` inside route handlers and controllers.

## Init

Unlike the former `Leaf\Http\Cookies` package, you can use `Leaf\Http\Cookie` methods without initialising the class:

```php
use Leaf\Http\Cookie;
// ...
Cookie::set("name", "Michael");
```

## Set

This method replaces the previous `setCookie` method. It takes in 3 params:

- cookie name (string|array)
- cookie value (optional - string)
- cookie options (optional - array)

```php
// normal method
Cookie::set("name", "Michael");
// using array
Cookie::set(["name" => "Michael"]);
```

You can also set multiple cookies at a time

```php
Cookie::set([
    "name" => "Michael",
    "age" => "18"
]);
```

Adding cookie options

```php
Cookie::set("name", "Michael", ["expire" => 0]);
```

Options for cookies are:

- expire
- path
- domain
- secure
- httponly

<hr>

## simpleCookie

This method allows you to quickly set a cookie and it's expiry time. It takes in 3 params:

- cookie name (string|array)
- cookie value (optional - string)
- cookie expiresAt (optional - string - default of 7 days)

```php
Cookie::simpleCookie("name", "Michael", "2 days");
```

<hr>

## all

`all` returns all set cookies.

```php
$cookies = Cookie::all();
```

<hr>

## get

`get` returns a particular set cookie

```php
$name = Cookie::get("name");
```

<hr>

## unset

This method replaces the previous `deleteCookie` method. It takes in the cookie to unset.

```php
// normal method
Cookie::unset("name");
// using array
Cookie::unset(["name"]);
```

You can also unset multiple cookies at a time

```php
Cookie::unset(["name", "age"]);
```

<hr>

## unsetAll

This method removes all set cookies.

```php
Cookie::unsetAll();
```
