# Leaf Anchor
<!-- <Badge text="new" /> -->

<div style="display:flex;">

[![Latest Stable Version](https://poser.pugx.org/leafs/anchor/v/stable)](https://packagist.org/packages/leafs/anchor)

[![Total Downloads](https://poser.pugx.org/leafs/anchor/downloads)](https://packagist.org/packages/leafs/anchor)

[![License](https://poser.pugx.org/leafs/anchor/license)](https://packagist.org/packages/leafs/anchor)

</div>

Leaf anchor is a new module which contains basic security features for the leaf framework. This module is actively being developed and will be updated whenever a security vulnerability is discovered.

::: danger NOTE
The whole of leaf 3 and some of it's modules rely on this particular module. In case of updates, you **might** need to update the packages that rely on this module to receive the security updates.
:::

## Installation

::: warning
There is no need to manually add the anchor module if you're using Leaf 3 since this is done for you automatically.
:::

You can quickly and simply install Leaf anchor through composer or the leaf cli.

```bash
composer require leafs/anchor
```

or with the leaf cli:

```bash
leaf install anchor
```

From there you can use the `Leaf\Anchor` class.

## Base XSS protection

Attackers pass executable scripts into your application through input fields, urls, ... These scripts are then executed and perform whatever action the attacker needs. To prevent this, you will need to sanitize your data to make sure PHP treats them as nothing more than text.

The `sanitize` on leaf anchor handles all of this for you so you don't have to worry about escaping them.

```php
<?php

require __DIR__ . "/vendor/autoload.php";

$data = $_POST["data"];
$data = Leaf\Anchor::sanitize($data);

echo $data;
```

This also works on arrays

```php
<?php

require __DIR__ . "/vendor/autoload.php";

$data = Leaf\Anchor::sanitize($_POST);

echo $data["input"];
```
