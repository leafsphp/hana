# Container

Leaf provides a simple but powerful dependency injection container. Dependency injection is a fancy phrase that essentially means this: class dependencies are "injected" into the class via Leaf's "setter" methods.

## Adding Dependencies

Basically, leaf's dependency container basically adds a function or class to the leaf object so you can call it from anywhere in your app. Let's look at an example.

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->register('something', function ($c) {
  return new Something();
});
```

</div>
<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->register('something', function ($c) {
  return new Something();
});
```

</div>

And the registered item `something` will be referenced like this:

<div class="class-mode">

```php
$app->something->doSomething();
```

</div>
<div class="functional-mode">

```php
app()->something->doSomething();
```

</div>

In the example above, we set the `something` property on our app using leaf's `register` method.
