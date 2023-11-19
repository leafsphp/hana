# New in v2

Leaf db has gone through a complete rewrite to bring you the best experience possible in the simplest way for a db library. This page lists all the changes that have gone on in leaf db: both internal and external changes.

## PDO rewrite

Under the hood, Leaf DB has been rewritten to fully support PDO, both internally and user instantiated PDO instances. This makes leaf db more flexible and more compatible with most systems and applications.

Because of this, you can pass in an existing PDO connection, and leaf db should work fine, even without initializing a leaf db connection.

<div class="functional-mode">

```php
<?php

// a random PDO connection
$db = new PDO('mysql:dbname=testdb;host=127.0.0.1', 'dbuser', 'dbpass');

// pass in db connection
db()->connection($db);

// you can use leaf db here with calling db()->connect
db()->select(...)..;
```

</div>
<div class="class-mode">

```php
<?php

// a random PDO connection
$pdo = new PDO('mysql:dbname=testdb;host=127.0.0.1', 'dbuser', 'dbpass');

// pass in db connection
$db = new Leaf\Db();
$db->connection($pdo);

// you can use leaf db here with calling $db->connect
$db->select(...)...;
```

</div>

This allows you to gradually rewrite your existing applications with leaf db, one query at a time.

## DB Support

Rewriting leaf db with PDO now allows you to connect to different database types like SQLite and PostgreSQL. Since any valid PDO connection is a valid leaf db connection, leaf db supports all db types supported by PDO.

## Deep syncing with leaf 3

Leaf DB is now detached from leaf, however, as a leaf 3 module, there's additional functionality you can get from using leaf db in a leaf 3 app. Deep syncing config, instances and functional mode all become available to you.

This simply means that your db config becomes available on `app()->config()`, as well as functional mode seen in the examples above.

## Performance Improvements

Despite switching to PDO and huggling a lot of operations under the hood to provide the best user experience, we put measures in place to optimize performance. After running a bunch of benchmarks in the same app, leaf db v2 performs up to 2x better than v1.

## Db create method

`create` is a much requested feature which did not exist in previous versions. This method allows you to quickly and seamlessly build a query to create a database.

<div class="functional-mode">

```php
db()->create('dbname')->execute();
```

</div>
<div class="class-mode">

```php
$db->create('dbname')->execute();
```

</div>

## Db drop method

A create method should come with a `drop` method, and this version does. This method allows you to quickly drop a database.

<div class="functional-mode">

```php
db()->drop('dbname')->execute();
```

</div>
<div class="class-mode">

```php
$db->drop('dbname')->execute();
```

</div>

## Find method

This is a method inspired by Laravel's eloquent. This method allows you to `select` a database row using it's `id`.

<div class="functional-mode">

```php
db()->select('users')->find(1);
```

</div>
<div class="class-mode">

```php
$db->select('users')->find(1);
```

</div>

## Insert with multiple records

The `insert` method now allows you to insert multiple records in your database at once.

<div class="functional-mode">

```php
db()
  ->insert('table')
  ->params([
    ['name' => 'Record 1'],
    ['name' => 'Record 2'],
  ])
  ->execute();
```

</div>
<div class="class-mode">

```php
$db
  ->insert('table')
  ->params([
    ['name' => 'Record 1'],
    ['name' => 'Record 2'],
  ])
  ->execute();
```

</div>

## `first` and `last` methods

These methods are used to return the first and last values matching a given condition respectively. In db v1, these methods would retrieve all records matching the condition but only return the first/last value. For large pools of data, this is simply inefficient. This problem has been solved by modifying the query to fetch only the needed value directly from the database.

## Breaking changes

To give you the best experience, a few things had to change under the hood. This section is intended to document all changes that may lead to your application breaking after upgrading leaf db.

### DB CONNECTION

Although the connect method still does the same things, we shifted things up a bit to accomodate a few internal changes. The `connect` method's parameters now come in a different order.

