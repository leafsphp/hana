# Intro to creating routes

At the core of Leaf is a carefully crafted router which allows you declaratively define routes without the tons of configuration seen in other frameworks. Since the router is integrated with leaf on a core level, it is initialized together with leaf and is available in functional mode as well.

Defining a route is pretty straight forward: tell leaf the methods which should be allowed to access the route you're defining. This can be done with **`match`**. This method takes in the [HTTP methods](https://restfulapi.net/http-methods/) which should be able to access that route, the [route path](https://www.toolsqa.com/rest-assured/rest-routes/) and the handler for that route. The handler is a function which you define yourself. Let's look at an example:

<div class="class-mode">

```php{7-9}
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->match('GET', '/', function () {
  echo "Something nice";
});
```

</div>
<div class="functional-mode">

```php{5-7}
<?php

require __DIR__ . '/vendor/autoload.php';

app()->match('GET', '/', function () {
  echo "Something nice";
});
```

</div>

One thing to note is that after defining all your routes, you need to call the **`run`** method. This method dispatches all the routes and makes them available to run.

<div class="class-mode">

```php{7-9}
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->match('GET', '/', function () {
  echo "Something nice";
});

$app->run();
```

</div>
<div class="functional-mode">

```php{5-7}
<?php

require __DIR__ . '/vendor/autoload.php';

app()->match('GET', '/', function () {
  echo "Something nice";
});

app()->run();
```

</div>

On the right, you have a structure which has an empty slot for your routes. Try to create a route for the `/` path using the `match` method. **Replace `// 1. match route here` with your `match` route**

## THE ROUTE PATH

Usually route paths are descriptive and give you an idea of what that route is doing. For instance, a login route is usually `/login` or `/auth/login`. After successfully running your route above, your next task is to change the route path to anything of your choice.

::: tip Watch out
When you're running a route other than the `/` route, you'll need to tell the editor which path you want to run. You can do this by editing the `path` option in the `request.json` file in the editor. This is not part of Leaf but is required to tell the editor what to do.
:::

## ADD MULTIPLE ROUTE METHODS

Some routes may be accessible with say, GET and POST requests. Leaf allows you to create routes with support for multiple http methods. You probably used only `GET` in your code above, but you can pass multiple http methods separated by `|`. So for both GET and POST, you'll have `GET|PUT`.

<div class="class-mode">

```php
$app->match('GET|POST', '/', function () {
  echo "works with both get and post";
});
```

</div>
<div class="functional-mode">

```php
app()->match('GET|POST', '/', function () {
  echo "works with both get and post";
});
```

</div>

Your task this time is to create a route which supports both POST and PUT requests.

## RUNNING YOUR ROUTES

If you are to simply add your routes and use the Run button, the editor will always run the **`/`** route. To change that, open the **`request.json`** file in the editor and change the **`path`** option to the path you want to run. For instance, if you want to run the **`/login`** route, you'll have:

```json
{
  ...
  "path": "/login",
  ...
}
```

The same thing applies to the Http `method` you want to run.
