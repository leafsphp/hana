# Sub-folder support
<!-- markdownlint-disable no-inline-html -->

## Overview

Out-of-the box Leaf's Core router will run in any (sub)folder you place it into … no adjustments to your code are needed. You can freely move your entry script index.php around, and the router will automatically adapt itself to work relatively from the current folder's path by mounting all routes onto that basePath.

Say you have a server hosting the domain www.example.org using public_html/ as its document root, with this little entry script index.php:

<div class="functional-mode">

```php
app()->get('/', function () { echo 'Index'; });
app()->get('/hello', function () { echo 'Hello!'; });
```

</div>
<div class="class-mode">

```php
$app->get('/', function () { echo 'Index'; });
$app->get('/hello', function () { echo 'Hello!'; });
```

</div>

- If your were to place this file (along with its accompanying .htaccess file or the like) at the document root level (e.g. public_html/index.php), Leaf's Core router will mount all routes onto the domain root (e.g. /) and thus respond to [https://www.example.org/](https://www.example.org/) and [https://www.example.org/hello](https://www.example.org/hello).

- If you were to move this file (along with its accompanying .htaccess file or the like) into a subfolder (e.g. public_html/demo/index.php), Leaf's Core router will mount all routes onto the current path (e.g. /demo) and thus repsond to [https://www.example.org/demo](https://www.example.org/demo) and [https://www.example.org/demo/hello](https://www.example.org/demo/hello). There's no need for `$app->mount(…)` in this case.

## Disabling subfolder support

In case you don't want Leaf's Core router to automatically adapt itself to the folder its being placed in, it's possible to manually override the basePath by calling `setBasePath()`. This is necessary in the (uncommon) situation where your entry script and your entry URLs are not tightly coupled (e.g. when the entry script is placed into a subfolder that does not need be part of the URLs it responds to)..

<div class="functional-mode">

```php
// Override auto base path detection
app()->setBasePath('/');

app()->get('/', function () { echo 'Index'; });
app()->get('/hello', function () { echo 'Hello!'; });

app()->run();
```

</div>
<div class="class-mode">

```php
// Override auto base path detection
$app->setBasePath('/');

$app->get('/', function () { echo 'Index'; });
$app->get('/hello', function () { echo 'Hello!'; });

$app->run();
```

</div>

If you were to place this file into a subfolder (e.g. public_html/some/sub/folder/index.php), it will still mount the routes onto the domain root (e.g. /) and thus respond to [https://www.example.org/](https://www.example.org/) and [https://www.example.org/hello](https://www.example.org/hello) (given that your .htaccess file – placed at the document root level – rewrites requests to it)
