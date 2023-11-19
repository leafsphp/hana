# Aloe CLI: Misc Commands

## Serve command

This command allows you to run your Leaf app using PHP's built in server.

```bash
Description:
  Start the leaf development server

Usage:
  serve [options] [--] [<path>]

Arguments:
  path                  Path to your app (in case you changed it)

Options:
  -p, --port[=PORT]     Port to run Leaf app on [default: 5500]
```

## Scaffolding

Scaffolding is a feature that allows you to generate big blocks of code and full features without writing a single line of code. For now, auth scaffolding is the only type of scffolding available in Aloe CLI, however, it comes ready built for both APIs and web apps.

### auth scaffolding

This will generate views, controllers, routes and models required for authentication and provide your app with working authentication in only one command.

```bash
$ php leaf scaffold:auth

Description:
  Scaffold basic app authentication

Usage:
  scaffold:auth [options]

Options:
  -s, --session         Use session/session + JWT instead of just JWT
  -a, --api             Use JWT for authentication
```

**Note that aloe will automatically use the session version on Leaf MVC and the api version on Leaf API.**

## Next Steps

- [DB Commands](/aloe-cli/v/1.2.3/commands/db-commands)
- [Custom commands](/aloe-cli/v/1.2.3/commands/custom)
- [Commands IO](/aloe-cli/v/1.2.3/commands/io)
- [Creating Libraries](/aloe-cli/v/1.2.3/libraries)
