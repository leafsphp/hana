---
title: "Leaf Db v1"
---

# 💽 Leaf Db
<!-- markdownlint-disable no-inline-html -->

Leaf Db is a new lightweight but powerful query builder which allows you quickly write dynamic queries, validate and perform operations on the data in just a single line of code.

You can install Leaf Db with Leaf CLI:

```bash
leaf install db
```

Or with composer:

```bash
composer require leafs/db
```

From there, you can link your database and start writing some awesome queries.

## Db Connection

The first thing to always do is to connect to your database. Since all db operations are performed on the database, you can't do without it.

There are 3 ways to connect your database.

### connect on init

This method connects to the database when initializing Leaf Db.

```php
$db = new Leaf\Db("db_host", "user", "password", "db_name");
```

### connect

Connect takes in 4 params just like the method above

```php
$db = new Leaf\Db;
$db->connect("db_host", "user", "password", "db_name");
```

### autoConnect

This method allows you to connect to your database from parameters in a `.env` file. Most MVC frameworks and other libraries rely on a `.env` for a lot of configurations including the database. With `autoConnect`, you can directly pick up these configs.

**example env:**

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=LeafMVC
DB_USERNAME=root
DB_PASSWORD=
```

**App:**

```php
$db = new Leaf\Db;
$db->autoConnect();
```

## Queries

### Making simple queries

Leaf Db provides a ton of functionality, with a bunch of powerful tools, but at the same time gives you a great deal of customizations with the `query` method. You can write your raw SQL queries with the `query` method, however you can still use the cool features Leaf Db provides.

```php
$users = $db->query("SELECT * FROM users")->all();
```

You can also use parameter binding with `query`

```php
$db->query("SELECT * FROM users WHERE id = ?")->bind("1")->fetchObj();
```

A shorter method would be to use `where`

```php
$db->query("SELECT * FROM users")->where("id", "1")->fetchObj();
```

You don't have to worry about security, `where` uses prepared statements by default, so you're pretty good.

You've seen all this, but guess what? There's something even shorter

```php
$db->select("users")->where("id", "1")->fetchObj();
```

This is what Leaf Db does for you. A new way to write your Database queries without actually needing to write any real queries. Also, unlike other query builders, there's no need to create classes and models for every table you want to fetch from. Everything's accessible with one line of code.

## select

As you saw in the example above, `select` makes writing select statements really simple.

It takes in 2 parameters:

- The table to select items from
- The columns to include (includes all by default)

```php
// returns all items
$items = $db->select("items")->all();

// returns the username & email of all buyers
$buyers = $db->select("buyers", "username, email")->fetchAll();
```

### where

The where method allows you to quickly write a where block.

```php
$user = $db->select("users")->where("username", "mychi")->first();
```

You can also pass in a bunch of params to check for:

```php
$user = $db->select("users")->where(["username" => "mychi", "password" => "..."])->first();
```

### orWhere

`orWhere` also functions just like `where`, except that in the case of multiple parameters, `orWhere` returns results even if one of the conditions is met, but `where` only returns results if all the conditions are matched.

```php
$users = $db->select("users")->orWhere(["username" => "mychi", "username" => "darko"])->all();
```

### whereLike

`whereLike` is technically the same as `where`, except that instead of comparing stuff "strictly equal", it finds something `like` the value, using the like operator.

```php
$items = $db->select("items")->whereLike("title", "c%")->all();
```

This finds any item with a title that starts with c. `%` can be used to modify how the `LIKE` comparism is done, however if you're not sure about the % works, leaf has Db helpers for you.

```php
// item begins with ...
whereLike("title", Db::beginsWith("char"))

// item ends with ...
whereLike("title", Db::endsWith("char"))

// item includes ...
whereLike("title", Db::includes("char"))

// item starts and ends with ...
whereLike("title", Db::word("char", "ter"))
```

### like

This is an alias for `whereLike`. So you can use `like` instead of `whereLike`

### orWhereLike

This combines `orWhere` and `whereLike` in a sense that `orWhereLike` compares using `OR` instead of `AND`, just like `orWhere`, but instead uses the LIKE operator just as `whereLike` does. The interesting thing is that you can combine it with any other where block to make a more complex query.

```php
$items = $db->select("items")
            ->where("published", true)
            ->whereLike("title", $db->beginsWith("sa"))
            ->orWhereLike("description", $db->beginsWith("sa"))
            ->all();
