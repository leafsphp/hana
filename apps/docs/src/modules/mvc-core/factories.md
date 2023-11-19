<!-- markdownlint-disable no-inline-html -->
# Core Factory

## Overview

Instead of defining 100 dummy rows in your database 1 by 1, you can quickly populate your database with dummy but structured data using Factories.

This version of Leaf comes with a nice integration with your models that allows you to create all the data you need in just a few lines of code.

## Working with factories

Just like with other Leaf modules, we try to make working with factories as simple as possible. A regular factory file looks something like this:

```php
<?php

namespace App\Database\Factories;

use App\Models\User;
use Leaf\Factory;

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
      'remember_token' => 'random string',
    ];
  }
}

```

As you can see, in their most basic form, factories are classes that extend Leaf's base factory class and define a `model` property and `definition` method. The `definition` method returns the default set of attribute values that should be applied when creating a model using the factory.

As a side note, if the `model` property isn't defined, Leaf tries to determine the model class name from the factory name, if however, that doesn't work, an error would be thrown, and the seeding process halted.

Via the `faker` property, factories have access to the [Faker PHP library](https://github.com/FakerPHP/Faker), which allows you to conveniently generate various kinds of random data for testing.

## Running your factories

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
