# Sunset Aloe (BETA)

v1.1 beta is the secomd release of Aloe CLI which introduces full support for Leaf MVC, new features, better support for custom libraries and so much more. Sunset Aloe also introduces integrations with Leaf Auth, creating a scaffold option to make authentication available in your app with only 1 command.

## What's new

### Better Leaf MVC support

Sunset Aloe is the first version of Aloe integrated out of the box with Leaf MVC. As such, it ships a tight integration with Leaf MVC and the already made integrations that come with Leaf API. So now, your Leaf MVC CLI is powered by aloe.

### Auth Scaffolding

Sunset also includes auth scaffolding which simply allows you to add basic session based auth (login, signup, update profile and guards) to your app by simply running one command.

```bash
php leaf scaffold:auth
```

### Updated Stubs

These are basic templates generated when you run commands like `g:controller`. These templates have been updated to keep you up to date with both internal and external updates from Leaf API and Leaf MVC.

### Aloe Installer Class

Another major update to Aloe is the inclusion of Aloe Installer which basically takes the stress out of making libraries which need to install files/routes in the working directory.

```php
use Aloe\Installer;

Installer::magicCopy($folderToInstall);
Installer::installRoutes("$folderToInstall/routefiles/");
```

**Installer currently only supports Leaf MVC and Leaf API.**

### Updated Packages

All dependencies of Aloe have been updated. This includes security patches and a bunch of updates to keep aloe up to date. Also, the core library behind aloe, symfony console has been updated as well, however, we do our best to maintain Aloe CLI's syntax, structure and config, so despite all the updates and external changes, the Aloe you know never changes.

### Protected command methods

To match the symfony console, Aloe also uses protected command methods in this version.

```php
protected function config()
{
    $this
        ->setArgument("argument", "optional", "argument description")
        ->setOption("option", "o", "required", "option description");
}

protected function handle()
{
    $this->comment(
        "example command's output {$this->argument('argument')} {$this->option('option')}"
    );
}
```

## Aloe List

```bash
Leaf MVC v2.0

Usage:
  command [options] [arguments]

Options:
  -h, --help            Display help for the given command. When no command is given display help for the list command
  -q, --quiet           Do not output any message
  -V, --version         Display this application version
      --ansi            Force ANSI output
      --no-ansi         Disable ANSI output
  -n, --no-interaction  Do not ask any interactive question
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

Available commands:
  example        example command's description
  help           Displays help for a command
  interact       Interact with your application
  list           Lists commands
  serve          Start the leaf development server
 aloe
  aloe:config    Install aloe config
 app
  app:down       Place app in maintenance mode
  app:up         Remove app from maintenance mode
 d
  d:command      Delete a console command
  d:controller   Delete a controller
  d:factory      Delete a model factory
  d:migration    Delete a migration
  d:model        Delete a model
  d:seed         Delete a model seeder
 db
  db:install     Create new database from .env variables
  db:migrate     Run the database migrations
  db:rollback    Rollback all database migrations
  db:seed        Seed the database with records
 env
  env:generate   Generate .env file
 g
  g:command      Create a new console command
  g:controller   Create a new controller class
  g:factory      Create a new model factory
  g:helper       Create a new helper class
  g:migration    Create a new migration file
  g:model        Create a new model class
  g:seed         Create a new seed file
  g:template     Create a new view file
 scaffold
  scaffold:auth  Scaffold basic app authentication
```
