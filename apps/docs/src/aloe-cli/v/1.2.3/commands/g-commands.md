# Aloe CLI: g commands

These commands generate something.

## g:command

```bash
Description:
  Create a new console command

Usage:
  g:command <consoleCommand>

Arguments:
  consoleCommand        command name
```

## g:controller

```bash
Description:
  Create a new controller class

Usage:
  g:controller [options] [--] <controller>

Arguments:
  controller            controller name

Options:
  -a, --all             Create a model and migration for controller
  -m, --model           Create a model for controller
  -r, --resource        Create a resource controller
  -w, --web             Create a web(ordinary) controller
      --api             Create a web(ordinary) controller
  -ar, --api-resource   Create an API resource controller
  -wr, --web-resource   Create a web resource controller
```

## g:factory

```bash
Description:
  Create a new model factory

Usage:
  g:factory <factory>

Arguments:
  factory               factory name
```

## g:helper

```bash
Description:
  Create a new helper class

Usage:
  g:helper <helper>

Arguments:
  helper                helper name
```

## g:migration

```bash
Description:
  Create a new migration file

Usage:
  g:migration <migration>

Arguments:
  migration             migration file name
```

## g:model

```bash
Description:
  Create a new model class

Usage:
  g:model [options] [--] <model>

Arguments:
  model                 model file name

Options:
  -m, --migration       Create a migration for model
```

## g:seed

```bash
Description:
  Create a new seed file

Usage:
  g:seed [options] [--] <model> [<name>]

Arguments:
  model                 model name (optional)
  name                  seed name

Options:
  -f, --factory         Create a factory for seeder
```

## Next Steps

- [d Commands](/aloe-cli/v/1.2.3/commands/d-commands)
- [Custom commands](/aloe-cli/v/1.2.3/commands/custom)
- [Commands IO](/aloe-cli/v/1.2.3/commands/io)
- [Creating Libraries](/aloe-cli/v/1.2.3/libraries)
