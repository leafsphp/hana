# Migrations

<!-- markdownlint-disable no-inline-html -->

Database migrations are a technique used in software development to manage changes to a database schema over time. A database schema is the structure of a database that defines the tables, columns, relationships, and constraints that make up the data model.

When changes are made to the database schema, such as adding a new table or column, modifying an existing column's data type, or changing a relationship between tables, database migrations allow developers to update the schema and propagate those changes to all instances of the database.

## Generating Migrations

You can quickly generate migrations using the `g:migration` command:

```bash
php leaf g:migration <Name>

# example
php leaf g:migration flights
```

The new migration will be placed in your `app/database/migrations` directory. Each migration file name begins with a timestamp.

## Migration Structure

A migration class contains two methods: up and down. The up method is used to add new tables, columns, or indexes to your database, while the down method should reverse the operations performed by the up method.

You can create and modify tables in the both of these methods. In this example, we create a posts table:

```php
<?php
namespace App\Database\Migrations;

use Leaf\Database;
use Illuminate\Database\Schema\Blueprint;

class CreateUsers extends Database {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    if (!$this->capsule::schema()->hasTable("posts")):
      $this->capsule::schema()->create("posts", function (Blueprint $table) {
        $table->increments('id');
        $table->string('author_id');
        $table->string('title');
        $table->text('body');
        $table->timestamps();
      });
    endif;
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    $this->capsule::schema()->dropIfExists("posts");
  }
}
```

::: tip Note
Instead of building your migrations from scratch, you can use Leaf's schema builder to generate migrations from JSON data. [Learn more](/docs/mvc/schema).
:::

## Running migrations

To run all of your outstanding migrations, execute the `db:migrate` command:

```bash
php leaf db:migrate
```

You may also run seeds alongside your migrations if you wish to do so:

```bash
php leaf db:migrate -s
# or
php leaf db:migrate --seed
```

You can also choose to run a specific migration file:

```bash
php leaf db:migrate -f users
```

## Rolling Back Migrations

To roll back the latest migration operation, you may use the `db:rollback` command.

```bash
php leaf db:rollback
```

You may roll back a limited number of migrations by providing the `step` option to the `rollback` command. For example, the following command will roll back the last five migrations:

```bash
php leaf db:rollback -s 2
```

To roll back all migrations, you can just pass `all` as the `step` option.

```bash
php leaf db:rollback --step all
```

You can also rollback a specific migration file:

```bash
php leaf db:rollback -f users
```

## Refreshing Migrations

If you would like to reset your database and re-run all of your migrations with seeds, you may use the `db:reset` command. This command will drop all tables in your database and re-run all of your migrations:

```bash
php leaf db:reset
```

If you want to prevent seeds from running, you can use the `--noSeed` option:

```bash
php leaf db:reset --noSeed
```

## Next Steps

Follow along with the next steps to learn more about Leaf MVC.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/docs/mvc/seeds">
    <h3 class="next-steps-link">DB Seeding</h3>
    <small class="next-steps-caption">Learn how to seed your database with information.</small>
  </a>
  <a class="vt-box" href="/modules/mvc-core/factories">
    <h3 class="next-steps-link">DB Factories</h3>
    <small class="next-steps-caption">Learn how to generate dummy information for your db seeds.</small>
  </a>
  <a class="vt-box" href="/docs/mvc/console">
    <h3 class="next-steps-link">Console</h3>
    <small class="next-steps-caption">Learn how to use `php leaf` commands in your Leaf applications.</small>
  </a>
</div>
