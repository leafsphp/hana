# Protected Routes

One of the most common use cases for authentication is protecting certain routes from being accessed by unauthorized users. Most authentication systems use a "guard" to authenticate and authorize users. While this is good, Leaf tries as much as possible to make your life easier by providing a simpler way to deal with protected routes in your app.

## The `user` method

The `user()` method is a simple way to check if a user is logged in. It returns the currently logged in user if an authenticated user is found and `null` if a user is not logged in.

This works for both session and token based authentication. In case of token based authentication, Leaf Auth will also check if the token is valid. If it is, the user is returned, if not, `null` is returned. You can get the reason for the authentication failure by calling the `errors()` method.

<div class="class-mode">

```php{3,8}
$auth = new Leaf\Auth;

$user = $auth->user();

if ($user) {
  // user is logged in
} else {
  // user is not logged in
  $errors = $auth->errors();
}
```

</div>

<div class="functional-mode">

```php{1,7}
$user = auth()->user();

if ($user) {
  // user is logged in
} else {
  // user is not logged in
  $errors = auth()->errors();
}
```

</div>

Using this method, you can easily protect your routes by checking if a user is logged in. If a user is not logged in, you can redirect them to the login page or return a 401 error. Here's an example:

<div class="class-mode">

```php
$app->get('/protected', function () use($app, $auth) {
  $user = $auth->user();

  if ($user) {
    // user is logged in
  } else {
    // user is not logged in
    $app->response()->redirect('/login');
  }
});
```

</div>

<div class="functional-mode">

```php
app()->get('/protected', function () {
  $user = auth()->user();

  if ($user) {
    // user is logged in
  } else {
    // user is not logged in
    response()->redirect('/login');
  }
});
```

</div>

For API routes, you can return a 401 error if a user is not logged in.

<div class="class-mode">

```php
$app->get('/protected', function () use($app, $auth) {
  $user = $auth->user();

  if ($user) {
    // user is logged in
  } else {
    // user is not logged in
    $app->response()->json([
      "error" => "Unauthorized",
      "data" => $auth->errors(),
    ], 401);
  }
});
```

</div>

<div class="functional-mode">

```php
app()->get('/protected', function () {
  $user = auth()->user();

  if ($user) {
    // user is logged in
  } else {
    // user is not logged in
    response()->json([
      "error" => "Unauthorized",
      "data" => auth()->errors(),
    ], 401);
  }
});
```

</div>

## The `id` method

The `id()` method returns the id of the currently logged in user. This is useful when you need to get the id of the currently logged in user.

It works exactly like the `user()` method above, except it returns the id of the user instead of the user object.

<div class="class-mode">

```php
$app->get('/protected', function () use($app, $auth) {
  $id = $auth->id();

  if ($id) {
    // user is logged in
  } else {
    // user is not logged in
    $app->response()->redirect('/login');
  }
});
```

</div>

<div class="functional-mode">

```php
app()->get('/protected', function () {
  $id = auth()->id();

  if ($id) {
    // user is logged in
  } else {
    // user is not logged in
    response()->redirect('/login');
  }
});
```

</div>

## Using middleware

Leaf allows you to define behaviour for your routes using middleware. The latest update to the Leaf Router allows you to define named middleware. This means you can define a middleware once and use it on multiple routes.

Using named middleware, you can easily protect your routes by defining a middleware that checks if a user is logged in and use it on the routes/groups you want to protect.

<div class="class-mode">

```php
$app->registerMiddleware('auth', function () use($app, $auth) {
  $user = $auth->user();

  if (!$user) {
    // user is not logged in
    $app->response()->exit([
      'error' => 'Unauthorized',
      'data' => $auth->errors(),
    ], 401);
  }
});

$app->get('/protected', ['middleware' => 'auth', function () use($app, $auth) {
  // user is logged in
}]);

$app->group(['middleware' => 'auth', function () use($app, $auth) {
  $app->get('/protected', function () use($app, $auth) {
    // user is logged in
  });

  $app->get('/protected2', function () use($app, $auth) {
    // user is logged in
  });
}]);
```

</div>

<div class="functional-mode">

```php
app()->registerMiddleware('auth', function () {
  $user = auth()->user();

  if (!$user) {
    // user is not logged in
    response()->exit([
      'error' => 'Unauthorized',
      'data' => auth()->errors(),
    ], 401);
  }
});

app()->get('/protected', ['middleware' => 'auth', function () {
  // user is logged in
}]);

app()->group('/group', ['middleware' => 'auth', function () {
  app()->get('/protected', function () {
    // user is logged in
  });

  app()->get('/protected2', function () {
    // user is logged in
  });
}]);
```

</div>

Using this method, you can easily define custom behaviour for your protected routes without having to repeat yourself.

## Session Guard

All the methods above work for both session and token based authentication. However, Leaf Auth also provides a session guard that automatically handles redirects and other session based authentication behaviour.

The `guard()` method has 2 middleware provided automatically: `guest` and `auth`.

The `guest` middleware checks if a user is logged in. If a user is logged in, they are redirected to the `GUARD_HOME` page. If a user is not logged in, they are allowed to continue.

The `auth` middleware checks if a user is logged in. If a user is logged in, they are allowed to continue. If a user is not logged in, they are redirected to the `GUARD_LOGIN` page.

<div class="class-mode">

```php
$auth = new Leaf\Auth;

$auth->config([
  'GUARD_HOME' => '/dashboard',
  'GUARD_LOGIN' => '/login',
]);

$app->get('/protected', function () use($app, $auth) {
  // will redirect to /login if user is not logged in
  $auth->guard('auth');

  // user is logged in
});

$app->get('/login', function () use($app, $auth) {
  // will redirect to /dashboard if user is logged in
  $auth->guard('guest');

  // user is not logged in
});
```

</div>

<div class="functional-mode">

```php
auth()->config([
  'GUARD_HOME' => '/dashboard',
  'GUARD_LOGIN' => '/login',
]);

app()->get('/protected', function () {
  // will redirect to /login if user is not logged in
  auth()->guard('auth');

  // user is logged in
});

app()->get('/login', function () {
  // will redirect to /dashboard if user is logged in
  auth()->guard('guest');

  // user is not logged in
});
```

</div>

## Next Steps

There are still a few more useful session based authentication methods that Leaf Auth provides. You can check them out in the [Leaf Auth Session docs](/modules/auth/session).
