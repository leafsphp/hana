# Reading items in a database

In the previous section, we looked at how to insert data into a database using the Leaf Db query builder. In this section, we will look at how to read data from a database.

In [section 10](/tutorial/#step-10), we looked at how to use raw queries to read data from a database. Although the `query` method is powerful, it is not exactly the most convenient way to make simple queries. In this section, we will look at Leaf's query builder and how to use it to read data from a database.

## THE SELECT METHOD

To read data from a database, we'll need to start out with Leaf Db's `select` method. This method takes a table name as its first argument and the columns to select as its second argument and then returns a query builder. The query builder has a number of methods that we can use to build our query. Let's look at an example:

<div class="class-mode">

```php
$db->select('users')->all();
```

</div>
<div class="functional-mode">

```php
$db->select('users')->all();
```

</div>

The query above returns everything in our users table. We can also specify the columns we want to select:

<div class="class-mode">

```php
$db->select('users', 'name, created_at')->all();
```

</div>
<div class="functional-mode">

```php
$db->select('users', 'name, created_at')->all();
```

</div>

## WHERE CLAUSES

The `where` method is used to add a `WHERE` clause to our query. It takes a column name, an operator and a value as its arguments. You can also pass in an array of column names and values. Let's look at an example:

<div class="class-mode">

```php
$db
  ->select('users')
  ->where('name', 'John Doe')
  ->fetchObj();

# or

$db
  ->select('users')
  ->where(['name' => 'John Doe'])
  ->fetchObj();
```

</div>
<div class="functional-mode">

```php
db()
  ->select('users')
  ->where('name', 'John Doe')
  ->fetchObj();

# or

db()
  ->select('users')
  ->where(['name' => 'John Doe'])
  ->fetchObj();
```

</div>

## YOUR TASK

We've carried over the solution from the last section. Your task this time is to replace the raw `SELECT` statement with Leaf's query builder. The raw SQL looks like this:

```sql
SELECT * FROM users
```

Using the `select` method, build the query and execute it. This solution should be done at the section with `// 1. New select query here`.
