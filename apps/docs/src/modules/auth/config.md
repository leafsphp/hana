# Auth Config

<!-- markdownlint-disable no-inline-html -->

Auth Config was added to give you more control over how leaf handles authentication in your apps. Leaf Auth has been configured perfectly for most apps, but not all use cases are the same, hence, this brilliant addition.

This includes various configurations for doing things like:

- Configuring tokens
- Hiding/Showing user fields
- Adding/removing default timestamps
- Changing the default password key
- Password encoding and verification
- Adding custom validation messages

## Setting config values

To set a config variable, you can simply call the `config` method.

<div class="class-mode">

```php
$auth = new Leaf\Auth;
$auth->config('item', 'value');
```

</div>

<div class="functional-mode">

```php
auth()->config('item', 'value');
```

</div>

You can also pass in an array to set multiple configs at once:

<div class="class-mode">

```php
$auth->config([
  'item' => 'value',
  'item2' => 'value'
]);
```

</div>

<div class="functional-mode">

```php
auth()->config([
  'item' => 'value',
  'item2' => 'value'
]);
```

</div>

## Database Config

Leaf Auth uses a database to store and retrieve users. It has been configured to work with common setups, but you can change the database config to suit your needs.

### DB_TABLE

The `DB_TABLE` config allows you to set a particular table which leaf auth will perform operations on. Leaf auth will use this database table for storing and retrieving users. By default, it is set to `users`. This allows you to login, signup, update and fetch users without explicitly adding a table each time.

### USE_TIMESTAMPS

This determines whether Leaf should add the default `created_at` and `updated_at` timestamps on register and update. Default is `true`.

### TIMESTAMP_FORMAT

