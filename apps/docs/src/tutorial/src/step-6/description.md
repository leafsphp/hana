# Dynamic routing

Most modern APIs use a lot of patterns including routing patterns. When you look at a webapp like twitter, you'll notice that every user has his/her own url, like `twitter.com/leafphp` or `twitter.com/mychidarko`. You might wonder how twitter has a page for every single user. Do they build every single page or is there some trick to it? Well, the answer is dynamic routing.

Instead of having a static url like `leafphp.dev/modules/`, we can have a part of the url which behaves like a variable. This means that any value can be passed in there, and we'll load some data based on that. Although this sounds super complex, leaf makes it really easy to do this.

In your route definition, simply add a value in curly braces. That's it! Let's look at an example:

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/users/{id}', function () use($app) {
  $app->response()->markup('hello world');
});

$app->run();
```

</div>
<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/users/{id}', function () {
  response()->markup('hello world');
});

app()->run();
```

</div>

In the example above, we defined a route that takes in a user id, so we can do something like `/users/1`. Try this out in the editor.

::: tip Note
Remember to configure the route to run in the `request.json` file.
:::

You can try `/users/anything` and you'll see that the route still works. The route will output `hello world`, but you might be asking how we actually get the dynamic item in the route. That's also simple. Leaf automatically creates a variable available in handling function for your route. Let's look at how this works:

<div class="class-mode">

```php{7}
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/users/{id}', function ($id) use($app) {
  $app->response()->markup("This is user $id");
});

$app->run();
```

</div>
<div class="functional-mode">

```php{5}
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/users/{id}', function ($id) {
  response()->markup("This is user $id");
});

app()->run();
```

</div>

Note that we passed the dynamic value as a variable into the handling function: `function ($id)`. `$id` will now hold the data which the user passes into that field. Now, if we run this in the editor, our output will be `this is user 1` or anything you pass into the route.

Now try recreating the twitter experience in the editor. Create a route that takes in a dynamic username. When this route is run, output the username that was passed into the url.

## URLS WITH MULTIPLE DYNAMIC PARTS

In some cases, your URL may have multiple dynamic parts. For example, you may want to have a route that takes in a username and a post id. This is also possible with Leaf. Let's look at how this works:

<div class="class-mode">

```php{7}
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/users/{userId}/posts/{postId}', function ($userId, $postId) use($app) {
  $app->response()->markup("Post #$postId was created by user #$userId");
});

$app->run();
```

</div>
<div class="functional-mode">

```php{5}
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/users/{userId}/posts/{postId}', function ($userId, $postId) {
  response()->markup("Post #$postId was created by user #$userId");
});

app()->run();
```

</div>

As shown above, you can have as many dynamic parts as you want. Leaf will automatically create a variable for each dynamic part in the route. You can then use these variables in your handling function. Try this out in the editor.

## LIMITING DYNAMIC URLS TO PARTICULAR TYPES

Using the 1st example, we actually expect the user to pass in a user id. For this example, let's say the user id is a **number**. If you pass in text, this will still work. You can try that out in the editor. Text is seen as valid input, but we only want to support numbers. For situations like this, leaf allows you to use <a href="/docs/routing/dynamic.html#pcre-based-params" target="_blank">PCRE-patterns</a> for your dynamic routes instead of the normal values which allow everything.

Basically, PCRE based routes contain dynamic parts which can vary per request. The varying parts are named subpatterns and are defined using regular expressions. Commonly used PCRE-based subpatterns within Dynamic Route Patterns are:

- \d+ = One or more digits (0-9)
- \w+ = One or more word characters (a-z 0-9 _)
- [a-z0-9_-]+ = One or more word characters (a-z 0-9 _) and the dash (-)
- .* = Any character (including /), zero or more
- [^/]+ = Any character but /, one or more

::: tip Note
The <a href="https://courses.cs.washington.edu/courses/cse154/12au/cheat-sheets/php-regex-cheat-sheet.pdf" target="_blank">PHP PCRE Cheat Sheet</a> might come in handy.
:::

Let's see how we can make sure that our route in the first example only supports numbers:

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/users/(\d+)', function ($id) use($app) {
  $app->response()->markup("The number passed in is: $id");
});

$app->run();
```

</div>
<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/users/(\d+)', function ($id) {
  response()->markup("The number passed in is: $id");
});

app()->run();
```

</div>

Now if a string is passed into that route, you'll receive a 404 instead of seeing the text we defined. You can try this out in the editor. Don't forget to add the url in the `request.json` file.

Your task this time is to modify your username example to use PCRE based patterns.
