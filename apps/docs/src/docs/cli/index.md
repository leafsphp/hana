# Leaf CLI

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

<p class="flex flex:start-all" style="gap:10px;">
  <img src="https://poser.pugx.org/leafs/cli/v/stable" class="m:0" alt="">
  <img src="https://poser.pugx.org/leafs/cli/downloads" class="m:0" alt="">
</p>

Leaf CLI is a simple command line tool for creating and interacting with your Leaf applications. It gives you the options to create projects, install dependencies, run scripts, scaffold items and much more.

## Installation

<VideoDocs
  subject="Watch the leaf CLI installation walkthrough"
  description="You can take a look at our leaf cli setup walkthrough on youtube."
  link="https://www.youtube.com/embed/yb3LUYHtopQ"
/>

You can install the leaf cli using composer. Composer is a dependency manager for PHP. You can follow the instructions on [getcomposer.org](https://getcomposer.org) to install composer on your system. From there, you should have access to the `composer` command from anywhere on your system.

```bash
composer --version
```

You should then be able to get the Leaf CLI up and and running on your system using composer:

```bash
composer global require leafs/cli
```

After that, you should have access to the `leaf` command from anywhere on your system.

```bash
leaf --version
```

## command not found: leaf

If you get a `command not found: leaf` error, it means your composer bin is not in your system path.

You need to make sure that Composer's system-wide vendor bin directory is in your system `$PATH` so the leaf executable can be located by your system. This directory exists in different locations based on your operating system; however, some common locations include:

- Windows: `%USERPROFILE%\AppData\Roaming\Composer\vendor\bin`
- macOS: `$HOME/.composer/vendor/bin`
- GNU / Linux Distributions: `$HOME/.config/composer/vendor/bin` or `$HOME/.composer/vendor/bin`

You could also find the composer's global installation path by running `composer global about` and looking up from the first line.

## Adding composer bin to path

Once you find your composer global installation path, you can add it to your path. **There are some examples below which you can copy and paste in your terminal.**

Eg (Adding composer bin to path linux):

```bash
export PATH=$PATH:$HOME/.config/composer/vendor/bin
```

Eg (Adding composer bin to path mac):

```bash
export PATH=$PATH:$HOME/.composer/vendor/bin
echo $PATH
```

::: tip NOTE
To get leaf cli installed permanently, you will need to add your composer bin your `.bashrc` or `.zshrc` file on mac and linux.

**zsh:**

```bash
echo 'export PATH="$PATH:$HOME/.composer/vendor/bin"' >> ~/.zshrc
source ~/.zshrc
```

**bash:**

```bash
echo 'export PATH="$PATH:$HOME/.composer/vendor/bin"' >> ~/.bashrc
source ~/.bashrc
```

:::

## Creating a leaf app

<VideoDocs
  subject="Watch the leaf 3 installation walkthrough"
  description="You can take a look at our leaf cli setup walkthrough on youtube."
  link="https://www.youtube.com/embed/PuOk5xqTIsA"
/>

To start a new project, open up your terminal and move into a directory you want to generate your projects in. From there, you can use the `leaf create` command to set up a new Leaf app in that directory:

```bash
leaf create <project-name>
```

This will prompt you to select a preset. Presets are quick ways to get your project up and running as quickly as possible. You can select a preset from the list of presets displayed to you:

```bash
? What kind of app do you want to create? [leaf]
  [0] leaf
  [1] leaf mvc
  [2] leaf api
 > 
```

*You can select a number or type in the preset you prefer.*

A leaf app will be generated based on the associated preset. As you can see, there are 3 presets:

- **Leaf**: a bare Leaf project
- **Leaf MVC**: a Leaf project with leaf mvc
- **Leaf API**: a Leaf project with leaf api

The Leaf CLI will automatically install the dependencies for the preset you selected and set up your project using Leaf 3. From there, you can `cd` into your project and start building.

```bash
cd <project-name>
leaf serve
```

### Custom installation <sup class="vt-badge success">New</sup>

The Leaf CLI also comes with a custom installation option. This allows you to customize your project to your liking. You can select the features you want to add to your project and the Leaf CLI will set it up for you.

```bash
leaf create <project-name> --custom
```

This will prompt you to select the features you want to add to your project. You can select the features you want to add to your project from the list of features displayed to you:

```bash
? What modules would you like to add? [none] eg: 1,2,7
  [0] None
  [1] Database
  [2] Authentication
  [3] Session support
  [4] Cookie support
  [5] CSRF protection
  [6] CORS support
  [7] Leaf Date
  [8] Leaf Fetch
 > 
```

For Leaf MVC, you can also select things like the View engine you prefer to use:

```bash
? What view engine would you like to use? [Blade]
  [0] Blade
  [1] Bare UI
  [2] React/Vue
 > 
```

Whether to add a bundler for your frontend assets:

```bash
? Do you want to add Vite to bundle your assets? [Yes]
```

And whether to add a testing framework:

```bash
? What testing framework would you like to use? [none]
  [0] none
  [1] pest
  [2] phpunit
 >
```

### GUI <sup class="vt-badge success">New</sup>

These new options are quite a lot to take in, so we've also added a GUI to help you select the features you want to add to your project. The GUI allows you to select different structures and features you want to add to your project. The GUI can also install and setup frontend systems like React, Vue, Tailwind and more.

You can get started with the following command:

```bash
leaf ui
```

<img src="https://github.com/leafsphp/csrf/assets/26604242/937f930c-1053-4393-9e6f-fc4faa9cdfe1" style="border: 1px solid var(--vt-c-theme-soft); border-radius: 8px;" />

### Quick presets

Leaf CLI also provides a quicker way to initialize your project without having to go through the interactive installer. You can use the `--mvc`, `--api`, and `--basic` options to generate your project based on a specific presets. These generate the following:

- `--basic`: a bare Leaf project
- `--mvc`: a Leaf project with leaf mvc
- `--api`: a Leaf project with leaf api

```bash
leaf create <project-name> --mvc
```

### Adding Tests

The Leaf CLI by default will generate your project without any testing framework. However, you will be prompted to add a testing framework if you select the `--custom` option.

```bash
leaf create <project-name> --custom
```

You can still add a testing framework without using the `--custom` option by using either the `--pest` for Pest PHP tests:

```bash
leaf create <project-name> --pest
```

Or the `--phpunit` option for PHPUnit tests:

```bash
leaf create <project-name> --phpunit
```

### Using docker

Leaf CLI also provides a way to generate your project with docker. You can use the `--docker` option to add all the necessary files to your project to run it with docker.

```bash
leaf create <project-name> --docker
```

If you are using the `--custom` option, you will be asked if you want to add docker to your project. For the full docker guide, you can check out the [docker guide](/docs/introduction/docker).

## Running your leaf apps

After generating your leaf app, you can `cd` into the directory and spin up a local dev server using leaf cli's `serve` command.

```bash
cd backend-api
leaf serve
```

You can also specify the port to run your leaf app on using the `--port` or `-p` options.

```bash
leaf serve -p 3000
```

### File watching

In v2.1, you can also start the leaf server with hot module watching. This reloads your application anytime a change is made to your application code. To get started, simply start the leaf server with the `--watch` flag.

```bash
leaf serve --port 8000 --watch
```

### Dependency Management

The serve command will also try to install dependencies for your project if it doesn't detect a `vendor` folder present in the current working directory.

<VideoDocs
  subject="Working with packages on the Leaf CLI"
  description="Working with packages and the leaf cli"
  link="https://www.youtube.com/embed/K9jSl_xpr48"
/>

## Testing your Leaf apps

Testing helps prevent bugs in your app which you may not catch until you publish your app to production. Leaf introduced a test runner which helps you initialize testing and run tests in your app without needing any config first. Alchemy has also been integrated into the Leaf CLI and so you can use it's functionality directly.

### Setting up tests

If you already have a project and want to setup tests, you can use the `test:setup`. It will automatically detect the testing framework you are using and setup tests for you. It also supports Pest PHP and PHPUnit, so you can use either of them using the `--phpunit` or `--pest` options.

```bash
# pest
leaf test:setup --pest

# phpunit
leaf test:setup --phpunit
```

This will create a `tests` folder in your project and add example tests to it based on the testing framework you are using.

### Running tests

To run tests you've setup or created, you can use the `test` command.

```bash
leaf test
```

## Installing packages

This cli tool also adds a feature to install leaf packages from composer.

```bash
leaf install leafs/ui
```

If you are installing a leaf module or package, you can leave out the `leafs/` part.

```bash
leaf install ui
```

You can also pass in a bunch of packages to install at once.

```bash
leaf install ui db illuminate/support
```

***Versioning***

Leaf CLI also allows you to install a particular version of any package using `@`

```bash
leaf install ui@1.0 illuminate/support@9.0.2
```

## Interactive Shell

You can also use the interactive shell to interact with your app.

```bash
$ leaf interact
...
>>> $user = new User;
...
>>> $user->name = "Mychi";
...
>>> $user->save();
```

## Updating leaf cli

Leaf CLI keeps getting better with every release, and by default, it checks for updates every time you run a command. However, you can also manually update your leaf cli using the `update` command.

```bash
leaf update
```

If this doesn't work, or you want to hard reset the Leaf CLI to clear cache, you can re-install it via composer:

```bash
composer global remove leafs/cli
composer global require leafs/cli
```

## View commands <sup class="vt-badge success">New</sup>

Leaf CLI also allows you to create and interact with frontend setups using the `view` commands. You can scaffold frontend setups like React, Vue, templating engines, build tools, and more.

### Scaffolding views

Leaf CLI ships with a `view:install` command that allows you to setup React, Vue, and templating engines like Blade and BareUI. You can use the `--react`, `--vue`, `--blade`, and `--bareui` options to scaffold your frontend setup.

```bash
leaf view:install --react
```

You can also use the `--vite` and `--tailwind` options to scaffold Vite and Tailwind respectively.

### Running frontend setups

Since Leaf CLI is a backend tool, it doesn't come with a frontend server. However, you can use the `view:dev` command to run your frontend setup which may include in a dev server for your frontend.

```bash
leaf view:dev
```

### Building frontend setups

You can also use the `view:build` command to build your frontend setup for production.

```bash
leaf view:build
```

## Running Scripts

Leaf CLI also now allows you run scripts defined in your `composer.json` file. For example, if you have this in your composer.json:

![image](https://user-images.githubusercontent.com/26604242/166419297-225b0b00-c979-4096-a23d-4f7858def8fb.png)

You can run the test script like this:

```bash
leaf run test
```

## Usage Guide

```bash
 _              __    ___ _    ___ 
| |   ___ __ _ / _|  / __| |  |_ v2.8.3
| |__/ -_) _` |  _| | (__| |__ | | 
|____\___\__,_|_|    \___|____|___|                       


Usage:
  command [options] [arguments]

Options:
  -h, --help            Display help for the given command. When no command is given display help for the list command
  -q, --quiet           Do not output any message
  -V, --version         Display this application version
      --ansi|--no-ansi  Force (or disable --no-ansi) ANSI output
  -n, --no-interaction  Do not ask any interactive question
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

Available commands:
  completion    Dump the shell completion script
  create        [init|new] Create a new Leaf PHP project
  deploy        [publish] Deploy your leaf project
  help          Display help for a command
  install       Add a new package to your leaf app
  interact      Interact with your application
  list          List commands
  run           Run a script in your composer.json
  serve         Run your Leaf app
  test          Test your leaf application through leaf alchemy
  uninstall     Uninstall a  package
  update        Update leaf cli to the latest version
 test
  test:setup    Add tests to your application
 view
  view:build    Run your frontend dev server
  view:dev      Run your frontend dev server
  view:install  Run a script in your composer.json
```

This is the full list of commands available with Leaf CLI 2. A new update command has been added to allow you seamlessly update leaf CLI without having to run a bunch of commands. You don't even need to run this manually since leaf cli will automatically check for updates and upgrade to the latest stable release.
