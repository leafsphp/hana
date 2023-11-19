# DB Seeders

<!-- markdownlint-disable no-inline-html -->

Database seeds are a way to populate a database with initial data. This initial data can be used to set up default values or pre-populate a database with test data. Database seeds typically contain small amounts of data, such as default settings, test data, or sample records.

Seeds are often used in conjunction with database migrations. After the database schema has been updated or modified, seeds can be used to populate the new or modified tables with initial data. This can be especially useful for testing and development, as it allows developers to work with a pre-populated database without having to manually enter test data.

## Defining Seeds

Seeds can be found in the `app/database/seeds` directory. Each class should be defined in its own file and should extend the `Illuminate\Database\Seeder` class. The `run` method should contain the code that populates the database with data.

Creating this manually is a bit tedious, so you can use the `g:seed` command to generate a new seed class:

```bash
php leaf g:seed <Name>

# example
php leaf g:seed Users
```

The new seed class will be placed in your `app/database/seeds` directory. The class name will be the same as the file name, with the first letter capitalized with Seeder appended to the end if it is not already there. Let's take a look at an example:

```php
<?php

namespace App\Database\Seeds;

use Illuminate\Database\Seeder;
use App\Models\User;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->name = 'Mychi';
        $user->email = "mickdd22@gmail.com";
        $user->password = password_hash("password.demo", PASSWORD_DEFAULT);
        $user->save();
    }
}
```

## Running Seeds

To run your database seeds, you first need to make sure that your seeds are registered in the `DatabaseSeeder` class. This class is located in the `app/database/seeds` directory. By default, this class contains a `run` method that will execute all of the seed classes that are returned from it. You may add additional seed classes to this property as needed.

```php
/**
 * Seed the application's database.
 *
 * @return void
 */
public function run() : array
{
    return [
        UsersSeeder::class,
        PostSeeder::class,
        CommentSeeder::class,
    ];
}
```

Once you have added your seed classes to the `DatabaseSeeder` class, you may run the `db:seed` command to execute the seeds:

```bash
php leaf db:seed
```

## Using Factories

Manually specifying the attributes for each model seed is cumbersome. Instead, you can use factories to conveniently generate large amounts of database records. First, review the [factory documentation](/modules/mvc-core/factories) to learn how to define your factories.

This example below uses the defined factory to create 30 random users:

```php
<?php
namespace App\Database\Seeds;

use App\Database\Factories\UserFactory;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        (new UserFactory())->create(30)->save();
    }
}
```

## Next Steps

Follow along with the next steps to learn more about Leaf MVC.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/modules/mvc-core/factories">
    <h3 class="next-steps-link">DB Factories</h3>
    <small class="next-steps-caption">Learn how to generate dummy information for your db seeds.</small>
  </a>
  <a class="vt-box" href="/docs/mvc/migrations">
    <h3 class="next-steps-link">DB Migrations</h3>
    <small class="next-steps-caption">Learn how to use DB migrations in your Leaf applications.</small>
  </a>
  <a class="vt-box" href="/docs/mvc/models">
    <h3 class="next-steps-link">Models</h3>
    <small class="next-steps-caption">Learn how to configure and use models in your Leaf apps.</small>
  </a>
</div>
