# Writing Commands

Leaf MVC and Leaf API come with a [built-in command line](/docs/mvc/console) interface named Aloe. This CLI is used to run commands and perform tasks like creating controllers, models, migrations, seeds, etc.

In addition to the built-in commands, you can also create your own commands. This is useful if you want to create a command that performs a specific task in your application.

## Generating a command

The easiest way to create a command is to use the `g:command` command. This command will create a new command class in your `app/console` directory.

```bash
php leaf g:command CachePurge
```

This will create a `CachePurgeCommand` in the `app/console` directory. Instead of using the class name, you can also create commands using the command you want to run in your console like this:

```bash
php leaf g:command cache:purge
```

This will create a `CachePurgeCommand` in the `app/console` directory.

Using the `g:command` command also registers the commands in Aloe. This means you can run the command immediately after creating it.

## Manually writing a command

If you don't use the `g:command` command, you can create a command manually. To do this, create a new class in your `app/console` directory and extend the `Aloe\Command` class. The class should also have `$defaultName` and `$description` properties.

The `$defaultName` property is the name of the command that will be used to run the command in the console. The `$description` property is a short description of what the command does.

The class should have a `handle()`. This method is called when the command is run in the console. The `handle` method should return `0` if the command was successful and `1` if it failed.

```php
<?php

namespace App\Console;

use Aloe\Command;

class ExampleCommand extends Command
{
  protected static $defaultName = 'example';
  public $description = 'example command\'s description';
  public $help = 'example command\'s help';

  protected function config()
  {
    $this
      ->setArgument('argument', 'optional', 'argument description')
      ->setOption('option', 'o', 'required', 'option description');
  }

  protected function handle()
  {
    $this->comment(
      "example command's output {$this->argument('argument')} {$this->option('option')}"
    );

    return 0;
  }
}
```

Both Leaf MVC and Leaf API ship with an example command. You can find it in the `app/console` directory.

