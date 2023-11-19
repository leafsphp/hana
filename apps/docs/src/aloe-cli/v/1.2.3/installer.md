# Aloe Installer

Aloe installer allows you to quickly install files and routes from your library into the working directory. Aloe installer currently only suports Leaf MVC and Leaf API.

To get started with Aloe installer, just import the package into your app or directly use the method you want to use directly.

```php
use Aloe\Installer;

// or

Aloe\Installer::method();
```

## Magic Copy

This method allows you to auto-magically copy all files and folders from a specified folder into Leaf workspace.

```php
Aloe\Installer::magicCopy("package/to/install");
```

Consider the following directory structure:

```bash
C:.
└───Auth
    ├───Controllers
    ├───Routes
    └───Views
```

To copy our controllers, routes and views, we simply need to point `magicCopy` to the auth directory.

```php
Aloe\Installer::magicCopy("package/Auth");
```

This will copy the sub directories in Auth to the `App` folder in the working directory.

## Install Routes

Similarly, you can also automatically install routes from your package routes in your app after you've copied them into the working routes directory.

Installing routes involves referencing routes files in the main route file.

```php
Aloe\Installer::installRoutes("package/Auth/Routes");
```

## Next Steps

- [g Commands](/aloe-cli/v/1.2.3/commands/g-commands)
- [Custom commands](/aloe-cli/v/1.2.3/commands/custom)
- [Commands IO](/aloe-cli/v/1.2.3/commands/io)
- [db commands](/aloe-cli/v/1.2.3/commands/db-commands)
