# Getting Started

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

Interacting with a database is a common requirement for most modern web applications. Leaf Db simplifies this process by providing a unified API that supports multiple databases. Leaf Db currently offers first-party support for five databases:

- MariaDB
- MySQL
- PostgreSQL
- SQLite
- SQL Server

<details>
<summary>Don't understand Databases?</summary>

<VideoDocs
  title="DB intro by Linux Academy"
  subject="What is a database in under 4 minutes"
  description="In this episode of the Linux Academy Weekly Update, we are covering Databases, what they are, and what are the different types of them."
  link="https://www.youtube.com/embed/Tk1t3WKK-ZY"
/>

<VideoDocs
  title="Danielle Thé explains SQL"
  subject="What is SQL? [in 4 minutes for beginners]"
  description="Structured Query Language - or SQL, is a language that communicates with databases. Learn what SQL is, and why it is an important language to learn in the era of big data."
  link="https://www.youtube.com/embed/27axs9dO7AE"
/>

</details>

## Installing Leaf Db

You can install Leaf Db with Leaf CLI:

```bash
leaf install db
```

Or with composer:

```bash
composer require leafs/db
```

From there, you can link your database and start writing some awesome queries.

<div class="functional-mode">

## Functional Mode

If you are using leaf db v2 in a leaf 3 app, you will have access to the `db` global which allows you to use Leaf Db from anywhere in your entire application. You simply need to call `db()` and leaf 3 will create and maintain a shared instance of Leaf db which you can call from anywhere.

This also means that you don't need to initialize leaf db anymore.

```php
<?php

require __DIR__ . "/vendor/autoload.php";

db()->connect('127.0.0.1', 'test');

app()->get("/", function () {
  // db can be used here
  // db()->...
});

app()->run();
```

</div>

## Db Connection

After installing leaf db, you will need to connect to your database to get started. There are multiple ways to connect to your database using leaf db.

<div class="class-mode">

### connect on init

This method connects to the database when initializing Leaf Db.

```php
// syntax
$db = new Leaf\Db(
  $host = '',
  string $dbname = '',
  string $user = '',
  string $password = '',
  string $dbtype = 'mysql'
);

// example
$db = new Leaf\Db('127.0.0.1', 'db_name', 'root', 'password123');
```

Leaf db takes in 5 optional parameters:

- The database host eg: localhost
- The database name
- The database username
- The database password
- The PDO database driver eg: mysql, pgsql, ...

Alternatively, you can pass an array into the host parameter to connect to your database like this:

```php
// syntax
$db = new Leaf\Db([
  'dbtype' => 'mysql',
  'charset' => null,
  'port' => null,
  'unixSocket' => null,
  'host' => '127.0.0.1',
  'username' => 'root',
  'password' => '',
  'dbname' => '',
]);

// example
$db = new Leaf\Db([
  'host' => '127.0.0.1',
  'username' => 'root',
  'password' => 'password123',
  'dbname' => 'db name',
]);
```

You only need to pass the fields you want to configure.

::: tip Example sqlite connection

Unlike other database types, SQLite databases are contained within a single file on your filesystem. This means that you don't need to create a database before connecting to it. You can simply pass the path to the database file as the database name.

```php
$db = new Leaf\Db([
  'dbtype' => 'sqlite',
  'dbname' => 'db.sqlite',
]);
```

:::

</div>

### Manual database connection

Leaf DB ships with a `connect()` method which allows you to connect to your database by passing in the required parameters.

<div class="class-mode">

```php
$db = new Leaf\Db;

// syntax
$db->connect(
  $host = '',
  string $dbname = '',
  string $user = '',
  string $password = '',
  string $dbtype = 'mysql',
  array $pdoOptions = []
);

// example
$db->connect('127.0.0.1', 'dbname', 'root', '');
```

Connect works the same way as the constructor, except that it accepts one more parameter: `$pdoOptions` which is a bunch of configuration specific to the PHP `PDO` class.

</div>
<div class="functional-mode">

```php
// syntax
db()->connect(
  $host = '',
  string $dbname = '',
  string $user = '',
  string $password = '',
  string $dbtype = 'mysql',
  array $pdoOptions = []
);

// example
db()->connect('127.0.0.1', 'dbname', 'root', '');
```

Leaf db takes in 5 optional parameters:

- The database host eg: localhost
- The database name
- The database username
- The database password
- The PDO database driver eg: mysql, pgsql, ...
- Configuration specific to the PHP `PDO` class

</div>

Alternatively, you can pass an array into the host parameter to connect to your database like this:

<div class="functional-mode">

```php
// syntax
db()->connect([
  'dbtype' => 'mysql',
  'charset' => null,
  'port' => null,
  'unixSocket' => null,
  'host' => '127.0.0.1',
  'username' => 'root',
  'password' => '',
  'dbname' => '',
]);

// example
db()->connect([
  'host' => '127.0.0.1',
  'username' => 'root',
  'password' => 'password123',
  'dbname' => 'db name',
]);
```

