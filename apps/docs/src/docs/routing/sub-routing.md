# Sub-routing
<!-- markdownlint-disable no-inline-html -->

Sub-routing is the idea of grouping your routes into smaller groups. This is useful when you want to group your routes into different sections. For example, you can group all your admin routes into a group called `admin` and all your user routes into a group called `user`.

There are many benefits to this, one of which is that you can easily prefix your routes with a path. For example, you can prefix all your admin routes with `/admin` and all your user routes with `/user`. You can also add shared middleware to a group of routes.

## Creating a route group

Leaf router provides a `group()` method which allows you to create a group of routes. The `group` method accepts two parameters, the first is the path to the group and the second is a callback function which contains all the routes in the group.

The path to the group is the prefix that will be added to all the routes in the group. For example, if you create a group with the path `/admin`, all the routes in the group will be prefixed with `/admin`. **If you want to opt out of the prefix for a route group, you can set the group path to `/`.**

<div class="functional-mode">

```php
app()->group('/movies', function () {
  // will result in '/movies/'
  app()->get('/', function () {
    echo 'movies overview';
  });

  // will result in '/movies/id'
  app()->get('/(\d+)', function ($id) {
    echo 'movie id ' . htmlentities($id);
  });
});
```

</div>
<div class="class-mode">

```php
$app->group('/movies', function () use($app) {
  // will result in '/movies/'
  $app->get('/', function () {
    echo 'movies overview';
  });

  // will result in '/movies/id'
  $app->get('/(\d+)', function ($id) {
    echo 'movie id ' . htmlentities($id);
  });
});
```

</div>

## Nesting Groups

Nesting of subroutes is possible, just define a second `group()` in the callback function that's already contained within a preceding `group()`.

<div class="functional-mode">

```php{2,12}
// parent group
app()->group('/user', function () {
  app()->get('/', function () {
    response()->markup('no user id');
  });

  app()->get('/(\d+)', function ($id) {
    response()->markup("user $id");
  });

  // sub group here
  app()->group('/settings', function () {
    // will result in '/user/settings/privacy'
    app()->get('/privacy', function () {
      response()->markup('Privacy Settings');
    });

    app()->get('/notifications', function () {
      response()->markup("Notification Settings");
    });
  });
});
```

</div>
<div class="class-mode">

```php{2,12}
// parent group
$app->group('/user', function () use($app) {
  $app->get('/', function () use($app) {
    $app->response()->markup('no user id');
  });

  $app->get('/(\d+)', function ($id) use($app) {
    $app->response()->markup("user $id");
  });

  // sub group here
  $app->mount('/settings', function () use($app) {
    // will result in '/user/settings/privacy'
    $app->get('/privacy', function () use($app) {
      $app->response()->markup('Privacy Settings');
    });

    $app->get('/notifications', function () use($app) {
      $app->response()->markup('Notification Settings');
    });
  });
});
```

</div>

## Group Namespaces

When using controllers, Leaf allows you to set a global namespace for all your controllers. The problem with this is that you can't have different namespaces for different groups of routes, and that's where group namespaces come in.

Leaf allows you to set a namespace for a group of routes. This means that all controllers in that group will be prefixed with the namespace you set for that group **instead of the global namespace**. This is useful when you want to have different namespaces for different groups of routes.

<div class="functional-mode">

```php
app()->setNamespace('App\Controllers');


app()->group('/user', ['namespace' => 'App\Controllers\Users', function () {
    // controller here will be App\Controllers\Users\FormsController
    app()->get('/form', 'FormsController@index');
}]);


app()->group('/admin', ['namespace' => 'App\Controllers\Admins', function () {
    // controller here will be App\Controllers\Admins\FormsController
    app()->get('/form', 'FormsController@index');
}]);


// controller here will be App\Controllers\FormsController
app()->get('/form', 'FormsController@index');
```

</div>
<div class="class-mode">

```php
$app->setNamespace('App\Controllers');


$app->group('/user', ['namespace' => 'App\Controllers\Users', function () use($app) {
    // controller here will be App\Controllers\Users\FormsController
    $app->get('/form', 'FormsController@index');
}]);


$app->group('/admin', ['namespace' => 'App\Controllers\Admins', function () use($app) {
    // controller here will be App\Controllers\Admins\FormsController
    $app->get('/form', 'FormsController@index');
}]);


// controller here will be App\Controllers\FormsController
$app->get('/form', 'FormsController@index');
```

</div>

For more info on controllers, you can [check out the controller docs](/docs/routing/controller).

## Group Middleware

You can also add middleware to a group of routes. This means that all routes in that group will be passed through the middleware you set for that group. This is useful when you want to add middleware to a group of routes.

<div class="functional-mode">

```php
$middleware = function () {
  // some middleware operation here
};

app()->group('/user', ['middleware' => $middleware, function () {
  app()->get('/', function () {
    response()->markup('no user id');
  });

  app()->get('/(\d+)', function ($id) {
    response()->markup("user $id");
  });
}]);
```

</div>
<div class="class-mode">

```php
$middleware = function () {
  // some middleware operation here
};

$app->group('/user', ['middleware' => $middleware, function () use($app) {
  $app->get('/', function () use($app) {
    $app->response()->markup('no user id');
  });

  $app->get('/(\d+)', function ($id) use($app) {
    $app->response()->markup("user $id");
  });
}]);
```

</div>

You can also use named middleware in a group of routes. This means that all routes in that group will be passed through the named middleware you set for that group. This is useful when you want to add named middleware to a group of routes.

<div class="functional-mode">

```php
app()->group('/user', ['middleware' => 'auth', function () {
  app()->get('/', function () {
    response()->markup('no user id');
  });

  app()->get('/(\d+)', function ($id) {
    response()->markup("user $id");
  });
}]);
```

</div>

<div class="class-mode">

```php
$app->group('/user', ['middleware' => 'auth', function () use($app) {
  $app->get('/', function () use($app) {
    $app->response()->markup('no user id');
  });

  $app->get('/(\d+)', function ($id) use($app) {
    $app->response()->markup("user $id");
  });
}]);
```

</div>
