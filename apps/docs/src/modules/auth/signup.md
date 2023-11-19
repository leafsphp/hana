# Register

<!-- markdownlint-disable no-inline-html -->
<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

Leaf Auth provides a flexible and secure authentication system for your web apps and APIs that is simple and easy to use. It allows you to quickly create a complete signup system for your app.

## Auth Systems

Leaf Auth provides two authentication systems:

- Token based authentication
- Session based authentication

These two systems are very similar, the only difference is that token based authentication uses tokens to authenticate users while session based authentication uses sessions to authenticate users. *Token based auth is used by default, but you can switch to session based authentication using the [Auth Config](/modules/auth/config#use-session).*

### Token based authentication

Token based authentication is a system where a user is given a token upon login. This token is then used to authenticate the user on every request. This is the most common authentication system for APIs.

<details>
  <summary>New to Token Authentication?</summary>
  <VideoDocs
    subject="How Token Authentication Works"
    description="Many websites use token authentication to secure access to their services. This video explains what tokens are and how token authentication works."
    link="https://www.youtube.com/embed/giKeegmeaKw"
  />
</details>

### Session based authentication

Session based authentication is a system where a user is given a session upon login. This session is then used to authenticate the user on every request. This is the most common authentication system for web apps.

<details>
  <summary>New to Session Authentication?</summary>
  <VideoDocs
    subject="Session Based Authentication | Authentication Series"
    description="Session-based authentication is a stateful authentication technique where we use sessions to keep track of the authenticated user. In this video, we learn what session-based authentication is, what session is and how session-based authentication is implemented."
    link="https://www.youtube.com/embed/gKkBEOq_shs"
  />
</details>

::: tip Defaults
Token based auth is used by default, but you can switch to session based authentication using the [Auth Config](/modules/auth/config#use-session).
:::

## The register method

Leaf auth provides a `register()` method used to sign users up and create a session or token for them. The `register()` method takes in an array of data you want to use to authenticate the user and a list of items that should be unique to users, like email and username.

<div class="class-mode">

```php
$auth = new Leaf\Auth;
$auth->register([
  'username' => 'example',
  'email' => 'm@example.com',
  'password' => 'password'
]);
```

</div>
<div class="functional-mode">

```php
auth()->register([
  'username' => 'example',
  'email' => 'm@example.com',
  'password' => 'password'
]);
```

</div>

This example creates a new user with the username `example`, email `m@example.com` and password `password` in your database. The `register()` method then returns the user's data or session if the registration was successful. If the registration was not successful, `null` is returned instead.

<div class="class-mode">

```php
$auth = new Leaf\Auth;
$data = $auth->register([
  'username' => 'example',
  'email' => 'm@example.com',
  'password' => 'password'
]);

if ($data) {
  // user is authenticated
} else {
  // user is not authenticated
}
```

</div>

<div class="functional-mode">

```php
$data = auth()->register([
  'username' => 'example',
  'email' => 'm@example.com',
  'password' => 'password'
]);

if ($data) {
  // user is authenticated
} else {
  // user is not authenticated
}
```

</div>

To get the reason why the user is not authenticated, you can use the `errors()` method. This returns an array of errors that occured during authentication.

<div class="class-mode">

```php{12}
$auth = new Leaf\Auth;
$data = $auth->register([
  'username' => 'example',
  'email' => 'm@example.com',
  'password' => 'password'
]);

if ($data) {
  // user is authenticated
} else {
  // user is not authenticated
  $errors = $auth->errors();
}
```

</div>

<div class="functional-mode">

```php{11}
$data = auth()->register([
  'username' => 'example',
  'email' => 'm@example.com',
  'password' => 'password'
]);

if ($data) {
  // user is authenticated
} else {
  // user is not authenticated
  $errors = auth()->errors();
}
```

</div>

If the authentication was successful, the user is returned. You can use this to get the user's data.

<div class="class-mode">

```php{10,11}
$auth = new Leaf\Auth;
$data = $auth->register([
  'username' => 'example',
  'email' => 'm@example.com',
  'password' => 'password'
]);

if ($data) {
  // user is authenticated
  $token = $data['token'];
  $user = $data['user'];
} else {
  // user is not authenticated
  $errors = $auth->errors();
}
```

</div>

<div class="functional-mode">

```php{9,10}
$data = auth()->register([
  'username' => 'example',
  'email' => 'm@example.com',
  'password' => 'password'
]);

if ($data) {
  // user is authenticated
  $token = $data['token'];
  $user = $data['user'];
} else {
  // user is not authenticated
  $errors = auth()->errors();
}
```

</div>

## Unique items

The `register()` method takes in a list of items that should be unique to users. This is used to check if the user already exists in the database. If the user already exists, the `register()` method returns `null` and the reason why the user is not authenticated can be gotten using the `errors()` method.

<div class="class-mode">

```php{12}
$auth = new Leaf\Auth;
$data = $auth->register([
  'username' => 'example',
  'email' => 'm@example.com',
  'password' => 'password'
], ['username', 'email']);

if ($data) {
  // user is authenticated
} else {
  // user is not authenticated
  $errors = $auth->errors();
}
```

</div>

<div class="functional-mode">

```php{11}
$data = auth()->register([
  'username' => 'example',
  'email' => 'm@example.com',
  'password' => 'password'
], ['username', 'email']);

if ($data) {
  // user is authenticated
} else {
  // user is not authenticated
  $errors = auth()->errors();
}
```

</div>

The code above checks if someone with the username `example` or email `m@example.com` already exists in the database. If they do, the `register()` method returns `null` and the reason why the user is not authenticated can be gotten using the `errors()` method.

## Normalizing user data

The data from a successful sign up looks something like this:

```php
[
  'user' => [
    'username' => 'example',
    'email' => 'm@example.com',
    'created_at' => '2019-09-20 13:47:48'
  ],
  'token' => 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NzYxMzUzMjgsImlzcyI6ImxvY2FsaG9zdCIsImV4cCI6MTU3NjEzNjIyOCwidXNlcklkIjoxfQ.7FODXGGJKioGQVX4ic0DJLoMIQTVUlsd4zFAJA4DAkg'
]
```

The user ID and password are not included in the data. This is because Leaf Auth does not return sensitive data like passwords and user IDs. This is done to prevent sensitive data from being exposed.

In some cases, you might need the user id returned at sign up. To do this, you need to configure Leaf Auth to expose the user id. You can do this by setting the `HIDE_ID` config to `false`.

<div class="class-mode">

```php
$auth = new Leaf\Auth;

$auth->config('HIDE_ID', false);

...
```

</div>

<div class="functional-mode">

```php
auth()->config('HIDE_ID', false);

...
```

</div>

## Password Encoding

Leaf Auth uses the [Leaf Password Helper](/modules/password/) to encode passwords. It supports the most popular password encoding algorithms including `bcrypt`, `argon2i` and `md5`. You can still use your own password encoder by updating the [`PASSWORD_ENCODE`](/modules/auth/config.html#password-encode) config.

::: tip Custom Password Encoder
In case you want to use your own password encoder, your method must return the encoded password.
:::

## Session based auth

Leaf Auth uses token based authentication by default, but allows you to seamlessly switch to session based authentication by setting the `USE_SESSION` config to `true` or by using the `useSession()` method.

<div class="class-mode">

```php
$auth = new Leaf\Auth;

$auth->useSession();

...
```

</div>

<div class="functional-mode">

```php
auth()->useSession();

...
```

</div>

Just like with token based authentication, you can use the `register()` method to authenticate users. The only difference is that the `register()` method redirects you to a route defined as `GUARD_HOME` with a new session or redirects to `GUARD_LOGIN` if you have the `SESSION_ON_REGISTER` config set to `false`.

<div class="class-mode">

```php
$auth = new Leaf\Auth;

$auth->useSession();
$auth->config('GUARD_HOME', '/home');

// will automatically redirect to /home if successful
$user = $auth->register([
  'username' => 'example',
  'email' => 'm@example.com',
  'password' => 'password'
]);

if (!$user) {
  // you can pass the auth errors into a view
  return $template->render('pages.auth.login', [
    'errors' => auth()->errors(),
    'username' => $username,
    'password' => $password,
  ]);
}
```

</div>

<div class="functional-mode">

```php
auth()->useSession();
auth()->config('GUARD_HOME', '/home');

// will automatically redirect to /home if successful
$user = auth()->register([
  'username' => $username,
  'email' => $email,
  'password' => $password
]);

if (!$user) {
  // you can pass the auth errors into a view
  return $template->render('pages.auth.register', [
    'errors' => auth()->errors(),
    'username' => $username,
    'email' => $email,
    'password' => $password,
  ]);
}
```

</div>

## Session on register

Some authentication systems require you to log in right after creating an account. This means that you won't start a session until the user logs in. You can implement this by setting the `SESSION_ON_REGISTER` config to `false`.

<div class="class-mode">

```php
$auth = new Leaf\Auth;

$auth->useSession();

// set your login route...default is /auth/login
$auth->config('GUARD_LOGIN', '/login');

// set your home route...default is /home
$auth->config('GUARD_HOME', '/dashboard');

// Redirect to GUARD_LOGIN after auth
$auth->config('SESSION_ON_REGISTER', false);

// Login automatically after registration and redirect to GUARD_HOME
$auth->config('SESSION_ON_REGISTER', true);
```

</div>

<div class="functional-mode">

```php
auth()->useSession();

// set your login route...default is /auth/login
auth()->config('GUARD_LOGIN', '/login');

// set your home route...default is /home
auth()->config('GUARD_HOME', '/dashboard');

// Redirect to GUARD_LOGIN after auth
auth()->config('SESSION_ON_REGISTER', false);

// Login automatically after registration and redirect to GUARD_HOME
auth()->config('SESSION_ON_REGISTER', true);
```

</div>
