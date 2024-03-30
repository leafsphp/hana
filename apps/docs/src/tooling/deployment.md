# Production Deployment

Leaf is made to work the same way no matter the environment. This means that if your application works in development, it will work in production. However, this means there are some stuff from development that will show in production if left that way. For this reason, we need to make a few tweaks for the production environment. In this document, we'll cover some great starting points for making sure your Leaf application is deployed properly.

## Turn on Production Mode

Leaf is set to development mode by default, however, there are things like development errors which we don't want to see in production. For this reason, we need to turn on production mode. We can do this simply by updating the leaf configuration.

<div class="functional-mode">

```php
app()->config('debug', false);
```

</div>
<div class="class-mode">

```php
$app->config('debug', false);
```

</div>

## Autoloader Optimization

When deploying to production, make sure that you are optimizing Composer's class autoloader map so Composer can quickly find the proper file to load for a given class:

```bash
composer install --optimize-autoloader
```

::: tip
In addition to optimizing the autoloader, you should always be sure to include a `composer.lock` file in your project's source control repository. Your project's dependencies can be installed much faster when a `composer.lock` file is present.
:::

## Walkthroughs

We're adding some step-by-step walkthroughs to deploying on different providers on our codelabs platform. You can find every experiment related to deployment [here](/codelabs/experiments/deployment/)
