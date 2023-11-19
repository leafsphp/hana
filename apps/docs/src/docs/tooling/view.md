# Leaf View

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

<!-- <VideoDocs
  subject="Watch the views guide on youtube"
  description="Learn how to use views in leaf PHP."
  link="https://www.youtube.com/embed/BTcUgeOZLyM"
/> -->

Leaf is very flexible when it comes to views. Leaf allows you to use any templating engine you want, and even use multiple engines at the same time. To keep track of all these engines, Leaf provides a view manager, which allows you to register, configure and use as many templating engines as you want within your app.

This is useful when you want to ship your app with various engines, or rewrite your UIs with a different engine without having to translate or pull down the whole app first.

Leaf view also allows you to run multiple instances of the same engine, with different configurations, values and all that.

## Getting Started

Leaf View is a part of the Leaf core, so you don't need to install anything to use it. It allows you to attach view engines to your leaf app, and use them anywhere in your app.

## Attaching View Engines

Leaf View comes with an `attach` method that allows you to link UI engines to your leaf app. It takes in 2 parameters:

- The UI engine class to attach (required)
- The key to save the engine as (optional). If it's not provided, it will use the class name.

<div class="class-mode">

```php
Leaf\View::attach(\Leaf\Veins::class, 'veinsEngine');
Leaf\View::attach(\Leaf\Blade::class);
```

</div>
<div class="functional-mode">

```php
Leaf\View::attach(\Leaf\Veins::class, 'veinsEngine');
Leaf\View::attach(\Leaf\Blade::class);
```

</div>

We recommend doing this before initializing your leaf app, but you can attach engines at any time.

## Using Attached Views

Once you've attached your view engine, it is automatically linked to the Leaf instance and can be used like this:

<div class="class-mode">

```php
Leaf\View::attach(\Leaf\Veins::class, 'veinsEngine');
Leaf\View::attach(\Leaf\Blade::class);

$app = new Leaf\App;

$app->veinsEngine->render('page');
echo $app->blade->render('page');
```

</div>
<div class="functional-mode">

```php
Leaf\View::attach(\Leaf\Veins::class, 'veinsEngine');
Leaf\View::attach(\Leaf\Blade::class);

app()->veinsEngine->render('page');
echo app()->blade->render('page');
```

</div>

## Using without the Leaf instance

If you don't want to set up your engine to the Leaf instance, you can still use it on the View class:

<div class="class-mode">

```php
View::attach(\Leaf\Veins::class);

// veins() becomes available after attaching it
View::veins()->configure([
  'templateDir' => 'views/',
  'cacheDir' => 'views/cache/'
]);
```

</div>
<div class="functional-mode">

```php
View::attach(\Leaf\Veins::class);

// veins() becomes available after attaching it
View::veins()->configure([
  'templateDir' => 'views/',
  'cacheDir' => 'views/cache/'
]);
```

</div>
