---
aside: none
---

# Auth Config

Auth Config was added to give you more control over how leaf handles authentication in your apps. Auth has been configured perfectly for most apps, but not all use cases are the same, hence, this brilliant addition.

This also includes various configurations for doing things like:

- Setting custom token lifetime
- Hiding/Showing user fields
- Adding/removing default timestamps
- Changing the default password key
- Setting custom password encode methods
- Turning off password encoding totally
- Setting custom password verify methods
- Hiding/Showing password field
- Adding custom validation messages
- Configuring tokens

## config

To set a config variable, you can simply call the `config` method.

```php
auth()->config("item", "value");
```

You can also pass in an array to set multiple configs at once:

```php
auth()->config([
  "item" => "value",
  "item2" => "value"
]);
```

## Settings

Below is a list of all available settings.

### USE_TIMESTAMPS

This determines whether Leaf should add the default `created_at` and `updated_at` timestamps on register and update. Default is `true`.

### PASSWORD_ENCODE

*This setting has gone through a lot of changes since v2.4 beta, and may not work exactly the same way*. This setting is run when leaf wants to encode a password. It now uses `PASSWORD_DEFAULT` by defaullt for encryption.

```php
// This turns off password encoding
auth()->config("PASSWORD_ENCODE", false);

// defult encoding (Leaf\Helpers\Password::hash)
auth()->config("PASSWORD_ENCODE", null);

// use md5. We're still keeping support for md5 :-)
auth()->config("PASSWORD_ENCODE", Password::MD5);

// use custom method
auth()->config("PASSWORD_ENCODE", function ($password) {
  return Password::hash($password);
});
```

### PASSWORD_VERIFY

This setting is called when Leaf tries to verify a password. It works just like `PASSWORD_ENCODE` above.

```php
// This turns off password encoding
auth()->config("PASSWORD_VERIFY", false);

// defult encoding (Leaf\Helpers\Password::hash)
auth()->config("PASSWORD_VERIFY", null);

// use md5. We're still keeping support for md5 :-)
auth()->config("PASSWORD_VERIFY", Password::MD5);

// use custom method
auth()->config("PASSWORD_VERIFY", function ($password) {
  return Password::verify($password);
});
```

### PASSWORD_KEY

This allows you to change the password field name, maybe yours is passcode? This tells leaf to look for a user's password in that field. The example below tells leaf to search for passwords in the `passcode` column. (the default field is password)

```php
auth()->config("PASSWORD_KEY", "passcode");
```

### ID_KEY

`ID_KEY` allows you to set your primary key name. For instance, you might have used `_id` instead of `id`. This setting allows you to quickly and effectively switch your key name.

```php
auth()->config("ID_KEY", "_id");
```

### USE_UUID

This simply allows you to set the value for user ids on your own. This is done in order to add support for UUIDs in your registrations and not go with the default SQL increments.

```php
auth()->config("USE_UUID", UUID::v4());
```

### HIDE_ID

This is a boolean which determines whether to hide the id in the user object returned on login/register. Default is `true`.

### AUTH_NO_PASS

This allows you to *manually* tell leaf auth that no password is required for authentication. When this is set to true, leaf auth will assume there is no password and act accordingly. If there is no password field set in the credentials passed into the `login` or `register` methods, leaf auth will automatically set this to `true`.

### HIDE_PASSWORD

Just as the name implies, allows you to hide or show the password in the final results returned from auth. Default is `true`.

### LOGIN_PARAMS_ERROR

This is the error to show if there's an error with any parameter which isn't the password eg: username:

```php
auth()->config("LOGIN_PARAMS_ERROR", "Username is incorrect!");
```

Default is `Incorrect credentials!`.

### LOGIN_PASSWORD_ERROR

This is the error to show if there's an error with the password.

Default is `Password is incorrect!`.

```php
auth()->config("LOGIN_PASSWORD_ERROR", "Password is incorrect!");
```

### USE_SESSION

Use session based authentication instead of the default JWT based auth. Without this setting enbled, you can't use any of the session methods below. Default is `false`.

### SESSION_ON_REGISTER

If true, a session will be created on a successful registration, else you it'll be created on login rather. Default is `false`.

### GUARD_LOGIN

The page route. Default is `/auth/login`.

### GUARD_REGISTER

The register page route. Default is `/auth/register`.

### GUARD_LOGOUT

Logout route handler. Default is `/auth/logout`.

### GUARD_HOME

Home page route. Default is `/home`.

### SAVE_SESSION_JWT

Add an auth token to the auth session? This allows you save a generated JWT to the session. You might want to use this if you want to extend your app into an API. Default is `false`.

### TOKEN_LIFETIME

How long the token can be used before it expires. Default is 1 day.

### TOKEN_SECRET

This is the secret key used to generate tokens for users on signup and register.

::: danger Leaf Auth Refactor 🔥
The leaf auth module has been broken up into subclasses for easier use and performance reasons. If you only use login and signup, there's no need to include a class with tons of features that you may not use.

This doesn't change the way leaf auth works as this was done for performance and maintainability reasons. You can still use the auth class just as done in Leaf 2, however, this has been optimized using static methods which means unnecessary code will not be run.

```php
Leaf\Auth::session();
```

:::

<!-- ## Next Steps

<div class="vt-box-container next-steps">
  <a class="vt-box h:_10 w:50" href="/modules/db/v/2/builder">
    <h3 class="next-steps-link mb:_1">Continue the Guide</h3>
    <small class="next-steps-caption">Learn how to build queries with Leaf Db's developer friendly syntax.</small>
  </a>
  <a class="vt-box ml:_1" href="/modules/db/v/2/new" target="_blank">
    <h3 class="next-steps-link">Follow the Tutorial</h3>
    <small class="next-steps-caption">For those who prefer learning things hands-on. Let's build something real!</small>
  </a>
  <a class="vt-box w:50 ml:_1" href="/modules/db/v/2/new">
    <h3 class="next-steps-link">What's new in v2</h3>
    <small class="next-steps-caption">Check out all the changes in this new version of leaf db.</small>
  </a>
</div> -->

## Next Steps

<div class="vt-box-container next-steps">
  <a class="vt-box w:100" href="/modules/auth/v/2/methods">
    <h3 class="next-steps-link">v2.0 Methods</h3>
    <small class="next-steps-caption">Docs on all the methods provided in v2.0</small>
  </a>
  <a class="vt-box w:100 ml-md-up:_1" href="/modules/auth/v/2/session">
    <h3 class="next-steps-link">v2.0 Sessions</h3>
    <small class="next-steps-caption">Session support with auth v2.0.</small>
  </a>
</div>
