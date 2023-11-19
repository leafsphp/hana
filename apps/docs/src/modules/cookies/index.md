# Leaf Cookie

<!-- markdownlint-disable no-inline-html -->

Cookies are small pieces of text sent to a client's browser by your application. They help your app remember information about users' visits, which can both make it easier to visit your app and make it more useful to your users.

The cookie module helps you create, interact with and manage your cookies.

## Installation

You can quickly install leaf cookies with composer or leaf cli.

```bash
leaf install cookie
```

or with composer:

```bash
composer require leafs/cookie
```

## Usage

<div class="functional-mode">

Right after installing the cookie module, you can start using it on the `cookie()` method like this:

```php
cookie()->set('name', 'Fullname');
```

</div>
<div class="class-mode">

Leaf cookie provides a `Leaf\Http\Cookie` class for quickly using cookie methods:

```php
use Leaf\Http\Cookie;

...

Cookie::set('name', 'Fullname');
```

</div>

## Setting Cookies

The cookie module provides 3 methods for setting cookies:

- `set()`
- `simpleCookie()`
- `response()->withCookie`

### Set

This method allows you to set a cookie which should be returned with your next response to the client. It takes in 3 params:

- cookie name (string|array)
- cookie value (optional - string)
- cookie options (optional - array)

<div class="functional-mode">

```php
// normal method
cookie()->set('name', 'Fullname');

// using array
cookie()->set(['name' => 'Fullname']);
```

</div>
<div class="class-mode">

```php
// normal method
Cookie::set('name', 'Fullname');

// using array
Cookie::set(['name' => 'Fullname']);
```

</div>

You can also set multiple cookies at a time

<div class="functional-mode">

```php
cookie()->set([
  'name' => 'Fullname',
  'age' => '18'
]);
```

</div>
<div class="class-mode">

```php
Cookie::set([
  'name' => 'Fullname',
  'age' => '18'
]);
```

</div>

Cookies can also be set with options. These options allow you to set the cookie's expiry time, path, domain, secure and httponly. They determine how long the cookie should last and who should have access to it.

<div class="functional-mode">

```php
cookie()->set('name', 'Fullname', ['expire' => 0]);
```

</div>
<div class="class-mode">

```php
Cookie::set('name', 'Fullname', ['expire' => 0]);
```

</div>

Options for cookies are:

- expire
- path
- domain
- secure
- httponly

### simpleCookie

This method allows you to quickly set a cookie and it's expiry time. It takes in 3 params:

- cookie name (string|array)
- cookie value (optional - string)
- cookie expiresAt (optional - string - default of 7 days)

<div class="functional-mode">

```php
cookie()->simpleCookie('name', 'Fullname', '2 days');
```

</div>
<div class="class-mode">

```php
Cookie::simpleCookie('name', 'Fullname', '2 days');
```

</div>

### response()->withCookie

This method allows you to set a cookie directly on the response object. It takes in 3 params:

- cookie name (string)
- cookie value (string)
- cookie expiresAt (optional - string - default of 7 days)

<div class="functional-mode">

```php
response()->withCookie('name', 'Fullname', '2 days')->json([
  'message' => 'Cookie set'
]);
```

</div>
<div class="class-mode">

```php
$app
  ->response
  ->withCookie('name', 'Fullname', '2 days')
  ->json([
    'message' => 'Cookie set'
  ]);
```

</div>

## Getting Cookies

Just as you can set cookies, you can also get them from the client. The cookie module provides 2 methods for retrieve cookies:

- `get()`
- `all()`

### get

`get()` returns a particular set cookie

<div class="functional-mode">

```php
$name = cookie()->get('name');
```

</div>
<div class="class-mode">

```php
$name = Cookie::get('name');
```

</div>

### all

`all()` returns all set cookies.

<div class="functional-mode">

```php
$cookies = cookie()->all();
```

</div>
<div class="class-mode">

```php
$cookies = Cookie::all();
```

</div>

## Deleting Cookies

The cookie module provides 3 methods for deleting cookies:

- `response()->withoutCookie()`
- `unset()`
- `unsetAll()`

### response()->withoutCookie

This method allows you to delete a cookie directly on the response object. It takes in 1 param which is the cookie to delete.

<div class="functional-mode">

```php
response()->withoutCookie('name')->json([
  'message' => 'Cookie deleted'
]);
```

</div>
<div class="class-mode">

```php
$app
  ->response
  ->withoutCookie('name')
  ->json([
    'message' => 'Cookie deleted'
  ]);
```

</div>

### unset

This method allows you to delete a cookie that was previously set. It takes in the cookie to unset.

<div class="functional-mode">

```php
cookie()->unset('name');
```

</div>
<div class="class-mode">

```php
Cookie::unset('name');
```

</div>

You can also unset multiple cookies at a time

<div class="functional-mode">

```php
cookie()->unset(['name', 'age']);
```

</div>
<div class="class-mode">

```php
Cookie::unset(['name', 'age']);
```

</div>

### unsetAll

This method removes all set cookies.

<div class="functional-mode">

```php
cookie()->unsetAll();
```

</div>
<div class="class-mode">

```php
Cookie::unsetAll();
```

</div>
