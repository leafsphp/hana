# Session support

<!-- markdownlint-disable no-inline-html -->

We've covered session support and it's use in various techniques like login, register, etc. But there are still a bunch of session auth methods that we haven't covered yet. Let's get into them.

## Enabling sessions

To get started with session support, just set the `USE_SESSION` config to true.

```php
auth()->config('USE_SESSION', true);
```

A much simpler way would be to simply call the `useSession` method.

```php
auth()->useSession();
```

## guard

We covered guards in-depth in the [protecting your routes](/modules/auth/protecting-your-routes) section. You can use guards to check if a user is logged in or not.

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

## length

With `length()`, you can get how long a user has been logged in. You can save the session time logs to your database in order to track users' login logs. The available logs are `SESSION_STARTED_AT` and `SESSION_LAST_ACTIVITY` which are automatically tracked by Leaf.

```php
$sessionDuration = auth()->length();
```

## lastActive

`lastActive` allows you to get how much time has passed since the last session activity.

```php
$userLastSeen = auth()->lastActive();
```

## refresh

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

## status

::: danger Deprecated
This method is deprecated and will be removed in the next major release. Use `user()` instead.
:::

`status` checks whether a user session is ongoing by looking for keys specific to Leaf session auth so it doesn't confuse a Leaf auth session with user defined sessions. Returns the user if a session is found and false if there's no session found.

```php
if (auth()->status()) {
  return 'logged in';
} else {
  return 'guest mode';
}
```

## logout

Of course we'll need a method to logout/end our session. This is just the method for that.

```php
auth()->logout();
```

You can also pass in a route to redirect to after logging out.

```php
auth()->logout('/home');
```