```

### orLike

This is an alias for `orWhereLike`. So you can use `orLike` instead of `orWhereLike`

## Getting your data

After the query is run, the data is returned to leaf db. You can use the methods below to retrieve that data.

### fetchAll

`fetchAll` is a method that's used together with the `select` method. This method simply returns an array consisting of a lot of objects. It is mostly used when querying multiple rows.

```php
$items = $db->select("items")->fetchAll();
```

Although the query here is `$db->select("items")`, running just this would return nothing. To actually get the result of this query, you'd need to call `execute`, `fetchObj`, `fetchAssoc` or `fetchAll`

### all

`all` is an alias for `fetchAll`, but is shorter and more familiar with devs who have used other packages. Don't worry, `fetchAll` isn't getting deprecated, you can use it just as you've always done.

### first

`first` returns the first entity of all matching results for a certain query.

```php
function getFirstItem()
{
  // ...
  return $db->select("items")->first();
}
```

### last

`last` returns the last entity of all matching results for a certain query.

```php
function getLastItem()
{
  // ...
  return $db->select("items")->last();
}
```

### execute

This method is used on queries which don't return anything like insert, update and delete queries. This method just runs the desired query and returns `void`, however, if there is a problem, it returns `null`. You can then call `$db->errors()` to get the exact error.

From v2.4-beta up, execute takes in an **optional** parameter, the type of values passed into `bind`, `params` or `where`

```php
$db->insert("users")->params(["username" => "mychi"])->execute("s");
```

### fetchObj

This is just like `fetchAll` except that fetchObj is used on select queries usually involving one row

```php
$db->select("users")->where("id", "1")->fetchObj();
```

If `fetchAll` is used in this case, the result would look something like this:

```php
[
  [
    "id" => "1"
  ]
]
```

Also, note that `fetchObj` returns an object, so you can use the result like this

```php
$user = $db->select("users")->where("id", "1")->fetchObj();
$user->id // not $user["id"]
```

### fetchAssoc

This is just like the `fetchObj` method, except that it returns an associative array, not an object.

```php
$user = $db->select("users")->where("id", "1")->fetchAssoc();
$user["id"]; // not $user->id
```

## Table operations

### table

`table` sets the table pointer for the db table being used. `table` can be combined with other methods like `search`.

```php
$db->table("items");
```

### search

Just as the name implies, you can use this method to search for a value in the database table. It is used with the `table` method.

```php
$res = $db->table("items")->search("name", "chocola");
```

This will try to find an item which has chocola in it's name field.

## insert

`Insert` provides a much simpler syntax for making insert queries.

```php
$db->insert("users") // faster than $db->query("INSERT INTO users")
```

### params

This method is used on `insert` and `update` just like how `where` is used on `select` and `delete`.

```php
$db->insert("users")->params("username", "mychi");
```

To actually run this query, you have to call `execute`.

```php
$db->insert("users")->params("username", "mychi")->execute();
```

This inserts a user with a username of mychi into the users table. But what if you wanted to add more params, simple!

```php
$db->insert("users")->params([
  "username" => "mychi",
  "email" => "mychi@leafphp.dev"
])->execute();
```

You're free to arrange this query anyhow you see fit, it's still considered as a single chain.

```php
$db->insert("users")
   ->params([
     "username" => "mychi",
     "email" => "mychi@leafphp.dev",
     "password" => md5("test")
   ])
   ->execute();
```

What if you already registered someone with the username mychi, this tiny flaw could break your authentication system. That's where `unique` comes in🧐

### unique

Just as the name implies, `unique` helps prevent duplicates in your database, fun fact, just chain one more method for this functionality🤗

```php
$db->insert("users")
   ->params([
     "username" => "mychi",
     "email" => "mychi@leafphp.dev",
     "password" => md5("test")
   ])
   ->unique("username", "email")
   ->execute();
