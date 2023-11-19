# Aloe CLI: Libraries

This section talks about using and creating libraries for Aloe CLI, as well as some best practices in terms of custom libraries.

## Plugging in libraries

As seen in [registering commands](/aloe-cli/v/1.2.3/commands/custom?id=registering-commands), Aloe provides a neat `register` method which allows you to extend aloe's command range. Aloe libraries usually take advantage of this to return an array instead of manually returning commands one by one.

```php
$console->register(\Aloe\UI::commands());
```

## Creating your own libraries

Aloe libraries simply serve a bunch of commands to the Aloe CLI. ALoe CLI has full support for Symfony console commands, so all symfony commands can also be run through Aloe CLI. After defining all your commands, you can simply return all their classes as an array to be registered.

## Next Steps

- [Installer](/aloe-cli/v/1.2.3/installer)
- [Custom commands](/aloe-cli/v/1.2.3/commands/custom)
- [Commands IO](/aloe-cli/v/1.2.3/commands/io)
- [db commands](/aloe-cli/v/1.2.3/commands/db-commands)
