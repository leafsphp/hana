# Login

<!-- markdownlint-disable no-inline-html -->
<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

Building a login system is one of the most common tasks in web development, it can also be one of the most tedious. Leaf Auth provides a flexible and secure authentication system for your web apps and APIs that is simple and easy to use.

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

## The login method

Leaf auth provides a `login()` method used to authenticate users and create a session or token for them. The `login()` method takes in an array of data you want to use to authenticate the user. This data is usually the user's email and password.

<div class="class-mode">

```php
$auth = new Leaf\Auth;
$auth->login([
  'email' => 'm@example.com',
  'password' => 'password'
]);
```

</div>
<div class="functional-mode">

```php
auth()->login([
  'email' => 'm@example.com',
  'password' => 'password'
]);
```

</div>

This example uses the user's email and password to authenticate them.

If the user is authenticated, a session or token is created for them and the user is returned. If the user is not authenticated, `null` is returned instead. You can use this to check if the user is authenticated or not.

<div class="class-mode">

```php
$auth = new Leaf\Auth;
$data = $auth->login([
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
$data = auth()->login([
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

```php{11}
$auth = new Leaf\Auth;
$data = $auth->login([
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

```php{10}
$data = auth()->login([
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

```php{9,10}
$auth = new Leaf\Auth;
$data = $auth->login([
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

```php{8,9}
$data = auth()->login([
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

## Normalizing user data

The data from a successful login looks something like this:

```php
[
  'user' => [
    'username' => 'mychi.darko',
    'email' => 'mychi@leafphp.dev',
    'created_at' => '2019-09-20 13:47:48'
  ],
  'token' => 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NzYxMzUzMjgsImlzcyI6ImxvY2FsaG9zdCIsImV4cCI6MTU3NjEzNjIyOCwidXNlcklkIjoxfQ.7FODXGGJKioGQVX4ic0DJLoMIQTVUlsd4zFAJA4DAkg'
]
```

Even without knowing what our database look like, you can tell that the user ID and password are not included in the data. This is because Leaf Auth does not return sensitive data like passwords and user IDs. This is done to prevent sensitive data from being exposed.

In some cases, you might need the user id returned at login. To do this, you need to configure Leaf Auth to expose the user id. You can do this by setting the `HIDE_ID` config to `false`.

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

Just like with token based authentication, you can use the `login()` method to authenticate users. The only difference is that the `login()` method creates a session for your user instead of just returning the user info and a token. It also automatically redirects you to a route defined as `GUARD_HOME` if you have the `SESSION_REDIRECT_ON_LOGIN` config set to `true`.

<div class="class-mode">

```php
$auth = new Leaf\Auth;

$auth->useSession();
$auth->config('GUARD_HOME', '/home');

// will automatically redirect to /home if successful
$data = $auth->login([
  'email' => $email,
  'password' => $password,
]);

if (!$data) {
  // you can pass the auth errors into a view
  return $template->render('pages.auth.login', [
    'errors' => auth()->errors(),
    'email' => $email,
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
$user = auth()->login([
  'email' => $email,
  'password' => $password
]);

if (!$user) {
  // you can pass the auth errors into a view
  return $template->render('pages.auth.login', [
    'errors' => auth()->errors(),
    'email' => $email,
    'password' => $password,
  ]);
}
```

</div>

For more information on session based authentication, check out the [session based authentication](/modules/auth/session) page.

## Session lifetime

Session lifetime is the amount of time a session is valid for. This is usually set to a few minutes or hours. Leaf Auth allows you to set the session lifetime using the `SESSION_LIFETIME` config. This config is set to `1 day` by default.

You can set the session lifetime using seconds or a string that can be parsed by the [PHP `strtotime()`](https://www.php.net/manual/en/function.strtotime.php) function.

<div class="class-mode">

```php
$auth = new Leaf\Auth;

$auth->config('SESSION_LIFETIME', '1 hour');
$auth->config('SESSION_LIFETIME', 3600);
```

</div>

<div class="functional-mode">

```php
auth()->config('SESSION_LIFETIME', '1 hour');
auth()->config('SESSION_LIFETIME', 3600);
```

</div>

If you set the session lifetime to `0`, the session will never expire.

<div class="class-mode">

```php
$auth = new Leaf\Auth;

$auth->config('SESSION_LIFETIME', 0);
```

</div>

<div class="functional-mode">

```php
auth()->config('SESSION_LIFETIME', 0);
```

</div>

## Token lifetime

Token lifetime is the amount of time a token is valid for. This is usually set to a few minutes or hours. Leaf Auth allows you to set the token lifetime using the `TOKEN_LIFETIME` config.

<div class="class-mode">

```php
$auth = new Leaf\Auth;

$auth->config('TOKEN_LIFETIME', 3600);
```

</div>

<div class="functional-mode">

```php
auth()->config('TOKEN_LIFETIME', 3600);
```

</div>

## Password Encoding

Leaf Auth uses the [Leaf Password Helper](/modules/password/) to encode passwords. It supports the most popular password encoding algorithms including `bcrypt`, `argon2i` and `md5`. You can still use your own password encoder by updating the [`PASSWORD_VERIFY`](/modules/auth/config.html#password-verify) config.

::: tip Custom Password Encoder
In case you want to use your own password verification method, your method must return `true` if the password is correct and `false` if the password is incorrect.
:::
