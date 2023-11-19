# Using Databases with Leaf

Leaf provides a lightweight db client/query builder which can be used to make queries quickly and easily. We call this query builder Leaf DB. Just like any other database client out there, you need to make a database connection first. You can do this with the `connect` method. This method takes in all the parameters you need to connect to your database.

## CONNECTING TO YOUR DATABASE

As mentioned above, we'll use the `connect` method to connect to our database. This method takes in a hostname, dbname, username, password, dbtype **`(optional)`** and options **`(optional)`** in that order. This means that a db connection will look something like this:

<div class="functional-mode">

```php
// syntax
db()->connect('hostname', 'dbname', 'username', 'password', 'mysql');
```

</div>
<div class="class-mode">

```php
$db = new Leaf\Db;

// syntax
$db->connect('hostname', 'dbname', 'username', 'password', 'mysql');
```

</div>

Your first task is to make a database connection using the `connect` method. We've provided connection paramters to a real database. You can try connecting with the correct parameters or switch up the connection parameters if you want to get a view of what a connection error wwould look like.

::: tip Test DB Credentials

- Hostname: eu-cdbr-west-03.cleardb.net,
- Dbname: heroku_fb1311a639bb407,
- Username: b9607a8a6d5ebb,
- Password: cc589b17

:::

## RAW DB QUERIES

All apps are different on a base level, so it's important to be able to run queries that are specific to your app. Although Leaf DB has simple methods for common queries, you can also run raw queries. This is to give you all the flexibility you need to run queries that are not exactly covered by the Leaf DB methods.

We can run raw queries using the `query` method. This method takes in a query string. This means that a raw query will look something like this:

<div class="class-mode">

```php
$users = $db->query('SELECT * FROM users')->all();
```

</div>
<div class="functional-mode">

```php
$users = db()->query('SELECT * FROM users')->all();
```

</div>

Although the `query` method directly allows you to run queries like this, you can still reap the benefits of Leaf DB's query builder. This is because the `query` method returns a query builder instance. This means that you can chain methods to the `query` method to build your query. With this in mind, you can even use parameter binding like this:

<div class="class-mode">

```php
db()->query('SELECT * FROM users WHERE id = ?')->bind('1')->fetchObj();
```

</div>
<div class="functional-mode">

```php
db()->query('SELECT * FROM users WHERE id = ?')->bind('1')->fetchObj();
```

</div>

## RUNNING QUERIES

There are different types of queries, some return values and others don't. Leaf Db provides a seamless way of handling both.

You can use `execute` to run queries that don't return values. This method returns a boolean value. This means that a query that doesn't return values will look something like this:

<div class="class-mode">

```php
$db->query('CREATE DATABASE dbname')->execute();
```

</div>
<div class="functional-mode">

```php
db()->query('CREATE DATABASE dbname')->execute();
```

</div>

For queries that actually return values, you can use `all`, `get`, `fetchObj` and `fetchAssoc` to get the results. You can read more on them [here](/modules/db/v/2/#running-queries).

::: tip
You can configure the route and method you want to run in the `request.json` file.
:::

## YOUR TASK

Your second task is to run a raw query using the `query` method. We've provided a query string for you to run. You can run the query as is or you can modify it to suit your needs.

```sql
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT(6) UNSIGNED AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)
```

After that, create another route and run this query to insert some data into the table:

```sql
INSERT INTO users (name, email)
VALUES
  ('John Doe', 'johndoe@test.com')
```

To prove that all what we just did actually works, we'll need to fetch the data we just inserted. We've prepared a query for you to fetch the data. You can run the query as is or you can modify it to suit your needs.

```sql
SELECT * FROM users
```

Just as with the exercise above, you should create a new route and run the query.

::: tip
Since this query returns multiple results, `execute` won't work. You'll need to use either `all` or `get`.
:::
