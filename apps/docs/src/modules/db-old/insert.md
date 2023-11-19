---
aside: none
---

<!-- markdownlint-disable no-inline-html -->
# Inserting Data

Leaf DB has provided really simple, but very helpful methods for inserting data into the database.

<!-- -->

## db insert

### Saving data

We user `$db->insert` to save data in the database. `insert` takes in a "table" to insert data, "column(s)" and "value(s)":

```php
$db->insert("posts", "title", "This is post One");
```

You can also add multiple columns like so:

```php
$db->insert("posts", "title, body", "post One, This is the body of post One");
```

#### Using Prepared Statements

Prepared statements help protect against SQL injection,...

```php
$db->insert("posts", "title, body", "?, ?", ["post One, This is the body of post One"]);
```

<hr>

## Db add

`add` simply offers a more consice, powerful way to retrieve data from a database. It also uses prepared statements by default, so you're safe in that respect.

Instead of several parameters in `$db->insert`, `$db->add` takes in an array with key-value pairs to be saved in the database.

```php
$db->add("posts", ["title" => "Post One", "body" => "This is the body"]);

// $db->add($table, $params_to_insert);
```

### Uniques

Let's say you want to check whether the username a user just entered has been taken, you'd have to write a bunch of conditional code, making the code count larger and more error prone, right?

Well, `add` solves this problem smoothly. `add` has a 3rd parameter: an array of unique values which makes sure that the same value can't be saved twice.

```php
$db->add("users", ["name" => "mychi", "email" => "m@m.com", "pass" => "1234"], ["name", "email"]);
```

So, we're telling `add` to alert us if someone has already registered with the name `mychi` or the email `m@m.com`. This is because we passed `["name", "email"]` as the 3rd param to `add`

**With uniques, you can cut down on your whole app:**
For instance, if you know the exact data you'll be receiving in your app, let's say a username, email and password from a register form, you can do something like this:

```php
$app->post("/register", function () use($app, $db) {
  $db->add("users", $app->request->body(), ["username", "email"]);
});
```

So, we pass in the entire request body, which contains the username, email and password. Simple right?

#### Validation

`add` also has inbuilt validation which validates parameters according to set rules. This uses the [`Leaf\Form->validate`](/modules/forms/) method. You can check it out for more information on validation.

`add` takes in a 4th parameter which is a boolean, this is whether of not to validate the data passed into `add` using the default checks.

By default, `add` validates values with the keys: `email`, `username` and any other field is marked as `required`. If any of the validations fail, an error is raised. You can turn this feature off:

```php
$db->add("posts", ["title" => "Post One", "body" => "..."], ["title"], false);
```

#### Custom Validation

This is the 5th parameter of `add`. These are custom rules that you set to validate.

```php
$db->add("posts", ["title" => "Post One", "body" => "..."], ["title"], false, [
  "author" => "validUsername"
]);
```

Here, we're telling `add` that the **author** parameter should be a valid username. If thiscondition(rule) is not met, the application throws an error and breaks.

You can view all validation rules [here](/modules/forms/#validation)

```php
$db->add($table, $params, $uniques, $defaultChecks, $validation);
```
