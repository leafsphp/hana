# Sub-routing
<!-- markdownlint-disable no-inline-html -->

Use `app()->mount($baseroute, $fn)` or `app()->group` to mount a collection of routes onto a subroute pattern. The subroute pattern is prefixed onto all following routes defined in the scope. e.g. Mounting a callback $fn onto `/movies` will prefix `/movies` onto all following routes.

```php
app()->mount('/movies', function () {
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

Nesting of subroutes is possible, just define a second `app()->mount()` in the callback function that's already contained within a preceding `app()->mount()`. Also, Note that nested subroutes currently don't support dynamic url patterns, so, you can only do something like this.

```php
app()->group('/user', function () {
    app()->get('/', function () {
        response()->markup('no user id');
    });

    app()->get('/(\d+)', function ($id) {
        response()->markup("user $id");
    });

    app()->mount('/settings', function () {
        app()->get('/privacy', function () {
            response()->markup('Privacy Settings');
        });

        app()->get('/notification', function () {
            response()->markup("Notification Settings");
        });
    });
});
```

## Group Namespaces

You can now select namespaces for individual groups of routes. Usually, a namespace is given to all your routes, however, a group may need a different namespace for it's controllers and that is what Leaf gives you.

```php
app()->setNamespace("App\Controllers");

app()->group("/user", ["namespace" => "Lib\Controllers", function () {
    // controller here will be Lib\Controllers\FormsController
    app()->get("/form", "FormsController@index");
}]);

// controller here will be App\Controllers\FormsController
app()->get("/form", "FormsController@index");
```
