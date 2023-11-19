# Usage with Leaf MVC

Leaf MVC and Leaf API both come with built-in support for Leaf DB. This means you can skip the initial setup and get right into using Leaf DB. To get started, head over to your `public/index.php` file and uncomment the following line:

```php
\Leaf\Database::initDb();
```

This will allow Leaf DB to use your database connection set up in your `.env` file. If you don't have a database connection set up, you can set one up by following the [Leaf MVC Database docs](/docs/leafmvc/). Although you can use Leaf DB in Leaf MVC and Leaf API, they follow the MVC pattern, so we recommend using Models to interact with your database instead of writing queries with Leaf DB. Of course, you should still initialize Leaf DB if you want to use [Leaf Auth](/modules/auth/).

## Models

Leaf DB doesn't come with any pre-defined model classes, so for this, Leaf MVC and Leaf API use Laravel's Eloquent ORM. This means you can use all of Laravel's Eloquent methods on your models. You can find the full docs [here](https://laravel.com/docs/8.x/eloquent).

The `initDb()` method above also syncs Leaf DB with Eloquents' database connection. Of course, you can use your models without calling `initDb()`, but you'll have to set up your Leaf DB connection manually if you want to use [Leaf Auth](/modules/auth/).

## Usage

From this point on, you can use Leaf DB as you would normally. You can find the full docs [here](/modules/db/).
