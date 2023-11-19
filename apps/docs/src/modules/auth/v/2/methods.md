---
aside: none
---

# Authentication methods

These are the main functionality provided by leaf auth.

## login

Login is used to create a simple, secure user login.

**It takes in a table to search for users and a set of parameters for the login.**

```php
$user = auth()->login('users', [
  'username' => 'mychi.darko',
  'password' => 'test'
]);
```

If the user is successfully found, the user data is returned, if not, `null` is returned. You can get any error by calling the `errors` method.

```php
$user = auth()->login('users', [
  'username' => 'mychi.darko',
  'password' => 'test'
]); // returns null if failed

if (!$user) {
  response()->exit(auth()->errors());
}
```

example success response:
**Note that the password and id fields are removed**. You can control whether fields should be hidden from the returned value in the Auth settings.

```php
[
  "user" => [
    "username" => "mychi.darko",
    "email" => "mychi@leafphp.dev",
    "created_at" => "2019-09-20 13:47:48"
  ],
  "token" => "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NzYxMzUzMjgsImlzcyI6ImxvY2FsaG9zdCIsImV4cCI6MTU3NjEzNjIyOCwidXNlcklkIjoxfQ.7FODXGGJKioGQVX4ic0DJLoMIQTVUlsd4zFAJA4DAkg"
]
```

### session support

Login now has session support which allows login to create a session instead of returning a JWT as done by default. To get started with session, just set the `USE_SESSION` setting or call the `useSession` method.

```php
auth()->useSession();

auth()->login('users', [
  'username' => $username,
  'password' => $password
]);
```

When the login succeeds, you'll be redirected to `GUARD_HOME`. You can configure the `GUARD_HOME` route to match the needs of your app.

In case there's something wrong and Auth can't sign the user in, it returns a falsy value.

```php
auth()->useSession();

$user = auth()->login('users', [
  'username' => $username,
  'password' => $password
]);

if (!$user) {
  // you can pass the auth errors into a view
  return $blade->render('pages.auth.login', [
    'errors' => auth()->errors(),
    'username' => $username,
    'password' => $password,
  ]);
}
```

### Password Encoding

