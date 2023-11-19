<!-- markdownlint-disable no-inline-html -->
# Core Controller

Instead of defining all of your request handling logic as Closures in route files, you may wish to organize this behavior using Controller classes. Controllers can group related request handling logic into a single class.

## Defining Controllers

Below is an example of a basic controller class. Note that the controller extends the base controller class included with Leaf(`Leaf\Controller`). The base class provides a few convenience methods
<!-- such as the middleware method, which may be used to attach middleware to controller actions: -->

```php
<?php

// this is a model, view the model docx for more info
require 'User.php';

use Leaf\Controller;

class UserController extends Controller
{
  /**
   * Show the profile for the given user.
   *
   * @param  int  $id
   * @return View
   */
  public function show($id)
  {
    $this->set('user', User::findOrFail($id));
    $this->render('profile');
  }
}
```

You can define a route to this controller action like so:

```php
$app->get('user/{id}', 'UserController@show');
```

Now, when a request matches the specified route URI, the `show` method on the `UserController` class will be executed. The route parameters will also be passed to the method.

> Controllers are **not** required to extend a base class. However, you will not have access to convenient features provided by Leaf Model
<!-- such as the middleware, validate, and dispatch methods. -->

## Base Controller Features

### Default Templating

Using the core controller, you already have access to templating with [Leaf Veins](/modules/views/veins/). You can simply configure and render your template whenever you want to.

```php
use Leaf\Controller;

class NameController extends Controller {
  // configure as soon as controller is invoked
  public function __construct() {
    $this->veins->configure([
      'veins_dir' => 'app/views/',
      'cache_dir' => 'app/views/build/'
    ]);
  }

  public function index() {
    // set template data
    $this->set([
      'name' => 'Mychi'
    ]);
    // render your template
    $this->render('index'); // refers to index.vein in the veins_dir
  }
}
```

You can view more info on Veins [here](/modules/views/veins/)

### Responses

Leaf Core controller contains methods to appropriately return data to the user.

**respond:**

```php
use Leaf\Controller;

class NameController extends Controller {
  public function index() {
    $this->respond([
      'message' => 'hello'
    ]);
  }
}
```

You can view more on responses [here](/modules/http/v/2/response)

### file_upload

file_upload is for simple file uploads. It takes in 3 parameters, the path to save the file, the file and the file type(optional). It returns an array `[true, $filename]` if successful and `[false, $error]` if the upload fails.

```php
use Leaf\Controller;

class NameController extends Controller {
  public function index() {
    $profilePic = $_FILES['profile_pic'];
    // file upload
    $this->file_upload('./images/', $profilePic);
    // file upload with file type
    $this->file_upload('./images/', $profilePic, 'image');
  }
}
```

### Forms

The base controller also gives you a simple way to handle form data

```php
public function index() {
  $name = $this->form->get('name');

  $this->validate([
    'name' => 'text'
  ]);
}
```

Read more on Leaf Forms [here](/modules/forms/)
