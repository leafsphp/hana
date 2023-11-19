<!-- markdownlint-disable no-inline-html -->
# Leaf Session

Given that HTTP-driven applications lack statefulness, sessions offer a means of retaining user-related data throughout multiple requests. Usually, this user information is stored in some sort of persistent storage so it can be accessed on subsequent requests.

Although using sessions in PHP is fairly straightforward, it can be a bit cumbersome at times. Leaf session aims to make working with sessions in PHP much easier, more enjoyable, and more testable. For that reason, Leaf provides the session module to help you manage sessions in your Leaf apps. *Leaf session is 100% compatible with native PHP sessions.*

## Installation

You can install leaf session with the Leaf CLI tool:

```bash
leaf install session
```

or with composer:

```bash
composer require leafs/session
```

## Functional Mode

When using Leaf session in a Leaf 3 app, you can use the functional mode. This allows you to use the session module without having to initialize it. This gives you access to the `session()` and [`flash()`](/modules/session/flash#functional-mode) helper functions.

## Starting a new session

Leaf's session module smartly handles session initialization. It checks if a session has already been started and starts a new one if it hasn't. This means you don't have to worry about starting a session before using it. Note that Leaf will not start a session until you actually use it. This is to prevent unnecessary session initialization.

You also don't have to worry about messing up your sessions since Leaf session is 100% compatible with native PHP sessions.

### Manually starting a session

If you want to manually start a session, you can use the `start()` method.

<div class="class-mode">

```php
$session = new Leaf\Http\Session;

...

$session->start();
```

</div>
<div class="functional-mode">

```php
session()->start();
```

</div>

## Retrieving session data

Leaf session provides 3 ways to retrieve session data:

- The `get()` method
- The `retrieve()` method
- The `body()` method

### The `get()` method

`get()` is a simple method that returns a session value. It takes in 3 parameters:

- The name of the value to return. It works just like how `$_SESSION['key']` does.
- The default value to use if it doesn't exist.
- A boolean value indicating whether to sanitize the value or not. It has a default value of true.

<div class="class-mode">

```php
$session = new Leaf\Http\Session;

...

$item = $session->get('item');
$item = $session->get('item', 'default value');
$item = $session->get('item', 'default value', false);
```

</div>
<div class="functional-mode">

```php
$item = session()->get('item');
$item = session()->get('item', 'default value');
$item = session()->get('item', 'default value', false);
```

</div>

You can also return many fields at once from the session by passing an array of keys:

<div class="class-mode">

```php{5}
$session = new Leaf\Http\Session;

...

$user = $session->get(['username', 'email']);

...

echo $user['username'];
```

</div>
<div class="functional-mode">

```php{1}
$user = session()->get(['username', 'email']);

...

echo $user['username'];
```

</div>

### The `retrieve()` method

`retrieve()` returns the requested value just like `get()` above **and then immediately removes it from the session**, so it can only be retrieved once.

It takes in three parameters:

- The name of the value to return. It works just like how `$_SESSION['key']` does.
- The default value to use if it doesn't exist.
- A boolean value indicating whether to sanitize the value or not. It has a default value of true.

<div class="class-mode">

```php
$session = new Leaf\Http\Session;

...

$item = $session->retrieve('item');
$item = $session->retrieve('item', 'default value');
$item = $session->retrieve('item', 'default value', false);
```

</div>
<div class="functional-mode">

```php
$item = session()->retrieve('item');
$item = session()->retrieve('item', 'default value');
$item = session()->retrieve('item', 'default value', false);
```

</div>

### The `body()` method

This method returns the {key => value} pairs of all the session data including any CSRF data as an associative array.

<div class="class-mode">

```php
$session = new Leaf\Http\Session;

...

$body = $session->body();
```

</div>
<div class="functional-mode">

```php
$body = session()->body();
```

</div>

## Check if a session value exists

You can check if a session value exists with the `has()` method. It takes in the name of the value to check for and returns a boolean value.

<div class="class-mode">

```php
$session = new Leaf\Http\Session;

...

if ($session->has('item')) {
  // do something
}
```

</div>
<div class="functional-mode">

```php
if (session()->has('item')) {
  // do something
}
```

</div>

By default, `has()` will return `true` **ONLY if the value exists and is NOT empty**. You can change this behaviour by passing in `false` as the second parameter. This boolean value indicates whether to check if the value is empty or not. It has a default value of true.

<div class="class-mode">

```php
$session = new Leaf\Http\Session;

...

if ($session->has('item', false)) {
  // do something
}
```

</div>
<div class="functional-mode">

```php
if (session()->has('item', false)) {
  // do something
}
```

</div>

## Setting session data

The session module provides a simple way to set session data using the `set()` method. It takes in two parameters:

- The name of the value to set.
- The value to set.

<div class="class-mode">

```php
$session = new Leaf\Http\Session;

...

$session->set('item', 'value');
```

</div>
<div class="functional-mode">

```php
session()->set('item', 'value');
```

</div>

You can also set multiple values at once by passing in an array:

<div class="class-mode">

```php
$session = new Leaf\Http\Session;

...

$session->set([
  'item1' => 'value1',
  'item2' => 'value2'
]);
```

</div>
<div class="functional-mode">

```php
session()->set([
  'item1' => 'value1',
  'item2' => 'value2'
]);
```

</div>

## Removing session data

Leaf provides a simple `unset()` method to remove session data. It takes in the name of the value to remove.

<div class="class-mode">

```php
$session = new Leaf\Http\Session;

...

// remove single item
$session->unset('email');

// remove multiple items
$session->unset(['name', 'email']);
```

</div>
<div class="functional-mode">

```php
// remove single item
session()->unset('email');

// remove multiple items
session()->unset(['name', 'email']);
```

</div>

We also added the `delete()` method as an alias for `unset()`. They both do the same thing.

<div class="class-mode">

```php
$session = new Leaf\Http\Session;

...

// remove single item
$session->delete('email');

// remove multiple items
$session->delete(['name', 'email']);
```

</div>
<div class="functional-mode">

```php
// remove single item
session()->delete('email');

// remove multiple items
session()->delete(['name', 'email']);
```

</div>

## Wiping session data

Leaf Session allows you to wipe all session data with the `clear()` method. This method completely deletes all session information, but does not destroy the session itself.

<div class="class-mode">

```php
$session = new Leaf\Http\Session;

...

$session->clear();

echo json_encode($_SESSION); // {}
```

</div>
<div class="functional-mode">

```php
session()->clear();

echo json_encode($_SESSION); // {}
```

</div>

## Working with Arrays

Leaf session allows you to neatly handle working with arrays in session. You can set, retrieve and validate session values from arrays by using the dot notation:

<div class="class-mode">

```php
$session = new Leaf\Http\Session;

...

// $user = ['username' => 'leaf', 'email' => 'leaf@example'];

$username = $session->get('user.username');
$email = $session->get('user.email');
```

</div>
<div class="functional-mode">

```php
// $user = ['username' => 'leaf', 'email' => 'leaf@example'];

$username = session()->get('user.username');
$email = session()->get('user.email');
```

</div>

This works for `retrieve()`, `has()`, `set()` and `unset()` as well.

**has:**

<div class="class-mode">

```php
$session = new Leaf\Http\Session;

...

if ($session->has('user.username')) {
  // do something
}

// allow empty values
if ($session->has('user.username', false)) {
  // do something
}
```

</div>
<div class="functional-mode">

```php
if (session()->has('user.username')) {
  // do something
}

// allow empty values
if (session()->has('user.username', false)) {
  // do something
}
```

</div>

**Set:**

<div class="class-mode">

```php
$session = new Leaf\Http\Session;

...

$session->set('user.username', 'leaf');
```

</div>
<div class="functional-mode">

```php
session()->set('user.username', 'leaf');
```

</div>

**Unset:**

<div class="class-mode">

```php
$session = new Leaf\Http\Session;

...

$session->unset('user.username');
```

</div>
<div class="functional-mode">

```php
session()->unset('user.username');
```

</div>

## Session flash

Leaf session also provides built-in support for flash messages. Flash messages are temporary messages that are displayed to the user after an action has been performed. They are usually used to display success or error messages to the user.

<div class="class-mode">

```php
$session = new Leaf\Http\Session;

$session->flash("my flash message");

echo $session->flash(); // my flash message
```

</div>
<div class="functional-mode">

```php
session()->flash("my flash message");

echo session()->flash(); // my flash message
```

</div>

For more advanced uses of flash messages, you can check out the [Flash Session docs](/modules/session/flash).

## Session Internals

Leaf session provides a few methods to help you manage sessions. These methods are:

### reset()

You can use the `reset()` method to re-initialize a session.

<div class="class-mode">

```php
$app->post('/session/reset', function () use($session) {
  $session->reset();
});
```

</div>
<div class="functional-mode">

```php
app()->post('/session/reset', function () {
  session()->reset();
});
```

</div>

### id()

`id()` sets and/or returns the current session id. It takes in an **optional** parameter: the ID to overwrite the session id.

<div class="class-mode">

```php
$id = $session->id();
```

</div>
<div class="functional-mode">

```php
$id = session()->id();
```

</div>

If the session id is not set, this will generate and return a new session id. However, if the session id is already set, it will just return it.

You can also set your own session id with this syntax below. It will be returned as well, so you can keep it in a variable.

<div class="class-mode">

```php
$id = $session->id("new session id");
```

</div>
<div class="functional-mode">

```php
$id = session()->id("new session id");
```

</div>

### regenerate()

This method generates a new session id. It takes in a boolean parameter which indicates whether to delete all session data or not (has a default of false)

<div class="class-mode">

```php
$session->regenerate();
$session->regenerate(false);
$session->regenerate(true); // will clear all session data
```

</div>
<div class="functional-mode">

```php
session()->regenerate();
session()->regenerate(false);
session()->regenerate(true); // will clear all session data
```

</div>

### destroy()

You can end a session with `destroy`.

<div class="class-mode">

```php
$session->destroy();
```

</div>
<div class="functional-mode">

```php
session()->destroy();
```

</div>

### encode()

This feature allows you to encode the current session data as a string.

<div class="class-mode">

```php
$sessionString = $session->encode();
```

</div>
<div class="functional-mode">

```php
$sessionString = session()->encode();
```

</div>

### decode()

You can also decode a serialized session using the `decode()` method. It takes in the string to decode and returns true on success, false on failure.

<div class="class-mode">

```php
$success = $session->decode($sessionString);
```

</div>
<div class="functional-mode">

```php
$success = session()->decode($sessionString);
```

</div>