</div>
<div class="class-mode">

```php
$db = new Leaf\Db();

// syntax
$db->connect([
  'dbtype' => 'mysql',
  'charset' => null,
  'port' => null,
  'unixSocket' => null,
  'host' => '127.0.0.1',
  'username' => 'root',
  'password' => '',
  'dbname' => '',
]);

// example
$db->connect([
  'host' => '127.0.0.1',
  'username' => 'root',
  'password' => 'password123',
  'dbname' => 'db name',
]);
```

</div>

You only need to pass the fields you want to configure.

::: tip Example sqlite connection

Unlike other database types, SQLite databases are contained within a single file on your filesystem. This means that you don't need to create a database before connecting to it. You can simply pass the path to the database file as the database name.

<div class="functional-mode">

```php
db()->connect([
  'dbtype' => 'sqlite',
  'dbname' => 'db.sqlite',
]);
```

</div>
<div class="class-mode">

```php
$db = new Leaf\Db();
$db->connect([
  'dbtype' => 'sqlite',
  'dbname' => 'db.sqlite',
]);
```

</div>

:::

### Auto Connect

Leaf DB also allows you to connect to your database using the database credentials set in your environment variables. This is much easier than having to pass in the credentials every time you want to connect to your database. You can do this using the `autoConnect()` method.

**example env:**

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=LeafMVC
DB_USERNAME=root
DB_PASSWORD=
```

Using the `autoConnect()` method, you can connect to your database like this:

<div class="functional-mode">

```php
db()->autoConnect();
```

</div>
<div class="class-mode">

```php
$db = new Leaf\Db;
$db->autoConnect();
```

</div>

### PDO connection

Leaf Db also allows you to skip the entire connection process and share an existing PDO instance with leaf db. This allows you to gradually rewrite your existing apps with Leaf Db without having multiple db connections and doing so at your own pace.

<div class="functional-mode">

```php
$db = new PDO('mysql:dbname=test;host=127.0.0.1', 'root', '');

db()->connection($db);

// you can use leaf db the same way you always have
```

</div>
<div class="class-mode">

```php
$pdo = new PDO('mysql:dbname=test;host=127.0.0.1', 'root', '');

$db = new Leaf\Db();
$db->connection($pdo);

