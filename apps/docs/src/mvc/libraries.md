# Custom Libraries

Sometimes you might want to write some application logic that doesn't fit into a controller, model, or helpers. It makes sense to create a custom library for this functionality. For example, you might want to create a library that calculates the distance between two points on a map. You could then use this library in any controller, helper, or view. Leaf MVC and Leaf API both come with a `lib` folder where you can store your custom libraries.

Custom libraries are not stored in the `app` folder because they are not part of the application's core functionality. They are more like helpers, however, unlike helpers they can be full classes, functions or just data structures and also require no structured namespace.

## Autoloading Libraries

Leaf MVC and Leaf API will only automatically load your libraries for you if you tell it to do so. You can do this by **uncommenting** the following line in your `public/index.php` file:

```php
//  \Leaf\Core::loadLibs();
```

Once you do so, you can start creating your own libraries.

## Creating a Library

To create a library, simply create a new file in the `lib` folder. For example, let's create a library called `Math.php`:

```php
<?php

namespace MyRandom\Name\Space;

class Math {
  public static function add($a, $b) {
    return $a + $b;
  }
}
```

## Using a Library

To use a library, you must first import it. You can then use it like any other class. For example, let's import the `Math` library we created above:

```php
<?php

namespace App\Controllers;

use MyRandom\Name\Space\Math;

class HomeController extends Controller {
  public function index() {
    $sum = Math::add(1, 2);
    echo view('home', ['sum' => $sum]);
  }
}
```

## Library Structure

As mentioned above, libraries can be just about anything. They are completely based on your own preference. However, it is recommended that you keep your libraries as simple as possible. Below is the same `Math` library from above, but this time it is a simple function instead of a class:

```php
<?php

namespace Lib;

function add($a, $b) {
  return $a + $b;
}
```

You can then use this library like so:

```php
<?php

namespace App\Controllers;

use function Lib\add;

class HomeController extends Controller {
    public function index() {
        $sum = add(1, 2);
        echo view('home', ['sum' => $sum]);
    }
}
```