If you set `USE_TIMESTAMPS` to `true` you can then use this property to specify the format that you want your timestamps to be saved in.
Be aware that `auth` uses the `leafs/date` module, so the accepted formats are listed [here](/modules/date/#display)

### PASSWORD_KEY

This allows you to change the password field name, maybe yours is passcode? This tells leaf to look for a user's password in that field. The example below tells leaf to search for passwords in the `passcode` column. (the default field is password)

<div class="class-mode">

```php
auth()->config('PASSWORD_KEY', 'passcode');
```

</div>

<div class="functional-mode">

```php
auth()->config('PASSWORD_KEY', 'passcode');
```

</div>

### ID_KEY

`ID_KEY` allows you to set your primary key name. For instance, you might have used `_id` instead of `id`. This setting allows you to quickly and effectively switch your key name.

<div class="class-mode">

```php
$auth->config('ID_KEY', '_id');
```

</div>
<div class="functional-mode">

```php
auth()->config('ID_KEY', '_id');
```

</div>

### USE_UUID

This simply allows you to set the value for user ids on your own. This is done in order to add support for UUIDs in your registrations and not go with the default SQL increments.

<div class="class-mode">

```php
$auth->config('USE_UUID', UUID::v4());
```

</div>
<div class="functional-mode">

```php
auth()->config('USE_UUID', UUID::v4());
```

</div>

## Password Encoding

These configuration options control how Leaf Auth encodes and verifies passwords. Leaf Auth uses `PASSWORD_DEFAULT` to encode passwords and `PASSWORD_VERIFY` to verify passwords.

### PASSWORD_ENCODE

This setting is used when leaf wants to encode a password. It uses the `Leaf\Helpers\Password::hash` method by default, but you can change this to suit your needs. It accepts these values:

- `false` - This turns off password encoding
- `null` - This uses the default encoding method (Leaf\Helpers\Password::hash)
- `Password::MD5` - This uses md5. We're still keeping support for md5 :-) (Leaf\Helpers\Password::MD5)
- `function` - This uses a custom method. The method should accept a password and return the encoded password.

<div class="class-mode">

```php
$auth->config('PASSWORD_ENCODE', false);

$auth->config('PASSWORD_ENCODE', null);

$auth->config('PASSWORD_ENCODE', Password::MD5);

$auth->config('PASSWORD_ENCODE', function ($password) {
  return Password::hash($password);
});
```

</div>

<div class="functional-mode">

```php
auth()->config('PASSWORD_ENCODE', false);

auth()->config('PASSWORD_ENCODE', null);

auth()->config('PASSWORD_ENCODE', Password::MD5);

auth()->config('PASSWORD_ENCODE', function ($password) {
  return Password::hash($password);
});
```

</div>

### PASSWORD_VERIFY

This setting is used by Leaf Auth to verify whether a password is correct. It uses the `Leaf\Helpers\Password::verify` method by default, but you can change this to suit your needs. It accepts these values:

- `false` - This turns off password verification
- `null` - This uses the default verification method (Leaf\Helpers\Password::verify)
- `Password::MD5` - This uses md5. We're still keeping support for md5 :-) (Leaf\Helpers\Password::MD5)
- `function` - This uses a custom method. The method should accept a password and return the encoded password.

This setting is called when Leaf tries to verify a password. It works just like `PASSWORD_ENCODE` above.

<div class="class-mode">

```php
$auth->config('PASSWORD_VERIFY', false);

$auth->config('PASSWORD_VERIFY', null);

$auth->config('PASSWORD_VERIFY', Password::MD5);

$auth->config('PASSWORD_VERIFY', function ($password) {
  return Password::verify($password);
});
```

</div>

<div class="functional-mode">

```php
auth()->config('PASSWORD_VERIFY', false);

auth()->config('PASSWORD_VERIFY', null);

auth()->config('PASSWORD_VERIFY', Password::MD5);

auth()->config('PASSWORD_VERIFY', function ($password) {
  return Password::verify($password);
});
```

</div>

## Special Config

These configuration options control special features of Leaf Auth.

### HIDE_ID

This is a boolean which determines whether to hide the id in the user object returned on login/register. Default is `true`.

### AUTH_NO_PASS

This allows you to _manually_ tell leaf auth that no password is required for authentication. When this is set to true, leaf auth will assume there is no password and act accordingly. If there is no password field set in the credentials passed into the `login` or `register` methods, leaf auth will automatically set this to `true`.

### HIDE_PASSWORD

Just as the name implies, allows you to hide or show the password in the final results returned from auth. Default is `true`.

## Error Message Config

These configuration options control the error messages returned by Leaf Auth. You can change these to suit your needs.

### LOGIN_PARAMS_ERROR

This is the error to show if there's an error with any parameter which isn't the password eg: username:

<div class="class-mode">

```php
$auth->config('LOGIN_PARAMS_ERROR', 'Username is incorrect!');
```

</div>
<div class="functional-mode">

```php
auth()->config('LOGIN_PARAMS_ERROR', 'Username is incorrect!');
```

</div>

Default is `Incorrect credentials!`.

### LOGIN_PASSWORD_ERROR

This is the error to show if there's an error with the password.

Default is `Password is incorrect!`.

<div class="class-mode">

```php
$auth->config('LOGIN_PASSWORD_ERROR', 'Password is incorrect!');
```

</div>

<div class="functional-mode">

```php
auth()->config('LOGIN_PASSWORD_ERROR', 'Password is incorrect!');
```

</div>

## Session Config

These configuration options control how Leaf Auth handles sessions. You can change these to suit your needs.

### USE_SESSION

Use session based authentication instead of the default JWT based auth. Without this setting enbled, you can't use any of the session methods below. Default is `false`.

### SESSION_ON_REGISTER

If set to `true`, a session will be created on a successful registration. If set to `false`, sessions will only be created when a user successfully logs into their account. The default value for this config is `false`.

### SESSION_REDIRECT_ON_LOGIN

This configuration option determins whether to redirect to a page after login. When set to `true`, the options set in `GUARD_LOGIN`, `GUARD_REGISTER` and `GUARD_HOME` will be used to redirect the user to the right page based on their state. Default is `true`.

### GUARD_LOGIN

The page route. Default is `/auth/login`.

### GUARD_REGISTER

The register page route. Default is `/auth/register`.

### GUARD_LOGOUT

Logout route handler. Default is `/auth/logout`.

### GUARD_HOME

Home page route. Default is `/home`.

### SESSION_LIFETIME

This option allows you to set the lifetime of the session. After this time, the session will expire and the user will have to login again. Default is `1 day`. You can also set `SESSION_LIFETIME` to `0` to disable session expiration.

### SESSION_COOKIE_PARAMS

This option allows you to set the cookie params for the session. These are the defaults set for you:

```php
[
  'secure' => true,
  'httponly' => true,
  'samesite' => 'lax'
]
```

### SAVE_SESSION_JWT

Add an auth token to the auth session? This allows you save a generated JWT to the session. You might want to use this if you want to extend your app into an API. Default is `false`.

## Token Config

These configuration options control how Leaf Auth handles tokens. You can change these to suit your needs.

### TOKEN_LIFETIME

How long the token can be used before it expires. Default is 1 day.

### TOKEN_SECRET

This is the secret key used to generate tokens for users on signup and register.

## Next Steps

<div class="vt-box-container next-steps">
  <a class="vt-box w:50" href="/modules/auth/login">
    <h3 class="next-steps-link mb:_1">Logins</h3>
    <small class="next-steps-caption">Learn how to build a login system with Leaf Auth.</small>
  </a>
  <a class="vt-box ml:_1" href="/modules/auth/signup" target="_blank">
    <h3 class="next-steps-link">Sign ups</h3>
    <small class="next-steps-caption">Learn how to build a sign up system with Leaf Auth</small>
  </a>
  <a class="vt-box w:50 ml:_1" href="/modules/auth/protecting-your-routes">
    <h3 class="next-steps-link">Middleware</h3>
    <small class="next-steps-caption">Learn how to protect your routes with Leaf Auth.</small>
  </a>
</div>
