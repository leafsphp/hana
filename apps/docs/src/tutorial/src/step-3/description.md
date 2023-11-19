# Creating routes using shortcuts

We saw in the previous tutorial how to create routes on the base level with leaf, however, it get annoying typing `GET` or `POST` in front of every route over and over again. To get rid of this pain, leaf has shortcut methods which provide a crisp and simple way to create and use routes.

This method allows you to call an [HTTP method](https://restfulapi.net/http-methods/) directly on the leaf/leaf router instance. Let's look at an example:

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/', function () {
  echo "Something nice";
});

// don't forget to call run
$app->run();
```

</div>
<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

// for a get request
app()->get('/', function () {
  echo "Something nice";
});

// for a post request
app()->post('/', function () {
  echo "Something nice";
});

// don't forget to call run
app()->run();
```

</div>

Just like in the last exercise, we have empty slots for your routes. Create a route for the `/` path which uses the PUT HTTP method. **Replace `// 1. put route here` with your route**

## THE ROUTE PATH

Just as we did in the last exercise, you can pass in a custom route into these shortcut methods. Your task this time is to create a PATCH request using a custom path.

::: tip Watch out
When you're running a route other than the `/` route, you'll need to tell the editor which path you want to run. You can do this by editing the `path` option in the `request.json` file in the editor. This is not part of Leaf but is required to tell the editor what to do.
:::
