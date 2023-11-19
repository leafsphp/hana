# Inserting data into a database

In the previous section, we looked at how to use raw queries using the `query` method. Although the `query` method is powerful, it is not the most convenient way to make simple queries. In this section, we will look at Leaf's query builder and how to use it to insert data into a database.

## INSERTING DATA

To insert data, we'll need to start out with Leaf Db's `insert` method. This method takes a table name as its first argument and returns a query builder. The query builder has a number of methods that we can use to build our query. The first method we'll look at is `params`. This method takes a dictionary of column names and values to insert. Let's look at an example:

<div class="class-mode">

```php
$db->insert("users")->params(["username" => "mychi"]);
```

</div>
<div class="functional-mode">

```php
db()->insert("users")->params(["username" => "mychi"]);
```

</div>

This will create the query we need, now all we need to do is execute it. We can do this by calling the `execute` method on the query builder. Let's look at an example:

<div class="class-mode">

```php
$db
  ->insert("users")
  ->params(["username" => "mychi"])
  ->execute();
```

</div>
<div class="functional-mode">

```php
db()
  ->insert("users")
  ->params(["username" => "mychi"])
  ->execute();
```

</div>

One beautiful thing is that although you pass a dictionary to the `params` method, Leaf would automatically use parameter binding on your values. This is very important because it prevents SQL injection attacks.

## YOUR TASK

We've carried over the solution from the last section. Your task this time is to replace the raw `INSERT` statement with Leaf's query builder. The raw SQL looks like this:

```sql
INSERT INTO users (name, email)
VALUES
  ('John Doe', 'johndoe@test.com')
```

Using the `insert` method, build the query and execute it. You can use the `execute` method to execute the query as done in the example above. This solution should be done at the section with `// 1. New insert query here`.
