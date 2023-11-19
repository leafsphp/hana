# Leaf Blade

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

[Blade](https://laravel.com/docs/10.x/blade#introduction) is the simple, yet powerful templating engine that is included with Laravel. Unlike some PHP templating engines, Blade does not restrict you from using plain PHP code in your templates. In fact, all Blade templates are compiled into plain PHP code and cached until they are modified, meaning Blade adds essentially zero overhead to your application. Blade template files use the `.blade.php` file extension.

Leaf Blade is a port of the [jenssegers/blade](https://github.com/jenssegers/blade) package that allows you to use blade templates in your Leaf PHP projects.

<VideoDocs
  title="New to Blade?"
  subject="Laravel Tutorial for Beginners #5 - Blade Basics"
  description="This video by The Net Ninja will help you get started with blade."
  link="https://www.youtube.com/embed/pQ2vxa4_f2w"
/>

## Usage with Leaf MVC

Leaf MVC and Leaf API come with blade support out of the box. You can use blade templates in your Leaf MVC and Leaf API projects without any extra configuration.

All you need to do is create a new blade file in your `app/views` folder and you're good to go! You can also create sub-folders in your `app/views` folder to organize your blade files into multiple sections.

You can skip the installation and setup sections if you're using Leaf MVC or Leaf API.

## Usage with Leaf Core

Since Leaf's core doesn't give you any structure, you'll have to set up blade yourself. Don't worry, it's pretty easy. All you need to do is install blade, configure it to match your project's setup and you're good to go.

You can install leaf blade with the Leaf CLI:

```bash
leaf install blade
```

Or with composer:

```bash
composer require leafs/blade
```

After this, you simply need to initialize blade:

```php
$blade = new Leaf\Blade();
```

## The Blade class

The Blade class takes two parameters on initialization. The first is the path to your view files, and the second is the path to your cached files.

```php
use Leaf\Blade;

$blade = new Blade('views', 'storage/cache');
```

If you want to initialize the package with the default settings, you can simply do:

```php
$blade = new Leaf\Blade();
```

And then configure it later using the `configure()` method:

```php
$blade->configure('app/views', 'app/views/cache');
```

## Rendering a blade view

Once you have pointed Blade to the location of your view files, you may easily render them using the `make` method. The `make` method accepts the name of the view file as its first argument, and an array of data as its second argument. The data array will be extracted into variables that may be used within the view file:

```php
echo $blade->make('index', ['name' => 'Michael Darko'])->render();
```

Alternatively you can use the shorthand `render()` method:

```php
echo $blade->render('index', ['name' => 'Michael Darko']);
```

The examples above will look for an `index.blade.php` file in the `views` directory. Within the view, you can access the `name` variable like so:

```html
<!Doctype html>
<html>
    <head>
        <title>{{ $name }}</title>
    </head>
    <body>
        <div class="container">{{ $name }}</div>
    </body>
</html>
```

## Extending Blade

Blade allows you to define custom directives using the `directive()` method. When the Blade compiler encounters the custom directive, it will call the provided callback with the expression that the directive contains. The callback is free to return the value of its contents however you like:

```php
$blade->directive('datetime', function ($expression) {
    return "<?php echo with({$expression})->format('F d, Y g:i a'); ?>";
});
```

Which allows you to use the following in your blade template:

```html
Current date: @datetime($date)
```

The Blade instance passes all methods to the internal view factory. So methods such as exists, file, share, composer and creator are available as well. Check out the [original documentation](http://laravel.com/docs/5.8/blade) for more information.
