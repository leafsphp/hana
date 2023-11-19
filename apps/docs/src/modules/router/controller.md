---
title: "Using Controllers"
---

# Using Controllers
<!-- markdownlint-disable no-inline-html -->

Controllers are simply classes that serve as bridges between Models and the View part of your application. Don't think too much of controllers, they're nothing but a class.

In this section, we'll be looking at how to handle a route with a controller. So let's make an example controller: **remember it's just a php class**

```php
<?php
class HomeController {
  public function index() {
    echo "This is the index function";
  }
}
```

To handle a route using this controller, we'll have to import the controller, and then define a simple route

```php
$app = new Leaf\App;

require "HomeController.php";

// we leave out the second parameter for now
$app->get("/home");
```

When using controllers, instead of defining a closure or function as the second parameter of your route, you rather pass in a string of the controller's class name and the function you want to use. In this case, `"HomeController@index"`, so remember, it's `Class@Method`

```php
$app = new Leaf\App;

require "HomeController.php";

$app->get("/home", "HomeController@index");
```

## Controller Namespaces

In case you're using an auto loader or using leaf in another framework and  you have your controllers in another directory, you can do sommething like this

```php
$app->get('/(\d+)', '\App\Controllers\User@showProfile');
```

But this gets tedious if you have a lot of routes. So Leaf allows you to set a "general" namespace, you can set the default namespace to use on your router instance via `setNamespace()`

```php
$app->setNamespace('\App\Controllers');

$app->get('/users/(\d+)', 'User@showProfile');
$app->get('/cars/(\d+)', 'Car@showProfile');
```

## Resource Controller

Resource Controllers contain methods to handle CRUD functionality.

```php
<?php

use Leaf\Controller;
use Leaf\Http\Request;

class ClassName extends Controller {
    public function __construct() {
        parent::__construct();
        $this->request = new Request;
    }

    /**
     * Display a listing of the resource.
     */
    public function index() {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store() {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {
        //
    }
}
```