```

If you have a 100 unique values, don't feel shy, just line them all up.

```php
->unique("username", "email", "what-not", ...)
```

Alternatively, you could just pack a truck load full of uniques in an array

```php
->unique(["username", "email", "what-not", ...])
```

## update

Quickly write an update query.

```php
$db->update("users")->params("location", "Ghana")->where("id", "1")->execute();
```

This is generally how an update looks like. Just like with insert, you can add up uniques to make sure you don't have duplicates in your database.

**you can chain in unique here as well.**

## delete

Let's jump straight in for an example.

```php
$db->delete("users")->execute();// careful now🙂
```

This code above, ladies and gentlemen, will wipe all your users resulting in 7 digit loses🤞

```php
$db->delete("users")->where("id", "1")->execute();
```

You have succesfully deleted user 1

## Extras

At this point, there's still a whole lot you can do with Leaf Db.

There are times when you have to insert data you don't know about. What happens if your user enters unsupported info. To fix this, you'll have to run a bunch of checks to find out what kind of information is being saved, but what if you could validate data before saving without writing any extensive validation? Well...prepare to be amazed🧐

### validate

Validate makes sure that correct information is saved in your database. You simply need to chain the `validate` method.

```php
$db->insert("users")
   ->params([
     "username" => "mychi",
     "email" => "mychi@leafphp.dev",
     "password" => md5("test")
   ])
   ->validate("username", "validUsername")
   ->execute();
```

Validate takes in 2 parameters, a field to validate and a validation rule. You can find all the validation rules and what they do [here](/modules/forms/#multiple-rule-validation). So what if you need to validate more than 1 parameter?

```php
$db->insert("users")
   ->params([
     "username" => "mychi",
     "email" => "mychi@leafphp.dev",
     "password" => md5("test")
   ])
   ->validate([
     "username" => "validUsername",
     "email" => "email"
   ])
   ->execute();
```

Amazing right?!

### hidden

Not all information which is retrieved from the database is sent over to the client side or is added to the session or cookies. Usually, some fields are left out for "security" reasons. `hidden` returns the retrieved data without the `hidden` fields.

```php
$db->select("users")->hidden("remember_token", "reset_q_id")->fetchAll();
```

```php
$db->select("users")->where("id", "1")->hidden("remember_token", "reset_q_id")->fetchObj();
```

### add

That's right, just imagine doing the opposite of `hidden`, instead of hiding fields from the query data, `add` lets you add your own fields into the query data.

::: tip NOTE
This does not touch your database, it only appends a field into the data returned from the database.
:::

```php
$db->select("users")->add("tx_id", gID())->fetchAll();
```

This query adds a `tx_id` field with a value generated from `gID` to every user

```php
$db->select("users")->where("id", "1")->add("tx_id", "d362d7t2366")->fetchObj();
```

This is similar as the query above, except that this query is on the scale of a single user.

### bind

We've already seen `bind` in action, but we've not actually talked about it. This method allows you to bind parameters into your query.

```php
$db->select("users WHERE username = ?")->bind("mychi")->fetchAssoc();
```

And yet again another syntax🧐 As said above, Leaf  Db is highly customizable, and allows you to write queries in a way that suits you. This statement above binds `mychi` to the username.

```php
$db->select("users WHERE username = ? AND password = ?")->bind("mychi", "password")->fetchAssoc();
```

You can just pass multiple parameters into bind, as many as satisfy your query. If you feel more comfortable with arrays, you can use arrays.

```php
$db->select("users WHERE username = ? AND password = ?")->bind(["mychi", "password"])->fetchAssoc();
```

### orderBy

orderBy allows you to arrange the query results according to a row, in ascending (asc) or descending (desc) order.

```php
// if second param is not provided, desc is used by default
$items = $db->select("items")->orderBy("created_at")->all();

... orderBy("id", "desc")->all();
```

### limit

When retrieving data from your database for use in applications, you might want to show only a specific number of values.

```php
$itemsPerPage = 15;
$items = $db->select("items")->limit($itemsPerPage)->fetchAll();

// you can use limit and orderBy together
$items = $db->select("items")->orderBy("id", "desc")->limit($itemsPerPage)->fetchAll();
```

### error handling

Errors come up all the time, user errors, that is. What happens when validation fails, or if someone has already registered a username. Leaf Db provides a simple way to track these errors.

```php
$res = $db->insert("users")->params("username", "mychi")->unique("username")->execute();
if ($res === false) $app->response->exit($db->errors());
```

Using `$db->errors()` returns an array holding any errors which caused the query to fail. eg:

```php
[
  "email" => "email already exists",
  "username" => "username can only contain characters 0-9, A-z and _"
]
```
