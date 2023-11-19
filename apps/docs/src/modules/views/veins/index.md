# Leaf Veins

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

Veins is a view engine shipped with Leaf v1. It has a perfect balance of simplicity and power as well as speed and flexibility. For those who have used **Smarty** before, this will be really easy to get used to.

<details>
<summary>New to template engines?</summary>

Watch this video by Dave Hollingworth as an introduction to template engines.

<VideoDocs
  title="Templating engines in PHP"
  subject="Templating engines in PHP: what they are and how they can improve your code"
  description="Learn how using a template engine can improve your view files with simpler syntax, autoescaping of variables and template inheritance."
  link="https://www.youtube.com/embed/OK_JCtrrv-c"
/>
</details>

## Installation

To add veins to your project simply run the command:

```bash
leaf install veins
```

Or with composer:

```bash
composer require leafs/veins
```

## Usage with Leaf

To use veins in a Leaf app, you need to attach veins to the Leaf view handler. This is done by adding the following code to your `app.php` file.

```php
Leaf\View::attach(Leaf\Veins::class);
```

From there, you can use the `veins` property on the `app` object to render your veins files.

```php
app()->veins->render('home');
```

## Usage without Leaf

To use veins outside of a Leaf app, you need to initialize the `Leaf\Veins` class after installing it.

```php
$veins = new Leaf\Veins();
```

You can then call any of the methods on the `Leaf\Veins` class to render your veins files.

```php
$veins->render('home');
```

## Configuration

Veins has a few configuration options that you can set. You can set these options using the `configure` method. The options are:

- `charset` - The character set for your templates, default: `UTF-8`
- `debug` - Show debug errors, default: `false`
- `templateDir` - Directory to look for Vein templates, default: `views/`
- `cacheDir` - Directory to hold compiled templates, default: `cache/`
- `phpEnabled` - Whether to allow raw PHP in templates, default: `false`
- `autoEscape` - Whether to sanitize variables or not, default: `true`
- `removeComments` - Whether to html comments or not, default: `false`

```php
$app->veins->configure([
  'templateDir' => 'views/',
  'cacheDir' => 'views/cache/'
]);
```

## Creating your views

In the config above, we set the `templateDir` to `views/`. This means that Veins will look for all your views in the `views/` directory. So if we want to create a view called `homepage`, we'd create a file called `homepage.vein.html` in the `views/` directory.

Note that Veins uses a `.vein.html` file extension for it's views.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Veins</title>
</head>
<body>
  <h1>Hello, {$name}!</h1>
</body>
</html>
```

**Note the `{$name}` variable in the view.** We'll get to that in a bit.

## Rendering your views

To render your views, you can use the `render` method. The `render` method takes in the name of the view to render and an optional array of variables to pass to the view.

```php
$app->veins->render('homepage', ['name' => 'Leaf User']);
```

This will render the view and pass the `name` variable to the view. The `name` variable can then be used in the view. So basically, you can pass variables to your views using the `render` method.

## Vein Template Syntax

Veins uses a simple syntax for it's views. The syntax is similar to that of Smarty. Let's look at some of the syntaxes.

### Variables

```html
{$variable}
{$object->key}
{$array.key}
{$array['key']}
```

### Constants

```html
{#constant#}
```

### Function

```html
{function="function"}
```

### Include

```html
{include="templateName"}
```

### No parse

Commenting in Vein

```html
{noparse}
  code
{/noparse}
```

### Loops

```html
{loop="$items" as $item}
  <div style="margin-bottom: 50px;">
    <h3><a href="/items/{$item->id}">{$item->title}</a></h3>
    <p>{$item->body}</p>
  </div>
{/loop}
```

Or

```html
{loop="$items"}
  <div style="margin-bottom: 50px;">
    <h3><a href="/items/{$value->id}">{$value->title}</a></h3>
    <p>{$value->body}</p>
  </div>
{/loop}
```

### If

```html
{if="count($posts) > 0"}
  All Posts
{/if}
```

### If else

```html
{if="count($posts) > 0"}
  All Posts
{else}
  There are no posts
{/if}
```

### AutoEscape

This has a lot of uses, but the most common use case is for rendering raw HTML

```php
$app->veins->set([
  "post" => [
    "body" => "<h2>This is the body</h2>"
  ]
]);
```

```html
{autoescape="off"}
  {$post.body}
{/autoescape}
```
