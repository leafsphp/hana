# Leaf request

In the previous exercise, we looked at Leaf response. In this one, we'll look at the leaf request object. This is an object which helps us retrieve the information coming into our app. Leaf makes this pretty simple by giving you straightforward methods which you can use pretty easily.

To get started with the request object, <span class="class-mode">you can call the `request` method on the leaf instance or use the `Leaf\Http\Request` class.</span><span class="functional-mode">you can simply call the `request` function from anywhere in your app</span>

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/', function () use($app) {
  $data = $app->request()->get('name');
  $app->response()->json($data);
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
  $data = request()->get('name');
  response()->json($data);
});

// don't forget to call run
app()->run();
```

</div>

For this exercise, we've populated some data which will be passed into your app in the `request.json` file. You can edit this to get different data in your app.

## RETURNING ALL DATA PASSED IN YOUR APP

Leaf allows you to get every bit of data passed into your app all at once. This includes get request data, post request data, url encoded data, files and all of those.

To get all this data, you simply need to call the `body` method. As the name implies, this method returns the entire body of a request.

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/', function () use($app) {
  $data = $app->request()->body();
  $app->response()->json($data);
});

$app->run();
```

</div>
<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  $data = request()->body();
  response()->json($data);
});

app()->run();
```

</div>

You can try this out in the editor.

### GETTING A PARTICULAR ITEM FROM THE REQUEST

Although we have an entire pool of data being passed in, sometimes you need to grab one item, maybe for validation. You can do this simply using the `get` method.

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/', function () use($app) {
  $data = $app->request()->get('name');
  $app->response()->json($data);
});

$app->run();
```

</div>
<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  $data = request()->get('name');
  response()->json($data);
});

app()->run();
```

</div>

Your task is to get the `country` passed into the request.

### MULTIPLE SPECIFIC ITEMS FROM REQUEST

You can retrieve items from the request one by one, but sometimes, you might need particular items from the request for a specific task. Leaf allows you to retrieve all these items using the same `get` method. But instead of passing in a string, you pass an array of items you want to get.

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/', function () use($app) {
  $data = $app->request()->get(['name', 'country']);
  $app->response()->json($data);
});

$app->run();
```

</div>
<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  $data = request()->get(['name', 'country']);
  response()->json($data);
});

app()->run();
```

</div>

In the editor, try retrieving the `country` and `city` fields.
