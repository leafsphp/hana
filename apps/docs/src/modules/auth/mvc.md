# Usage with Leaf MVC

Leaf MVC and Leaf API both come with built-in support for Leaf Auth. This means you can skip the initial setup and get right into using Leaf Auth. To get started, head over to your `public/index.php` file and uncomment the following line:

```php
\Leaf\Database::initDb();
```

This will allow Leaf Auth to use your database connection set up in your `.env` file. If you don't have a database connection set up, you can set one up by following the [Leaf MVC Database docs](/docs/leafmvc/).

## Auth config

Once your database connection is set up, you can pretty much start using Leaf Auth. However, you can also set up your auth config in your `config/auth.php` file. This allows you to control Leaf Auth's behaviour. You can find a list of all available config options [here](/modules/auth/config).

## Usage

From this point on, you can use Leaf Auth as you would normally. You can find the full docs [here](/modules/auth/).
