# Session Auth

::: warning Version support
This experiment supports `v3.0` upwards.
:::

## What are we building?

Although most web apps mostly rely on APIs and token/OAuth, the practice of using built in sessions for authentication certainly hasn't faded out.

In this experiment, we'll be looking at how to create logins, signups and user updates with Leaf v3. We'll be relying on session support in the auth package and we'll also be using blade for our templating.

::: details Detailed Explanation: Session authentication
Session based authentication is one in which the user state is stored on the server’s memory.

Read the full article [here](https://dev.to/thecodearcher/what-really-is-the-difference-between-session-and-token-based-authentication-2o39)
:::

::: details Detailed Explanation: Templating engines
For the sake of our tutorial, let's say that templating engines are a way of outputting code which allows us separate our logic from our views. There are many template engines out there, blade, twig, smarty and more.

According to expressjs.com:

> a template engine enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. This approach makes it easier to design an HTML page.
:::

## Building Our Login

First of all, we need a route to handle our login screen. We'll use leaf's core router for this. To get started, we'll need to install leaf auth and leaf blade. We can do this with composer:

```sh
composer require leafs/auth
composer require leafs/blade
```

or with leaf CLI:

```sh
leaf install auth
leaf install blade
```

After this, we can create our `index.php` file:

```php
require __DIR__ . "/vendor/autoload.php";

// show login page
app()->get("/auth/login", function() {
  echo app()->blade->render("login");
});

// login logic
app()->post("/auth/login", function() {
  // logic here
});

app()->run();
```

Next we'll define our blade view, `login.blade.php`:

```php
<section>
  <h1>Login</h1>
  <p>
    Sign into Leaf APP
  </p>
</section>
<form action="/auth/login" method="post">
  <div class="form-group">
    <input class="form-control" type="text" name="username" placeholder="username" value="{{ $username ?? '' }}">
    <small class="mb-1">{{ $errors['username'] ?? $errors['auth'] ?? null }}</small>
  </div>
  <div class="form-group">
    <input class="form-control" type="password" name="password" placeholder="password" value="{{ $password ?? '' }}">
    <small class="mb-1">{{ $errors['password'] ?? null }}</small>
  </div>
  <button class="btn btn-primary">Login</button>
</form>
```

Before we jump into the code, let's talk about the processes involved. When a user logs in, a new session is created for them. This session holds the user and the session tracker logs assigned by Leaf Auth. We can check the user's logged in state to load a page or redirect.

To set all this up with Leaf, all we need to do is to tell leaf auth to use sessions instead of just JWTs.

```php
auth()->useSession();
```

or

```php
auth()->config("USE_SESSION", true);
```

::: tip Functional Mode ⚡️
Note that the `auth` function we are using above comes from the auth package extending leaf 3's functional mode.
:::

```php
require __DIR__ . "/vendor/autoload.php";

auth()->useSession();

app()->get("/auth/login", function() {
  app()->blade->render("login");
});

app()->post("/auth/login", function() {
  // logic here
});
```

Now we can focus on the login logic. If you've used auth before in previous versions, adding session support literally changed nothing about the syntax, so you can still comfortably create your logins in the very same way.

```php
auth()->login("users", [
  "username" => $username,
  "password" => $password
]);
```

Even the error handling works the same way too:

```php
$user = auth()->login("users", [
  "username" => $username,
  "password" => $password
]);

if (!$user) {
  // an error happened here, you can display
  // them on your template. The errors can be
  // grabbed with auth()->errors()
}
```

On a successful login, `login` will redirect the user to `GUARD_HOME` which is simply the homepage route. This route can be configured using the config method.

```php
auth()->config("GUARD_HOME", "/dashboard");
```

Putting it all together, we can have something like this:

```php
// get username and password submitted from login form
list($username, $password) = array_values(request(["username", "email"]));

auth()->config("GUARD_HOME", "/dashboard");

// attempt a login
$user = auth()->login("users", [
  "username" => $username,
  "password" => $password
]);

// if there's a problem with credentials or system
if (!$user) {
  // render login page
  return app()->blade->render("login", [
    // pass in errors and credentials
    "errors" => auth()->errors(),
    "username" => $username,
    "password" => $password,
  ]);
}
```

As you can see nothing has changed in the login implementation even though a ton of new features have been added. Restructuring the code, we'll have something like this. There's one last thing though. When an already logged in user tries to go to the login page, we want to redirect to `GUARD_HOME`.

This means we have to check the session to find if the user is logged in or not, redirect if the user is logged in and maintain the page if the user isn't. Leaf makes this simple as well as it provides a `guard` method.

```php
auth()->guard("guest");
```

This tells leaf that the page is a guest page and should not be accesible when the user is logged in. Putting all what we've discussed together should look like this:

```php
require __DIR__ . "/vendor/autoload.php";

// connect to db. You can use autoConnect too
auth()->connect("host", "user", "password", "dbName");
auth()->config("GUARD_HOME", "/dashboard");

app()->get("/auth/login", function() {
  auth()->guard("guest");

  app()->blade->render("login");
});

app()->post("/auth/login", function() {
  auth()->guard("guest");

  list($username, $password) = array_values(app()->request()->get(["username", "email"]));

  // attempt a login
  $user = auth()->login("users", [
    "username" => $username,
    "password" => $password
  ]);

  // if there's a problem with credentials or system
  if (!$user) {
    // render login page
    return app()->blade->render("login", [
      // pass in errors and credentials
      "errors" => auth()->errors(),
      "username" => $username,
      "password" => $password,
    ]);
  }
});
```

## Building Our Register

Registration involves saving the user in the database. From there we can immedietely initialize a session or go to the `GUARD_LOGIN` page so the user signs in. Since we've already configured Leaf Auth, let's just jump right into the code.

```php
app()->post("/auth/register", function() {
  auth()->guard("guest");

  $credentials = request()->get(["username", "email", "password"]);

  // automatically login immedietely the user is created
  auth()->config("SESSION_ON_REGISTER", true);

  $user = auth()->register("users", $credentials, [
    "username", "email"
  ]);

  if (!$user) {
    return app()->blade->render("register", array_merge(
      ["errors" => array_merge(is()->auth->errors()],
      request(["username", "email", "password"]))
    );
  }
});
```

Here, we're creating a handler for our register method, getting the request data we need and saving it in the database using `register`. You might have noticed the 3rd parameter, `["username", "email"]`. This just makes sure that the same username and email don't already exist in the database. Leaf literally does everything for you. We can have a template like this:

```php
<form action="/auth/register" method="post">
  <div class="form-group">
    <input class="form-control" type="text" name="username" placeholder="username" value="{{ $username ?? '' }}">
    <p>{{ $errors['username'] ?? $errors['auth'] ?? null }}</p>
  </div>
  <div class="form-group">
    <input class="form-control" type="email" name="email" placeholder="email" value="{{ $email ?? '' }}">
    <p>{{ $errors['email'] ?? $errors['auth'] ?? null }}</p>
  </div>
  <div class="form-group">
    <input class="form-control" type="password" name="password" placeholder="password" value="{{ $password ?? '' }}">
    <p>{{ $errors['password'] ?? null }}</p>
  </div>
  <button class="btn btn-primary">Register</button>
</form>
```

And with this we've successfully created our register functionality. Read the auth docs for more info on session auth.

Experiment by <a href="https://mychi.netlify.app" style="font-size: 20px; color: #111;" target="_blank">Mychi Darko</a>
