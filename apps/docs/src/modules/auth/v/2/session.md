---
aside: none
---

# Session support

Session based authentication as the name implies, creates and manages a session during the authentication process to track the user's logged in state. Leaf auth provides an easy and developer friendly approach to handle this.

To get started with session support, just set the `USE_SESSION` config to true.

```php
auth()->config('USE_SESSION', true);
```

A much simpler way would be to simply call the `useSession` method.

```php
auth()->useSession();
```

## Session methods

Enabling session support allows you to use some special methods and behaviours which are not available with the regular JWT authentication.

### guard

The guard method works sort of like authentication middleware. It takes in a single param, an array holding the authentication state or the type of guard to load up.

```php
auth()->guard('auth');

// or

Leaf\Auth::guard('auth');

// guest route redirects to home
// route if you're logged in
Leaf\Auth::guard('guest');
```

::: tip The <code>guard</code> method
You can directly run a guard on the `guard` method.

```php
guard('guest');
```

:::
<!-- 
### save

This method is used to save data to the auth session.

```php
Leaf\Auth\Session::save('rememberLogin', false);

// You can add multiple vars
Leaf\Auth\Session::save([
  'rememberLogin' => false,
  'sessionActivity' => 'login'
]);
```

As usual, this is easier with the auth class or with functional mode

```php
auth()->save('rememberLogin', false);
``` -->

### length

With length, you can get how long a user has been logged in. You can save the session time logs to your database in order to track users' login logs. The available logs are `SESSION_STARTED_AT` and `SESSION_LAST_ACTIVITY` which are automatically tracked by Leaf.

```php
$sessionDuration = auth()->length();
```

### lastActive

`lastActive` allows you to get how much time has passed since the last session activity.

```php
$userLastSeen = auth()->lastActive();
```

### refresh

As the name implies, you can refresh the session with this method. Refreshing sort of restarts the session, but you can keep the user's old session data if you wish to.

```php
if ($newAccountAdded) {
  // will delete old session data
  Leaf\Auth::refresh();
} else {
  // will keep session data
  auth()->refresh(false);s
}
```

### status

`status` checks whether a user session is ongoing by looking for keys specific to Leaf session auth so it doesn't confuse a Leaf auth session with user defined sessions. Returns the user if a session is found and false if there's no session found.

```php
if (auth()->status()) {
  return 'logged in';
} else {
  return 'guest mode';
}
```

### logout

Of course we'll need a method to logout/end our session. This is just the method for that.

```php
auth()->logout();
```

You can also pass in a route to redirect to after logging out.

```php
auth()->logout('/home');
```

## Next Steps

<div class="vt-box-container next-steps">
  <a class="vt-box w:100" href="/modules/auth/v/2/config">
    <h3 class="next-steps-link mb:_1">v2.0 Config</h3>
    <small class="next-steps-caption">Configure leaf auth to meet your needs.</small>
  </a>
  <a class="vt-box w:100 ml-md-up:_1" href="/modules/auth/v/2/methods">
    <h3 class="next-steps-link">v2.0 Methods</h3>
    <small class="next-steps-caption">Docs on all the methods provided in v2.0</small>
  </a>
</div>
