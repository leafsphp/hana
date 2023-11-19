# User update

In addition to the `register()` and `login()` methods, Leaf Auth also provides a `update()` method which allows you to update a user's information. This method takes in 2 parameters:

- The data to update
- Unique values (optional)

<div class="class-mode">

```php
// data to update
$data = $app->request()->get(['username', 'email']);
$user = $auth->update($data);
```

</div>

<div class="functional-mode">

```php
// data to update
$data = request()->get(['username', 'email']);
$user = auth()->update($data);
```

</div>

The example above updates the user's username and email with the values passed in the request. Leaf Auth automatically gets the user id from the session or token and updates the user with the data passed. This means that there should be a session or token present in the request.

If there is no session or token present in the request, the `update()` method will return `null`. You can get the errors using the `errors()` method and handle it however you want.

<div class="class-mode">

```php
// data to update
$data = $app->request()->get(['username', 'email']);
$user = $auth->update($data);

if (!$user) {
  $errors = $auth->errors();
  // handle errors
}
```

</div>

<div class="functional-mode">

```php
// data to update
$data = request()->get(['username', 'email']);
$user = auth()->update($data);

if (!$user) {
  $errors = auth()->errors();
  // handle errors
}
```

</div>

## Unique values

Just like the `register()` method, the `update()` method also takes in a second parameter which is an array of unique values. This is used to check if the user's new credentials are unique. If the user's new credentials are not unique, the `update()` method will return `null` and you can get the errors using the `errors()` method. Note that unique values in the `update()` method exclude the current user.

<div class="class-mode">

```php
// data to update
$data = $app->request()->get(['username', 'email']);

// unique values
$uniques = ['username', 'email'];

$user = $auth->update($data, $uniques);

if (!$user) {
  $errors = $auth->errors();
  // handle errors
}
```

</div>

<div class="functional-mode">

```php
// data to update
$data = request()->get(['username', 'email']);

// unique values
$uniques = ['username', 'email'];

$user = auth()->update($data, $uniques);

if (!$user) {
  $errors = auth()->errors();
  // handle errors
}
```

</div>

## Session support

When a user is updated in the database, the change is also reflected in the active session and the updated user is also returned. This means that you can use the `update()` method to update a user's information and also update the session with the new information. *Just be sure to turn on session based auth in the auth config.*

<div class="class-mode">

```php
$auth = new Leaf\Auth;

$auth->config("USE_SESSION", true);

...
```

</div>

<div class="functional-mode">

```php
auth()->config("USE_SESSION", true);

...
```

</div>