Leaf auth has a very simple and straightforward implementation for password encoding. You can use default password protection with the leaf password helper or use your own method for hashing. All of this can be configured with [auth settings](/modules/auth/v/2/config.html#password-encode)

### Validation

This version of leaf auth has separated validation into it's own method. This allows you to have cleaner methods which are more readable. Validation uses [leaf form](/modules/forms/) under the hood, which makes it simple and easy to use. You can find more about form rules in the [leaf form validation docs](/modules/forms/#supported-rules).

```php{1}
$validation = auth()->validate(['username' => 'ValidUsername']);

if (!$validation) {
  response()->exit(auth()->errors());
}

$user = auth()->login('users', $loginData);

if (!$user) {
  response()->exit(auth()->errors());
}
```

## register

Register is a simple method used to create simple, secure user registrations. **It takes in a table to save users, the params(array) to save and any items which should be unique.**

```php
auth()->register('users', [
  'username' => 'mychi.darko',
  'email' => 'mychi@leafphp.dev',
  'field' => 'value'
]);
```

If the user is successfully saved, the user data is returned, if not, `null` is returned. You can get any error by calling the `errors` method.

```php
$user = auth()->register('users', [
  'username' => 'mychi.darko',
  'email' => 'mychi@leafphp.dev',
  'field' => 'value'
]); // returns null if failed

if (!$user) {
  response()->exit(auth()->errors());
}
```

### Uniques

Let's say you want to check whether the username a user just entered has been taken, you'd have to write a bunch of conditional code, making the code count larger and more error prone, right?

Well, `register` solves this problem smoothly. `register` has a 3rd parameter: an array of unique values which makes sure that the same value can't be saved twice.

```php
auth()->register(
  'users',
  ['name' => 'mychi', 'email' => 'm@m.com', 'pass' => '1234'],
  ['name', 'email']
);
```

We are telling `register` to alert us if someone has already registered with the name `mychi` or the email `m@m.com`. This is because we passed `['name', 'email']` as the 3rd param to `register`.

**With uniques, you can cut down on your whole app:**
For instance, if you know the exact data you'll be receiving in your app, let's say a username, email and password from a register form, you can do something like this:

```php
app()->post('/register', function () {
  auth()->register(
    'users',
    request()->body(),
    ['username', 'email']
  );
});
```

So, we pass in the entire request body, which contains the username, email and password. Simple right?

For an even better way, you can make sure that only the data you need is going into the database. You can do this to retrieve only the fields you need.

```php
// select only the username, email and password from the request body
$data = request()->get(['username', 'email', 'password']);

auth()->register('users', $data);
```

### `register` session support

Just as with login, register now integrates with session. To turn this feature on, just set the `USE_SESSION` setting or call the `useSession` method.

```php
auth()->useSession();

auth()->register('users', $credentials, [
  'username', 'email'
]);
```

After a successful registration, you can redirect to GUARD_HOME or rather GUARD_LOGIN if you want the user to login after registration.

```php
// set your login route...default is /auth/login
auth()->config('GUARD_LOGIN', '/login');

// Redirect to login after auth
auth()->config('SESSION_ON_REGISTER', false);

// Login automatically after registration
auth()->config('SESSION_ON_REGISTER', true);
```

In case there's something wrong and Auth can't register the user, it returns a falsy value.

```php
$user = auth()->register('users', $credentials, [
  'username', 'email'
]);

if (!$user) {
  // you can pass the auth errors into a view
  return $blade->render('pages.auth.register', [
    'errors' => auth()->errors(),
    'username' => $username,
    'email' => $email,
    'password' => $password,
  ]);
}
```

## update

There's a login method, a register method, so why not a user update method? This method takes the stress out of updating a user's information. Update takes in 3 parameters:

- The table to look for users
- The data to update
- Unique values (optional)

::: warning Changes in update
The `update` method has been rewritten completely from the ground up. The biggest change is that you no longer need to pass in a condition for locating th user to update, but it also means that there needs to be a logged in user. `update` will now search for a JWT or user session to find the user to be updated.
:::

```php
// data to update
$data = request()->get(["username", "email"]);

// unique data
$uniques = ["username", "email"];

$user = auth()->update("users", $data, $uniques);
```

::: tip Something little
Uniques in `update` work a bit different from `register`, in `update`, Leaf tries to find another user which isn't the current user that has the same credentials. So if there's no other user with that same param value, the unique test passes. In short, **the current user is excluded from the users to check for same credentials**
:::

### `update` session support

When a user is updated, the user is updated in the session and the updated user is also returned.

```php
$user = auth()->update("users", $data, $uniques);
```

<!-- ::: details Detailed Explanation
If you are developing a large project, working with other developers, or sometimes include 3rd-party HTML/CSS (e.g. from Auth0), consistent scoping will ensure that your styles only apply to the components they are meant for.

Beyond the `scoped` attribute, using unique class names can help ensure that 3rd-party CSS does not apply to your own HTML. For example, many projects use the `button`, `btn`, or `icon` class names, so even if not using a strategy such as BEM, adding an app-specific and/or component-specific prefix (e.g. `ButtonClose-icon`) can provide some protection.
::: -->

## user

This is a method which allows you to get the user who is currently logged in. This method expects either a JWT or a session to exist on the request. `user` finds the user id and queries the user from the database linked to leaf auth. In the case of JWTs, it also validates the JWT and makes sure that it is valid and hasn't expired.

```php
$user = auth()->user();
return $user['name'];
```

As mentioned, `user` queries your database for the full user information. By default, the table to look for users has been set to `users`. You can pass in a table of your choice like this:

```php
$user = auth()->user('all_users');
```

We can catch any errors that occur, from fetching the user, working with the token...

```php
$user = auth()->user() ?? $request->exit(auth()->errors());
```

`user` also takes in a second parameter, which is an array of items to hide from the returned user array.

```php
$user = auth()->user('users', ['id', 'password']);
```

## id

This method returns the id of the currently logged in user. In the case of JWTs, it decodes and validates the token and returns the `user_id` field encoded in it.

```php
$userId = auth()->id();
```

<!-- ### [Leaf Authentication Methods](/docs/core/authentication) -->

<!-- Leaf Auth now uses the `Leaf\Helpers\Authentication` package to provide solutions for token authentication. This provides a simple way to work with manual authentication and tokens. All methods here are now available in `Leaf\Auth`.

```php
$payload = auth()->validate($token);
``` -->

## Next Steps

<div class="vt-box-container next-steps">
  <a class="vt-box w:100" href="/modules/auth/v/2/config">
    <h3 class="next-steps-link mb:_1">v2.0 Config</h3>
    <small class="next-steps-caption">Configure leaf auth to meet your needs.</small>
  </a>
  <a class="vt-box w:100 ml-md-up:_1" href="/modules/auth/v/2/session">
    <h3 class="next-steps-link">v2.0 Sessions</h3>
    <small class="next-steps-caption">Session support with auth v2.0.</small>
  </a>
</div>
