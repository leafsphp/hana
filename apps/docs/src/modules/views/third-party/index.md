# Using third-party templates

In the [previous section](/modules/views/), we talked about the template engines that Leaf supports as modules. However, you can use any template engine you want with the framework. In this section, we will show you how to use the [Smarty](https://www.smarty.net/) template engine with Leaf.

## Install your engine

To install Smarty, run the following command in your terminal:

```bash
composer require smarty/smarty
```

## Usage with Leaf Core

Usage with Leaf's core is as straightforward as it gets. All you need to do is create a new instance of Smarty and use it as you would normally use it.

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$smarty = new Smarty();
$smarty->setTemplateDir('/some/template/dir');
$smarty->setConfigDir('/some/config/dir');
$smarty->setCompileDir('/some/compile/dir');
$smarty->setCacheDir('/some/cache/dir');

// where you want to display the template
$smarty->assign('name', 'Ned');
$smarty->display('index.tpl');
```

## Attaching your engine to Leaf

Leaf comes with a view manager, that makes Leaf aware of any template engine you want to use. To attach Smarty to Leaf, you need to call the `attach` method on the view manager. You can do this in your `index.php` file:

```php
<?php

require __DIR__ . '/vendor/autoload.php';

\Leaf\View::attach(Smarty::class);
```

From here, you can use it from anywhere in your app on the View manager:

```php
<?php

require __DIR__ . '/vendor/autoload.php';

\Leaf\View::attach(Smarty::class);

// where you want to display the template
\Leaf\View::smarty()->assign('name', 'Ned');
\Leaf\View::smarty()->display('index.tpl');
```

## Using with Leaf MVC

When using Leaf MVC and Leaf API, you can attach Smarty to Leaf in your `public/index.php` file. This step is important because Leaf MVC and Leaf API come with a `view()` helper that you can use to render your templates. Registering Smarty with Leaf will make the `view()` helper aware of Smarty.

```php
\Leaf\View::attach(Smarty::class);
```

Now that you have Smarty attached to Leaf, all you need to do is head over to our view config file and replace the default template engine with Smarty. We can do this by changing the `engine` key in the `views` array to `smarty`:

```php
<?php

use Leaf\View;

return [
    /*
    |--------------------------------------------------------------------------
    | Template Engine [EXPERIMENTAL]
    |--------------------------------------------------------------------------
    |
    | Leaf MVC unlike other frameworks tries to give you as much control as
    | you need. As such, you can decide which view engine to use.
    |
    */
    'viewEngine' => Smarty::class,

    /*
    |--------------------------------------------------------------------------
    | Custom config method
    |--------------------------------------------------------------------------
    |
    | Configuration for your templating engine.
    |
    */
    'config' => function ($config) {
        View::smarty()->setTemplateDir($config['views']);
        View::smarty()->setConfigDir('/some/config/dir');
        View::smarty()->setCompileDir('/some/compile/dir');
        View::smarty()->setCacheDir($config['cache']);
    },

    /*
    |--------------------------------------------------------------------------
    | Custom render method
    |--------------------------------------------------------------------------
    |
    | This render method is triggered whenever render() is called
    | in your app if you're using a custom view engine.
    |
    */
    'render' => function ($view, $data) {
        foreach ($data as $key => $value) {
            View::smarty()->assign($key, $value);
        }

        View::smarty()->display($view);
    }),
];
```

From the Smarty docs:

> Smarty requires four directories which are by default named templates, configs, templates_c and cache relative to the current working directory.

This is why we set the `setTemplateDir` and `setCacheDir` to the `views` and `cache` directories respectively.

The function passed to the `render` key is called whenever the `render()` or `view()` helpers are called. This function is responsible for rendering the template. In this case, we are assigning the data passed to the `render()` or `view()` helper to the template and then displaying the template.
