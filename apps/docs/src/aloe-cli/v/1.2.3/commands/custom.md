# Aloe CLI: Custom Commands

This section talks about creating custom commands using Aloe CLI. These commands would be called through the CLI.

To get started, aloe CLI provides `g:command` which scaffolds a basic command for you and even registers it, so you can go straight into working on the command's logic. The new command will be created in the default commands directory.

The default directory for commands for Leaf API and Leaf MVC is `App\Console`, with skeleton, you're free to decide where to place your commands.

```bash
php leaf g:command SendMail
```

Aloe can also generate namespaced commands directly for you. You don't have to manually set namespaces as done with other CLI tools.

```bash
php leaf g:command mail:send
```

If you want to, you can even generate the command by it's name instead of it's class. Aloe is smart enough to differentiate them.

```bash
php leaf g:command shutdown 
```

## Command Structure

After generating your command, you should start writing what to execute once the command is called. Aloe smartly generates a command name for you, even if you create the command using the class name, however, if it doesn't match what you need, you can always change it.

With the `mail:send` example above, Aloe wil generate `App\Console\MailSendCommand`, in this file, we'll have something that looks like this:

```php
<?php
namespace App\Console;

use Aloe\Command;

class MailSendCommand extends Command
{
    protected $command = "mail:send";
    protected $description = "mail:send command's description";
    protected $help = "mail:send command's help";

    public function handle()
    {
        $this->comment("mail:send command's output");
    }
}
```

We can add an argument to find the user to send the email to, and output a message while sending the email.
These can be done in the `config` and `handle` methods respectively. [Read more](/aloe-cli/v/1.2.3/commands/io) here.

```php
public function config()
{
    $this->setArgument("user", "required");
}

public function handle()
{
    $user = $this->argument('user');

    $this->comment("Sending email to $user");

    $success = CustomEmailHandler::send($user);

    if ($success) {
        $this->info("Email sent successfully");
    } else {
        $this->error("Couldn't send email, pls try again");
    }
}
```

## Registering Commands

By default, aloe cli registers all commands generated, however, if you have a command you want to register manually, or commands from a package which need to use Aloe, you can also add them pretty easily.

Simply locate the `leaf` file in the root directory of your project, open it up and find a commented section talking about custom commands.

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

An example command has already been registered, so you can follow this example. Simply call the `register` method. You can also pass in an array of commands to register, as such, a custom package with a couple of commands to register can simply return an array of all those commands.

```php
$console->register([
    \App\Console\AppCommand::class,
    CustomPackage::commands(),
]);
```

## Next Steps

- [Commands IO](/aloe-cli/v/1.2.3/commands/io)
- [libraries](/aloe-cli/v/1.2.3/libraries)
- [G Commands](/aloe-cli/v/1.2.3/commands/g-commands)
- [DB commands](/aloe-cli/v/1.2.3/commands/db-commands)
