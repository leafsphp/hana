# Aloe CLI: Getting Started

::: tip Note
If you're using Leaf MVC or Leaf API, you can skip this page.
:::

Aloe CLI is a smart CLI that takes care of a lot of a whole lot of time consuming tasks during your development, allowing you to focus only on important stuff.

**Aloe is based on the symfony console, with that, all symfony commands are also valid aloe commands and can be called through the aloe cli.**

*Currently, Aloe is only fully supported by Leaf MVC and Leaf API, as some commands may not work on other setups.*

For better support if you're not using Leaf MVC or Leaf API, you'll need to install Leaf MVC Core which contains all of Leaf's MVC utilities including a special autoloader and configuration...

```bash
leaf install mvc-core
```

Or with composer:

```bash
composer require leafs/mvc-core
```

## Installation

After installing MVC Core, you can install Aloe with leaf CLI.

```bash
leaf install aloe
```

Or with composer:

```bash
composer require leafs/aloe
```

## Setup

After installing aloe, you need to set it up so you can run commands like `php leaf ...`. To do this, simply create a file with the name you want to run in your console. eg: To run commands using `php console ...`, you'll need to create a file named `console`. With Leaf API and Leaf MVC, this file is named `leaf` which is the reason you run commmands with `php leaf ...`. We'll name this file `poison` which means we'll run commands like `php poison serve`

In the `poison` file, we need to do a couple of things:

- Bring in composer's autoloader
- Bring in a custom autoloader to dynamically require your migrations, seeds and other files when they're directly initialized in the CLI.
- Bring in our env variables
- Finally, load up aloe and it's commands

The setup used in Leaf MVC looks like this:

```php
#!/usr/bin/env php
<?php
/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
|
| Composer provides a convenient, automatically generated class loader
| for our application. We just need to utilize it! We'll require it
| into the script here so that we do not have to worry about the
| loading of any our classes "manually". Feels great to relax.
|
*/
require __DIR__ . '/vendor/autoload.php';
```

Next, we need to create an autoloader to map some App paths. Some things like migrations are required directly from Aloe and so, we need to tell Aloe where to find them. MVC Core has setup pretty much everything, so all we need to is pass the directories to find and setup stuff like controllers, models, ...

```php
/*
|--------------------------------------------------------------------------
| Load MVC Core
|--------------------------------------------------------------------------
|
| MVC core provides Leaf's auto loading, configuration and shortcut
| functions right off the bat.
|
*/
Leaf\Core::paths([
  'controllersPath' => 'app/controllers',
  'modelsPath' => 'app/models',
  'migrationsPath' => 'app/database/migrations',
  'seedsPath' => 'app/database/seeds',
  'factoriesPath' => 'app/database/factories',
  'helpersPath' => 'app/helpers',
  'viewsPath' => 'app/views',
  'configPath' => 'config',
  'storagePath' => 'storage',
  'commandsPath' => 'app/console',
  'routesPath' => 'app/routes',
  'libPath' => 'lib',
  'publicPath' => 'public',
  'databaseStoragePath' => 'storage/app/db'
]);
```

This config tells aloe where to find everything it needs to get going. Under the hood, any work needed will be done for you. From here, it's simply a matter of adding our env, initializing our database and aloe.

```php
/*
|--------------------------------------------------------------------------
| Bring in (env)
|--------------------------------------------------------------------------
|
| Quickly use our environment variables
|
*/
try {
  \Dotenv\Dotenv::createUnsafeImmutable(__DIR__)->load();
} catch (\Throwable $th) {
  trigger_error($th);
}

/*
|--------------------------------------------------------------------------
| Additional Leaf Database Config
|--------------------------------------------------------------------------
|
| Load leaf database configuration
|
*/
Leaf\Database::config(DatabaseConfig());
Leaf\Database::connect();

/*
|--------------------------------------------------------------------------
| Initialise Leaf CMD
|--------------------------------------------------------------------------
|
| Initialise aloe CLI
|
*/
$console = new \Aloe\Console("Leaf MVC", "v3.0");

/*
|--------------------------------------------------------------------------
| Add commands
|--------------------------------------------------------------------------
|
| Add custom commands
|
*/
$console->register(\App\Console\ExampleCommand::class);

/*
|--------------------------------------------------------------------------
| Run The console Application
|--------------------------------------------------------------------------
|
| Transport water and dissolved substances to the rest of Leaf😂
|
*/
$console->run();
```

Leaf API's config includes a little twist which lets Aloe run in API first mode. Which means aloe will run the API centered version of commands if available.

```php
\Aloe\Command\Config::$env = "API";
```

So depending on your use case, the API commands may be of more use.

## Next Steps

- [DB Commands](/aloe-cli/v/1.2.3/commands/db-commands)
- [Custom commands](/aloe-cli/v/1.2.3/commands/custom)
- [Commands IO](/aloe-cli/v/1.2.3/commands/io)
- [Creating Libraries](/aloe-cli/v/1.2.3/libraries)