<div class="functional-mode">

```php
db()->connect(
  $host = '',
  string $dbname = '',
  string $user = '',
  string $password = '',
  string $dbtype = 'mysql',
  array $pdoOptions = []
);

// example connection
db()->connect('127.0.0.1', 'dbname', 'root', '');
```

</div>
<div class="class-mode">

```php
$db->connect(
  $host = '',
  string $dbname = '',
  string $user = '',
  string $password = '',
  string $dbtype = 'mysql',
  array $pdoOptions = []
);

// example connection
$db->connect('127.0.0.1', 'dbname', 'root', '');
```

</div>

As you've noticed, `$pdoOptions` is a new parameter which stems from rewriting leaf db with PDO. Also, the position of the dbname has been changed to the second parameter. Quickly moving your dbname to the second parameter should solve any problems you'll encounter connecting to your database.

<div class="class-mode">

This same thing applies to the leaf db constructor.

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
$db = new Leaf\Db('127.0.0.1', 'dbname', 'root', '');
```

</div>

### WHERE BLOCKS

Leaf db v1 had a unique way of handling multiple where blocks which wasn't exactly the nicest thing to do. Look at this query for instance.

<div class="functional-mode">

```php
$items = db()
  ->select('items')
  ->where('status', 'active')
  ->whereLike('name', '%something')
  ->orWhereLike('identifier', 'something%')
  ->all();
```

</div>
<div class="class-mode">

```php
$items = $db
  ->select('items')
  ->where('status', 'active')
  ->whereLike('name', '%something')
  ->orWhereLike('identifier', 'something%')
  ->all();
```

</div>

You notice we use 3 different types of `where`, and some queries could require more. This significantly reduces the developer experience and adds a bit more to the learning curve.

`where`, `whereLike`, `orWhere`, `orWhereLike` have been replaced with `where` and `orWhere` in v2. This is due to the addition of a third parameter which contains the comparator for the query.

<div class="functional-mode">

```php
$items = db()
  ->select('items')
  ->where('status', 'active')
  ->where('name', 'LIKE', '%something')
  ->orWhere('identifier', 'LIKE', 'something%')
  ->all();
```

</div>
<div class="class-mode">

```php
$items = $db
  ->select('items')
  ->where('status', 'active')
  ->where('name', 'LIKE', '%something')
  ->orWhere('identifier', 'LIKE', 'something%')
  ->all();
```

</div>

Besides getting rid of other `where` blocks, this also allows you to pass in a comparator of your choice like this:

<div class="functional-mode">

```php
$items = db()
  ->select('items')
  ->where('status', 'active')
  ->where('name', 'NOT LIKE', '%something%')
  ->orWhere('identifier', 'NOT LIKE', '%something%')
  ->all();
```

</div>
<div class="class-mode">

```php
$items = $db
  ->select('items')
  ->where('status', 'active')
  ->where('name', 'NOT LIKE', '%something%')
  ->orWhere('identifier', 'NOT LIKE', '%something%')
  ->all();
```

</div>

In this case, we are using `NOT LIKE` instead of `LIKE`.

::: danger Where dependents
Since some `where` functions have been removed, any functions which depend on them have also been removed. This means that functions like `like` and `orLike` have also been removed.
:::

### VALIDATE

The validate method, originally powered by leaf forms has also been removed. You can directly use leaf forms to validate your data if you want to do so.

### SEARCH UTILS

The search helpers `beginsWith`, `endsWith`, `includes` and `word` have been moved to `Leaf\Db\Utils`.

<div class="functional-mode">

```php
use Leaf\Db\Utils;

// ...

$items = db()
  ->select('items')
  ->where('name', 'LIKE', Utils::includes('something'))
  ->all();
```

</div>
<div class="class-mode">

```php
use Leaf\Db\Utils;

// ...

$items = $db
  ->select('items')
  ->where('name', 'LIKE', Utils::includes('something'))
  ->all();
```

</div>