// you can use leaf db the same way you always have
```

</div>

## Simple queries

Leaf Db provides a ton of functionality, with a bunch of powerful tools, but at the same time gives you a great deal of customizations with the `query` method. You can write your raw SQL queries with the `query` method, however you can still use the cool features Leaf Db provides.

<div class="functional-mode">

```php
$users = db()->query('SELECT * FROM users')->all();
```

</div>
<div class="class-mode">

```php
$users = $db->query('SELECT * FROM users')->all();
```

</div>

You can also use parameter binding with `query`

<div class="functional-mode">

```php
db()->query('SELECT * FROM users WHERE id = ?')->bind('1')->fetchObj();
```

</div>
<div class="class-mode">

```php
$db->query('SELECT * FROM users WHERE id = ?')->bind('1')->fetchObj();
```

</div>

A shorter method would be to use `where`

<div class="functional-mode">

```php
db()->query('SELECT * FROM users')->where('id', '1')->fetchObj();
```

</div>
<div class="class-mode">

```php
$db->query('SELECT * FROM users')->where('id', '1')->fetchObj();
```

</div>

You don't have to worry about security, `where` uses prepared statements by default, so you're pretty good.

You've seen all this, but guess what? There's something even shorter

<div class="functional-mode">

```php
db()->select('users')->where('id', '1')->fetchObj();
```

</div>
<div class="class-mode">

```php
$db->select('users')->where('id', '1')->fetchObj();
```

</div>

This is what Leaf Db does for you. A new way to write your Database queries without actually needing to write any real queries. Also, unlike other query builders, there's no need to create classes and models for every table you want to fetch from. Everything's accessible with one line of code.

## Running queries

There are different types of queries, some return values and others don't. Leaf Db provides a seamless way of handling both.

### execute

`execute` is a method on Leaf Db which allows you to run a query instantly. The `execute` method is used when the query is **NOT** expected to return a value.

<div class="functional-mode">

```php
db()->query('CREATE DATABASE dbname')->execute();
```

</div>
<div class="class-mode">

```php
$db->query('CREATE DATABASE dbname')->execute();
```

</div>

### fetchAll

`fetchAll` is a method simply returns all the results of a query. Under the hood, the query is run using `execute` and the value is retrieved and returned. This method is used when there are a lot of values to return.

<div class="functional-mode">

```php
$users = db()->query('SELECT * FROM users')->fetchAll();
```

</div>
<div class="class-mode">

```php
$users = $db->query('SELECT * FROM users')->fetchAll();
```

</div>

::: tip Aliases
`fetchAll` has aliases adapted from other libraries and frameworks. Instead of `fetchAll`, you can use `all` and `get`

<div class="functional-mode">

```php
$users = db()->query('SELECT * FROM users')->all();
$users = db()->query('SELECT * FROM users')->get();
```

</div>
<div class="class-mode">

```php
$users = $db->query('SELECT * FROM users')->all();
$users = $db->query('SELECT * FROM users')->get();
```

</div>

:::

In this case, the `$users` variable with contain an array of associative arrays, but if you want an array of objects, you can pass `obj` or `object` as a parameter into `fetchAll`

<div class="functional-mode">

```php
$users = db()->query('SELECT * FROM users')->fetchAll('obj');
$users = db()->query('SELECT * FROM users')->all('object');
$users = db()->query('SELECT * FROM users')->get('obj');
```

</div>
<div class="class-mode">

```php
$users = $db->query('SELECT * FROM users')->fetchAll('obj');
$users = $db->query('SELECT * FROM users')->all('object');
$users = $db->query('SELECT * FROM users')->get('obj');
```

</div>

### fetchObj

`fetchObj` is a method that fetches the next row and returns it as an object. It returns only one object, so it should be used only on queries that return a single item.

<div class="functional-mode">

```php
$user = db()->query('SELECT * FROM users WHERE id = 1')->fetchObj();
```

</div>
<div class="class-mode">

```php
$user = $db->query('SELECT * FROM users WHERE id = 1')->fetchObj();
```

</div>

::: tip Aliases
Instead of `fetchObj`, you can use `obj`

<div class="functional-mode">

```php
$user = db()->query('SELECT * FROM users WHERE id = 1')->obj();
```

</div>
<div class="class-mode">

```php
$user = $db->query('SELECT * FROM users WHERE id = 1')->obj();
```

</div>

:::

::: warning Watch out
`fetchObj` returns an object, so you can use the result like this:

<div class="functional-mode">

```php
$user = db()->query('SELECT * FROM users WHERE id = 1')->obj();
$user->id // not $user["id"]
```

</div>
<div class="class-mode">

```php
$user = $db->query('SELECT * FROM users WHERE id = 1')->obj();
$user->id // not $user["id"]
```

</div>

:::

### fetchAssoc

`fetchAssoc` is a method that fetches the next row and returns it as an array. It returns only one array, so it should be used only on queries that return a single item.

<div class="functional-mode">

```php
$user = db()->query('SELECT * FROM users WHERE id = 1')->fetchAssoc();
```

</div>
<div class="class-mode">

```php
$user = $db->query('SELECT * FROM users WHERE id = 1')->fetchAssoc();
```

</div>

::: tip Aliases
Instead of `fetchAssoc`, you can use `assoc`

<div class="functional-mode">

```php
$user = db()->query('SELECT * FROM users WHERE id = 1')->assoc();
```

</div>
<div class="class-mode">

```php
$user = $db->query('SELECT * FROM users WHERE id = 1')->assoc();
```

</div>

:::

::: warning Watch out
`fetchAssoc` returns an array, so you can use the result like this:

<div class="functional-mode">

```php
$user = db()->query('SELECT * FROM users WHERE id = 1')->assoc();
$user['id'] // not $user->id
```

</div>
<div class="class-mode">

```php
$user = $db->query('SELECT * FROM users WHERE id = 1')->assoc();
$user['id'] // not $user->id
```

</div>

:::

### first

`first` returns the first item in the database that matches the condition given.

<div class="functional-mode">

```php
$user = db()->query('SELECT * FROM users')->first();
```

</div>
<div class="class-mode">

```php
$user = $db->query('SELECT * FROM users')->first();
```

</div>

Although all our users are saved in the `users` table, `first` will return only the first record.

### last

`last` returns the last item in the database that matches the condition given.

<div class="functional-mode">

```php
$user = db()->query('SELECT * FROM users')->last();
```

</div>
<div class="class-mode">

```php
$user = $db->query('SELECT * FROM users')->last();
```

</div>

Although all our users are saved in the `users` table, `last` will return only the last record.

<!-- ## Next Steps

<div class="vt-box-container next-steps">
  <a class="vt-box h:_10 w:50" href="/modules/db/v/2/builder">
    <h3 class="next-steps-link mb:_1">Continue the Guide</h3>
    <small class="next-steps-caption">Learn how to build queries with Leaf Db's developer friendly syntax.</small>
  </a>
  <a class="vt-box ml:_1" href="/modules/db/v/2/new" target="_blank">
    <h3 class="next-steps-link">Follow the Tutorial</h3>
    <small class="next-steps-caption">For those who prefer learning things hands-on. Let's build something real!</small>
  </a>
  <a class="vt-box w:50 ml:_1" href="/modules/db/v/2/new">
    <h3 class="next-steps-link">What's new in v2</h3>
    <small class="next-steps-caption">Check out all the changes in this new version of leaf db.</small>
  </a>
</div> -->
