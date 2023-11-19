# User login

In the last section, we talked about Leaf Auth and how to sign a user up. In this section, we'll talk about how to log a user in. This is a direct continuation of the last one, so if you haven't read it yet, you should do that first.

## SIGNING A USER IN

All of the initial setup we did in the last section would be necessary if you haven't already done that. From there, we can start implementing the login flow. The first thing we need to do is to create a route for the login page. We'll call this route `/login`. This route would expect a `POST` request with the following parameters: `email`, and `password`. You can pass these parameters in by updating the `data` property of the `request.json` file.

In our login route, we'll get the user data from the request body and pass it into Leaf Auth's `login` method. This method will return a `User` object if the login was successful. If it wasn't, we'll have access to the reason why the login failed. It sounds complicated but it's actually quite simple. Here's how we can implement it:

<div class="class-mode">

```php
$app->post('/login', function () use($app, $auth) {
  $userData = $app->request()->get(['email', 'password']);
  $user = $auth->login($userData);

  if (!$user) {
    response()->exit([
      'status' => 'error',
      'message' => 'Login failed',
      'data' => $auth->errors(),
    ]);
  }

  $app->response()->json([
    'status' => 'success',
    'message' => 'Login successful',
    'data' => $user,
  ]);
});
```

</div>
<div class="functional-mode">

```php
app()->post('/login', function () {
  $userData = request()->get(['email', 'password']);
  $user = auth()->login($userData);

  if (!$user) {
    response()->exit([
      'status' => 'error',
      'message' => 'Login failed',
      'data' => auth()->errors(),
    ]);
  }

  response()->json([
    'status' => 'success',
    'message' => 'Login successful',
    'data' => $user,
  ]);
});
```

</div>
