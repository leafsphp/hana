# MVC Core

MVC core is a module that contains components for transforming leaf into a full-blown MVC framework. MVC Core is used in Leaf MVC and Leaf API. It comes with features like controllers, models, eloquent from laravel, factories and more.

## Installation

You can quickly install MVC core using composer or leaf cli.

```bash
composer require leafs/mvc-core
```

Or with leaf CLI:

```bash
leaf install mvc-core
```

## Config

Leaf MVC and Leaf API are already configured out of the box. If you are using any of these setups, you can skip to the documentation for the component you need.

## Autoloader

MVC core comes with an autoloader that uses the class names and namespaces of classes you use in your code to dynamically load classes. This saves you the trouble of having to require every file you create in your application. This is done for you by default and there's no need to initialize any class or function.

## Controllers

Leaf MVC Core comes in with two (2) controller classes. `Leaf\Controller` for creating controllers in web projects and `Leaf\ApiController` for creating controllers geared towards API development.

## Models

Leaf MVC Core comes with a base model from which all models in your leaf API and leaf MVC apps are created. This model is directly built unto [laravel's eloquent](https://laravel.com/docs/10.x/eloquent) and so we'll recommend checking out laravel models for detailed documentation. Models in your app will look something like this:

```php
<?php
namespace App\Models;

class ClassName extends Model {

}
```

::: tip NOTE
We're extending `Model` instead of `Leaf\Model` because Leaf MVC and Leaf API all have a base Model file which extends `Leaf\Model`. This is to give you a place to configure all your models seamlessly without having access to the `Leaf\Model` file.
:::

## Factories

Factories provide a quickl way to populate your database with test information. All the functionality for doing this has been implemented in the `Leaf\Factory` class. To create a factory, you simply need to extend this class.

```php
<?php

namespace App\Database\Factories;

use App\Models\User;
use Leaf\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
  /**
   * The name of the factory's corresponding model.
   *
   * @var string
   */
  public $model = User::class;

  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
    return [
      'username' => strtolower($this->faker->firstName),
      'name' => $this->faker->name,
      'email' => $this->faker->unique()->safeEmail,
      'email_verified_at' => \Leaf\Date::now(),
      'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      'remember_token' => Str::random(10),
    ];
  }
}
```

The `definition` method returns the default set of attribute values that should be applied when creating a model using the factory.

As a side note, if the `model` property isn't defined, Leaf tries to determine the model class name from the factory name, if however, that doesn't work, an error would be thrown, and the seeding process halted.

Via the `faker` property, factories have access to the [Faker PHP library](https://github.com/FakerPHP/Faker), which allows you to conveniently generate various kinds of random data for testing.

### Running your factories

Factories are used in your seeds, so to use a factory, head over to it's corresponding Seed, eg: `UserFactory` would be used by the `UsersSeeder`. From there, you just need to initialize the Factory in the `run` method of your seeder. This is in 3 simple parts:

```php
(new UserFactory)->create(20)->save();
```

The `(new UserFactory)` part initializes the factory, `create()` takes in a number which defines how many dummy records to generate, finally `save()` instantiates model instances and persists them to the database using Eloquent's save method:

```php
// Create a single App\Models\User instance...
(new UserFactory)->save();

// Create three App\Models\User instances...
(new UserFactory)->create(3)->save();
```

To see the results of this, you just need to seed your database with the `db:seed` command.

You may override the factory's default model attributes by passing an array of attributes to the create method:

```php
(new UserFactory)->save([
  'name' => 'Mychi',
]);
```

**Note that if you're creating multiple records, they'll all have the same data passed into `save`, so it's not recommended to override save when using multiple records.**

In some cases, for whatever reason, you may want to return the users generated instead of saving them in the database directly. You can do this with the `get` method:

```php
$randomUsers = (new UserFactory)->create(3)->get();
```

## Schema

Schema is a new way to create database migrations. Typing code for migrations the regular way is quite annoying: thinking of the types of data, setting default values and other items. `Schema` allows you to create migration schemas based on example JSON output.

```json
{
  "id": 1,
  "username?": "mychi.darko",
  "name": "Mychi Darko",
  "email?": "mychi@leafphp.dev",
  "email_verified_at?": "2021-07-23T16:18:35.947712157Z",
  "password": "poekojdenwjwiojweojojweoijoewoj",
  "remember_token?": "deiwoj",
  "timestamps": ""
}
```

This will generate a migration equivalent to this:

```php
$table->increments('id');
$table->string('username')->nullable();
$table->string('name');
$table->string('email')->nullable();
$table->timestamp('email_verified_at')->nullable();
$table->string('password');
$table->string('remember_token')->nullable();
$table->timestamps();
```

Schema takes care of all the work involved and generates a migration based on sample data. This means that if you have an idea of what your database should look like, leaf will take care of the rest.

### Using leaf schema

To get started with leaf schema, simply call `Leaf\Schema::build` in your migration. It takes in the capsule to build your migrations with and the json schema to build.

Using the example above (users.json):

```json
{
  "id": 1,
  "username?": "mychi.darko",
  "name": "Mychi Darko",
  "email?": "mychi@leafphp.dev",
  "email_verified_at?": "2021-07-23T16:18:35.947712157Z",
  "password": "poekojdenwjwiojweojojweoijoewoj",
  "remember_token?": "deiwoj",
  "timestamps": ""
}
```

user_migration.php

```php
...
use Leaf\Schema;

class CreateUsers extends Database {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()  {
    Schema::build("users");
  }
  ...
```

In this case leaf will generate a migration to the users table since our filename is `users.json`. Note that leaf schema will always use the filename as the table name.

## Globals

Leaf MVC core comes with the most global functions in all of leaf. This includes functions for configurations, paths and other essentials in MVC applications.

- **AppPaths**: This is a function which holds all of the paths in your application. This is usually used by leaf, as you will be using some of the functions below.

```php
$paths = AppPaths();
```

- **ConfigPath**: This global returns the path to your configuration folder in Leaf MVC and Leaf API.

```php
$dbConfigFile = ConfigPath("db.php");
// -> Config/db.php
```

- **CommandsPath**: This returns the path to your commands defined.

```php
$command = CommandsPath("MainCommand.php");
// -> App/Commands/MainCommand.php
```

- **ControllersPath**: Path to your controllers

- **DatabasePath**: Path to your database files (migrations, schema, factories...)

- **FactoriesPath**: Path to your model factories

- **HelpersPath**: Path to your helpers

- **LibPath**: Path to your lib folder if it exists.

- **MigrationsPath**: Path to your mirations

- **ModelsPath**: Path to your models

- **RoutesPath**: Path to your routes

- **SeedsPath**: Path to your seed files

- **StoragePath**: Path to storage directory

- **ViewsPath**: Path to your view files
