# Aloe CLI: DB Commands

These commands help you manage and interact with your database.

## db:install

Create the database in your .env variables if it doesn't already exist.

```bash
Description:
  Create new database from .env variables

Usage:
  db:install
```

## db:migrate

```bash
Description:
  Run the database migrations

Usage:
  db:migrate [options]

Options:
  -f, --file[=FILE]     Rollback a particular file
  -s, --seed            Run seeds after migration
```

## db:rollback

```bash
Description:
  Rollback database migrations

Usage:
  db:rollback [options]

Options:
  -s, --step[=STEP]     The batch to rollback [default: "all"]
  -f, --file[=FILE]     Rollback a particular file
```

Dont use -f and -s together

## db:seed

```bash
Description:
  Seed the database with records

Usage:
  db:seed
```

## Next Steps

- [Custom commands](/aloe-cli/v/1.2.3/commands/custom)
- [Commands IO](/aloe-cli/v/1.2.3/commands/io)
- [Creating Libraries](/aloe-cli/v/1.2.3/libraries)