::: tip Symfony Console
Aloe is built on top of Symfony Console. This means you can use all of the features of Symfony Console in your commands. You can read more about Symfony Console [here](https://symfony.com/doc/current/components/console.html).
:::

## Registering Commands

By default, aloe cli registers all generated commands, however, if you create a command manually, you'll have to register it manually. There are also situations where a package might need you to register a command, it can also be done using same method.

To add your commands, open up the `leaf` file in the root directory of your project. You'll find a commented section talking about custom commands.

```php
/*
|--------------------------------------------------------------------------
| Add custom command
|--------------------------------------------------------------------------
|
| If you have a new command to add to Leaf
|
*/
$console->register(\App\Console\ExampleCommand::class);
```

An example command has already been registered, so you can follow this example. You can call the `register` method on the `$console` variable. The `register` method takes in the command class as a parameter.

```php
$console->register(\App\Console\YourCommand::class);
```

You can also pass in an array of commands to register, as such, a custom package with a couple of commands to register can simply return an array of all those commands.

```php
$console->register([
  \App\Console\AppCommand::class,
  \App\Console\AppCommand2::class,
]);

$console->register(CustomPackage::commands());
```

## Command Arguments

Command arguments are values that are passed to the command when it is run in the console. For example, if you have a command named `example` and you run it like this:

```bash
php leaf example argument
```

The `argument` value is an argument that is passed to the command. You can access the argument in the `config()` method using the `setArgument()` method. It typically follows the same convention as symfony console's `addArgument` except that instead of passing in `InputArgument::state`, you just pass in the state as a string. For example, instead of `InputArgument::REQUIRED`, you just pass in `"required"`, any case is supported.

```php
protected function config()
{
  $this->setArgument('argument', 'required', 'argument description');
}
```

You can access the argument in the `handle()` method using the `argument()` method.

```php
protected function handle()
{
  $this->comment("example command's output {$this->argument('argument')}");
}
```

## Command Options

Command options are values that are passed to the command when it is run in the console. For example, if you have a command named `example` and you run it like this:

```bash
php leaf example --option=value
```

To add an option to your command, you can use the `setOption()` method in the `config()` method. It typically follows the same convention as symfony console's `addOption` except that instead of passing in `InputOption::state`, you just pass in the state as a string. For example, instead of `InputOption::VALUE_REQUIRED`, you just pass in `"required"`, any case is supported.

```php
protected function config()
{
  $this->setOption('option', 'o', 'required', 'option description');
}
```

You can access the option in the `handle()` method using the `option()` method.

```php
protected function handle()
{
  $this->comment("example command's output {$this->option('option')}");
}
```

## Command Input

Aloe makes it easier to grab the Symfony input object from anywhere in your command. This means that you don't have to pass in the `$input` variable to the `handle()` method. Instead, you can use the `input()` method.

```php
public function handle()
{
  $input = $this->input();
  $name = $input->getArgument('name');
}
```

## Command Output

Aloe makes it easier to grab and output text to the console from anywhere in your command. Unlike with symfony console, you don't have to pass in the `$output` variable to the `handle()` method. Instead, you can use `ouput()`, `write()`, `writeln()`, `comment()`, `info()`, `error()`, `question()` and `link()` methods.

### output()

This method either outputs text in your console or returns the Symfony output object. If a value is passed into `output()`, it will write the value to the console.

```php
public function handle()
{
  $this->output('Hello World');
}
```

If no value is passed into `output()`, it will return the Symfony output object.

```php
public function handle()
{
  $output = $this->output();
  $output->writeln('This is output');
}
```

### write()

This method writes text to the console. It is the same as the `output()->write()` method.

```php
public function handle()
{
  $this->write('Hello World');
}
```

### writeln()

This method writes text to the console and adds a new line. It is the same as the `output()->writeln()` method.

```php
public function handle()
{
  $this->writeln('Hello World');
}
```

### comment()

This method writes a comment styled message to the console and adds a new line. It is the same as the `output()->writeln()` method with the `SymfonyStyle::COMMENT` style.

```php
public function handle()
{
  $this->comment('Hello World');
}
```

### info()

This method writes an info styled message to the console and adds a new line. It is the same as the `output()->writeln()` method with the `SymfonyStyle::INFO` style.

```php
public function handle()
{
  $this->info('Hello World');
}
```

### error()

This method writes an error styled message to the console and adds a new line. It is the same as the `output()->writeln()` method with the `SymfonyStyle::ERROR` style.

```php
public function handle()
{
  $this->error('Hello World');
}
```

### question()

This method writes a question styled message to the console and adds a new line. It is the same as the `output()->writeln()` method with the `SymfonyStyle::QUESTION` style.

```php
public function handle()
{
  $this->question('Hello World');
}
```

### link()

This method writes a link to the console and adds a new line.

```php
public function handle()
{
  $this->link('https://leafphp.dev', 'Leaf PHP');
}
```

## Command Questions

Aloe makes it easier to ask questions in your command. You can use the `ask()`, `confirm()`, `askRaw()`, `autoComplete()`, `choice()` and `multiChoice()` methods.

### ask()

This method asks a question and returns the answer. It takes in 2 parameters:

- the question to ask
- the default answer (optional)

```php
public function handle()
{
  $name = $this->ask('What is your name?', 'Leaf');
}
```

### askRaw()

This is the same as the `ask()` method above, except that it does not trim the results that the user enters. Whatever the user enters is returned as is.

```php
public function handle()
{
  $name = $this->askRaw('What is your name?', 'Leaf');
}
```

### autoComplete()

This method allows you to ask a question and provide a list of values that the user can choose from. The user's answer will be auto-completed as they type if it matches one of the values in the list. It takes in 3 parameters:

- the question to ask
- the list of values to choose from
- the default answer (optional)

```php
public function handle()
{
  $name = $this->autoComplete('What is your name?', ['Leaf', 'PHP'], 'Leaf');
}
```

### choice()

This method allows you to ask a question and provide a list of values that the user can choose from. The user must select one of the values in the list. It takes in 4 parameters:

- the question to ask
- the list of values to choose from
- the error message to display if the user does not select one of the values in the list
- the default answer (optional)

```php
public function handle()
{
  $name = $this->choice('What is your name?', ['Leaf', 'PHP'], 'Please select a name');
}
```

### multiChoice()

This method allows you to ask a question and provide a list of values that the user can choose from. The user must select one or more of the values in the list. It takes in 4 parameters:

- the question to ask
- the list of values to choose from
- the error message to display if the user does not select one of the values in the list
- the default answer (optional)

```php
public function handle()
{
  $name = $this->multiChoice('What is your name?', ['Leaf', 'PHP'], 'Please select a name');
}
```

### confirm()

This method asks a yes/no question and returns the answer. It takes in 2 parameters:

- the question to ask
- the default answer (optional)

```php
public function handle()
{
  $name = $this->confirm('Are you sure?', 'yes');
}
```

### secret()

This method asks a question but hides the keystrokes. It takes in 2 parameters:

- the question to ask
- use hidden fallback (optional)

```php
$password = $this->secret('Confirm your password');
```

## Aloe Installer

Aloe installer allows you to quickly install files and routes from your library into your Leaf MVC or Leaf API project's working directory.

### Magic Copy

This method allows you to auto-magically copy all files and folders from a specified folder into Leaf workspace.

```php
Aloe\Installer::magicCopy("package/to/install");
```

Consider the following directory structure:

```bash
C:.
└───Auth
    ├───controllers
    ├───routes
    └───views
```

To copy our controllers, routes and views, we simply need to point `magicCopy` to the auth directory.

```php
\Aloe\Installer::magicCopy('package/Auth');
```

This will copy the sub directories in Auth to the `app` folder in the working directory. This is especially useful in team projects where you want to share resources with your team. You can simply create a package with the resources you want to share and then use `magicCopy` to copy them into the working directory.
