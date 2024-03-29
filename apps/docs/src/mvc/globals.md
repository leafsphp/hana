# MVC Helpers

Just as Leaf has a couple of built-in helpers, Leaf MVC also ships with a bunch of helpers to make your life easier. These helpers are available throughout your application and help you with common tasks like finding files and loading paths.

## Loading app paths

Since Leaf MVC and Leaf API come with a robust structure out of the box, they also come with quick ways to reference files in these structures. For example, if you want to reference a file in your `public` folder, you can use the `PublicPath()` helper.

### AppPaths()

This returns an array of all the paths in your application.

```php
$paths = AppPaths();

$controllersPath = AppPaths('controllers'); // you can do this
$controllersPath = $paths['controllers']; // or this
```

If the path you are looking for doesn't have a helper function, you can use the `AppPaths()` helper to get the path. Just make sure that the path is defined in your `config/paths.php` file.

```php
AppPaths('weirdPath');
```

### assets()

This returns the path to your assets folder. You can pass in a file name to get the path to that file.

```php
$asset = assets('css/main.css');
// -> public/assets/css/main.css
```

You can configure the path to your assets folder in your `config/paths.php` file.

```php
'assets' => 'public/assets'
```

### ConfigPath()

This returns the path to your config folder. You can pass in a file name to get the path to that file.

```php
$dbConfigFile = ConfigPath('db.php');
// -> config/db.php
```

### CommandsPath()

This returns the path to your commands folder. You can pass in a file name to get the path to that file.

```php
$command = CommandsPath('MainCommand.php');
// -> app/commands/MainCommand.php
```

### ControllersPath()

This returns the path to your controllers folder. You can pass in a file name to get the path to that file.

```php
$controller = ControllersPath('MainController.php');
// -> app/controllers/MainController.php
```

### DatabasePath()

This returns the path to your database folder. You can pass in a file name to get the path to that file.

```php
$database = DatabasePath('migrations');
// -> app/database/migrations
```

### FactoriesPath()

This returns the path to your factories folder. You can pass in a file name to get the path to that file.

```php
$factory = FactoriesPath('UserFactory.php');
// -> app/database/factories/UserFactory.php
```

### HelpersPath()

This returns the path to your helpers folder. You can pass in a file name to get the path to that file.

```php
$helper = HelpersPath('MainHelper.php');
// -> app/helpers/MainHelper.php
```

### LibPath()

This returns the path to your lib folder. You can pass in a file name to get the path to that file.

```php
$lib = LibPath('MainLib.php');
// -> lib/MainLib.php
```

### MigrationsPath()

This returns the path to your migrations folder. You can pass in a file name to get the path to that file.

```php
$migration = MigrationsPath('MainMigration.php');
// -> app/database/migrations/MainMigration.php
```

### ModelsPath()

This returns the path to your models folder. You can pass in a file name to get the path to that file.

```php
$model = ModelsPath('User.php');
// -> app/models/User.php
```

### PublicPath()

This returns the path to your public folder. You can pass in a file name to get the path to that file.

```php
$public = PublicPath('index.php');
// -> public/index.php
```

### RoutesPath()

This returns the path to your routes folder. You can pass in a file name to get the path to that file.

```php
$routes = RoutesPath('_auth.php');
// -> app/routes/_auth.php
```

### SeedsPath()

This returns the path to your seeds folder. You can pass in a file name to get the path to that file.

```php
$seed = SeedsPath('MainSeed.php');
// -> app/database/seeds/MainSeed.php
```

### StoragePath()

This returns the path to your storage folder. You can pass in a file name to get the path to that file.

```php
$storage = StoragePath('MainStorage.php');
// -> storage/MainStorage.php
```

### ViewsPath()

This returns the path to your views folder. You can pass in a file name to get the path to that file.

```php
$view = ViewsPath('index.leaf.php');
// -> app/views/index.leaf.php
```

## Loading app config

There are some situations that may require you to load up your config files. For such situations, we've prepared a couple of helpers to help you load up your config files.

### MvcConfig()

This returns an array of all the config files in your application.

```php
$configs = MvcConfig();

$dbConfig = MvcConfig('db'); // you can do this
$dbConfig = $configs['db']; // or this
```

It also allows you to load up a specific config from the config file you pass in.

```php
$config = MvcConfig('db', 'host'); // you can do this
$config = $configs['db']['host']; // or this
```

### AppConfig()

This returns an array of all the config in your `config/app.php` file.

```php
$configs = AppConfig();

$debug = AppConfig('debug'); // you can do this
$debug = $configs['debug']; // or this
```

### AuthConfig()

This returns an array of all the config in your `config/auth.php` file.

```php
$configs = AuthConfig();

$auth = AuthConfig('auth'); // you can do this
$auth = $configs['auth']; // or this
```

### CorsConfig()

This returns an array of all the config in your `config/cors.php` file.

```php
$configs = CorsConfig();

$origin = CorsConfig('origin'); // you can do this
$origin = $configs['origin']; // or this
```

### DatabaseConfig()

This returns an array of all the config in your `config/db.php` file.

```php
$configs = DatabaseConfig();

$host = DatabaseConfig('host'); // you can do this
$host = $configs['host']; // or this
```

### MailConfig()

This returns an array of all the config in your `config/mail.php` file.

```php
$configs = MailConfig();

$host = MailConfig('host'); // you can do this
$host = $configs['host']; // or this
```

### ViewConfig()

This returns an array of all the config in your `config/view.php` file.

```php
$configs = ViewConfig();

$host = ViewConfig('viewEngine'); // you can do this
$host = $configs['viewEngine']; // or this
```

## View Helpers

View helpers are in charge of outputting your views.

### view()

This method calls the `render()` method of whatever view engine you are using. It takes in the name of the view you want to render and an optional array of data you want to pass to the view.

```php
view('index', [
  'name' => 'Leaf'
]);
```

The only issue here is that not all view engines directly output the view. For example, Blade and Twig return the view as a string. This means that you have to echo the view.

```php
echo view('index', [
  'name' => 'Leaf'
]);
```

To make this easier, Leaf MVC ships with a `render()` method that calls the `view()` helper and echoes the view.

### render()

This method calls the `view()` helper and echoes the view. It takes in the name of the view you want to render and an optional array of data you want to pass to the view.

```php
render('index', [
  'name' => 'Leaf'
]);
```
