# User registration

We've looked at how to insert and read data from a database. A user registration flow entails a couple of steps depending on the complexity of the application. In this tutorial, we'll look at how to implement a simple user registration flow. This will involve the following steps:

::: warning
Since we've already looked at form validation, we'll skip that step and focus on the other steps.
:::

Note that this only covers the backend side of authentication (API related).

## LEAF AUTH

Leaf Auth is a package that provides a simple authentication flow for Leaf. It provides a simple API to register, login, and logout users. Leaf has packaged entire authentication flows into a single package to make implementation much easier and faster. For this tutorial, we'll use Leaf Auth to implement a simple JWT based registration flow.

The first thing we need to do is to connect Leaf Auth to our database. Note that we only need to do this if there's no existing Leaf Db database connection. If there is, we can skip this step.

<div class="class-mode">

```php
$auth = new Leaf\Auth();
$auth->connect(
  'eu-cdbr-west-03.cleardb.net',
  'heroku_fb1311a639bb407',
  'b9607a8a6d5ebb',
  'cc589b17'
);
```

</div>
<div class="functional-mode">

```php
auth()->connect(
  'eu-cdbr-west-03.cleardb.net',
  'heroku_fb1311a639bb407',
  'b9607a8a6d5ebb',
  'cc589b17'
);
```

</div>

This is necessary because Leaf Auth needs access to a database to store and retrieve users. Since we have a database connection, we now need to tell Leaf auth which table to store items in. You can run this query to create the table:

```sql
DROP TABLE IF EXISTS `tableName`;
CREATE TABLE `tableName` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)
```

After creating your table, pass it into Leaf Auth like this:

<div class="class-mode">

```php
db()->config('DB_TABLE', 'tableName');
```

</div>
<div class="functional-mode">

```php
db()->config('DB_TABLE', 'table');
```

</div>

## REGISTERING A USER

Now that we've got all the initial setup out of the way, we can now start implementing the registration flow. The first thing we need to do is to create a route for the registration page. We'll call this route `/register`. This route would expect a `POST` request with the following parameters: `name`, `email`, and `password`. You can pass these parameters in by updating the `data` property of the `request.json` file.

In our register route, we'll get the user data from the request body and pass it into Leaf Auth's `register` method. This method will return a `User` object if the registration was successful. If it wasn't, we'll have access to the reason why the registration failed. It sounds complicated but it's actually quite simple. Here's how we can implement it:

<div class="class-mode">

```php
$app->post('/register', function () use($app, $auth) {
  $userData = $app->request()->get(['name', 'email', 'password']);
  $user = $auth->register($userData);

  if (!$user) {
    response()->exit([
      'status' => 'error',
      'message' => 'Registration failed',
      'data' => $auth->errors(),
    ]);
  }

  $app->response()->json([
    'status' => 'success',
    'message' => 'Registration successful',
    'data' => $user,
  ]);
});
```

</div>
<div class="functional-mode">

```php
app()->post('/register', function () {
  $userData = request()->get(['name', 'email', 'password']);
  $user = auth()->register($userData);

  if (!$user) {
    response()->exit([
      'status' => 'error',
      'message' => 'Registration failed',
      'data' => auth()->errors(),
    ]);
  }

  response()->json([
    'status' => 'success',
    'message' => 'Registration successful',
    'data' => $user,
  ]);
});
```

</div>
