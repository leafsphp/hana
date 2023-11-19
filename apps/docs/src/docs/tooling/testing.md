# Testing

Leaf is built with testing in mind. However, since you might need to quickly setup a project for a showcase or non-mainstream reason, we don't add any test library to the default Leaf installation, but can be added by simply installing our Alchemy module.

::: warning Note
Before you continue, keep in mind that Alchemy is only a test runner, not a test framework. Alchemy runs tests using [Pest](https://pestphp.com/)/[PHPUnit](https://phpunit.de/) (Pest by default).
:::

## Why Test?

Automated tests help you and your team build complex Leaf apps quickly and confidently by preventing regressions and encouraging you to break apart your application into testable functions, modules, classes, and components. As with any app, your new Leaf app can break in many ways, and it's important that you can catch these issues and fix them before releasing.

## When to Test

Start testing early! We recommend you begin writing tests as soon as you can. The longer you wait to add tests to your application, the more dependencies your application will have, and the harder it will be to start.

## Adding tests to a new project

From Leaf CLI v2.3, you will be asked if you wish to add tests to your application. From there, Alchemy and default tests are setup for you. You can update and run these tests using the Leaf CLI:

```bash
leaf test
```

Or directly from Alchemy:

```bash
./vendor/bin/alchemy run
```

## Adding tests to an existing project

If you've already setup a Leaf project, you can add tests by simply installing the Alchemy module. You can do this with the Leaf CLI:

```bash
leaf install alchemy
```

Or with composer

```bash
composer require leafs/alchemy
```

## Your first test

After installing alchemy, you can quickly generate a sample test with a single command:

```bash
./vendor/bin/alchemy setup
```

If you're using PHPUnit, you'll have to add a `--phpunit` option to the setup command:

```bash
./vendor/bin/alchemy setup --phpunit
```

After this, you can add the specific tests you need in your app. You can then execute these tests using the Leaf CLI:

```bash
leaf test
```

Or directly from Alchemy:

```bash
./vendor/bin/alchemy run
```

<!-- Or with the Leaf CLI:

```bash
leaf test:run
``` -->

You should see something like this:

- PestPHP

![phpunit](https://user-images.githubusercontent.com/26604242/182213801-501067c4-d77c-4769-b18a-d83573047b84.png)

- PHPUnit

![pest run](https://user-images.githubusercontent.com/26604242/182264487-6db016be-bee3-40d2-bb75-64d34d893e6a.png)

## Why Alchemy?

Alchemy is a test runner that runs your tests for you. It allows you to run tests without having to do a ton of config first or even write a `phpunit.xml`. All config is handled by Alchemy itself. Alchemy also allows you to run tests with Pest or PHPUnit. You can switch between the two with a simple command.

All of this is done without you having to write a single line of code. Alchemy is a test runner, not a test framework. It runs your tests for you, and that's it.

## Configuring Alchemy

Alchemy will automatically configure itself for you, however, if you want to change the way your tests are run, you can do so in the `alchemy.config.php` file in the root of your project.

```php
<?php

return [
  // alchemy options
  'engine' => 'pest',

  // php unit options
  'xmlns:xsi' => 'http://www.w3.org/2001/XMLSchema-instance',
  'xsi:noNamespaceSchemaLocation' => './vendor/phpunit/phpunit/phpunit.xsd',
  'bootstrap' => 'vendor/autoload.php',
  'colors' => true,

  // you can have multiple testsuites
  'testsuites' => [
    'directory' => './tests'
  ],

  // coverage options
  'coverage' => [
    'processUncoveredFiles' => true,
    'include' => [
      './app' => '.php',
      './src' => '.php'
    ]
  ]
];
```

This is the default config for Alchemy, you can change it to suit your needs. You can also change the engine from Pest to PHPUnit by changing the `engine` option to `phpunit`.

```php
'engine' => 'phpunit'
```

The `testsuites` option is an array of all the testsuites you want to run. You can have multiple testsuites, each with their own config. The default testsuite is `directory` which is the directory where your tests are located. You can change this to suit your needs.

```php
'testsuites' => [
  'directory' => './tests'
]
```

The `coverage` option is an array of all the coverage options you want to use. You can change this to suit your needs.

```php
'coverage' => [
  'processUncoveredFiles' => true,
  'include' => [
    './app' => '.php',
    './src' => '.php'
  ]
]
```

## Exporting your config

We mentioned Alchemy handles all the config for how your tests are run, however, if you want to have full control over the way your tests are run, you simply need to export your config like this:

```bash
./vendor/bin/alchemy config:export
```

<!-- Or with Leaf CLI

```bash
leaf test:configure
``` -->

After running the command listed above, you'll have access to a `phpunit.xml` file. Any configuration you need for either Pest or PHPUnit can be done in there.

If you want to totally switch from alchemy to pest or phpunit, you can eject your tests.

```bash
./vendor/bin/alchemy config:eject
```

This creates a `phpunit.xml` file and completely removes everything alchemy related.
