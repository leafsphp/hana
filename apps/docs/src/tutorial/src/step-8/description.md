# Validating request data

Different apps require different kinds of information, for instance, your app may require a phone number and password to sign in, but another may require an email and password to sign in. In some cases, users may be able to pass in whatever data they think of directly into your apps. This is even more true in case your leaf app is an API. For this reason, you should always validate or verify the data that is passed into your app.

Leaf once again makes this process simple. We will use the leaf form module to write validation rules for our data. To get started with leaf form, <span class="class-mode">you can use the `Leaf\Form` class.</span><span class="functional-mode">you can simply call the `form` function from anywhere in your app</span>

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/', function () use($app) {
  $rules = Leaf\Form::supportedRules();
  $app->response()->json($rules);
});

$app->run();
```

</div>
<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  $rules = form()->supportedRules();
  response()->json($rules);
});

app()->run();
```

</div>

For this exercise, we've populated some data which will be passed into your app in the `request.json` file. You can edit this to get different data in your app. We'll also be using different validation rules against this data.

## VALIDATION RULES

Leaf comes with some default validation rules, if you run the code above, then you'd already know some of these rules. If you haven't already done so, the code above returns all the supported validations rules leaf has by default. Throughout this exercise, we'll be using different validation rules to validate our data.

<details>
<summary>Validation rule list</summary>

| Validation rule     |  Purpose                                     |
|:--------------------|:---------------------------------------------|
| required            | field is required                             |
| number              | must only contain numbers                    |
| text                | must only contain text and spaces            |
| textOnly            | should be text only, no spaces allowed       |
| validUsername       | must only contain characters 0-9, A-Z and _  |
| username            | alias for validUsername                      |
| email               | must be a valid email                        |
| noSpaces            | can't contain any spaces                     |
| max                 | max length of a string (requires arguments)  |
| min                 | min length of a string (requires arguments)  |
| date                | string should be a valid date                |

::: tip Note
These rules are **NOT** case-sensitive, so you can type them anyway you prefer, as long as the spelling is the same.
:::

</details>

## VALIDATING OUR DATA

We've looked at all the default validation rules, but you might be asking how we can actually use these to validate our data. We can do this by calling the `validate` method on leaf form.

::: tip request.json
This is the data we're passing into our app.

```json
{
  "name": "Michael Darko",
  "country": "Ghana",
  "city": "Accra",
  "email": "mychi@leafphp.dev"
}
```

:::

<div class="class-mode">

```php{8-11}
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/', function () use($app) {
  $isValid = Leaf\Form::validate([
    'email' => 'email',
    'name' => 'text',
  ]);

  $app->response()->json(
    $isValid ? 'success' : Leaf\Form::errors()
  );
});

$app->run();
```

</div>
<div class="functional-mode">

```php{6-9}
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  $isValid = form()->validate([
    'email' => 'email',
    'name' => 'text',
  ]);

  response()->json(
    $isValid ? 'success' : form()->errors()
  );
});

app()->run();
```

</div>

We passed an array into the `validate` function above. The array tells the `validate` function what rule to run against what data. The `email` rule is run against the email field we passed to make sure it's a valid email. In the same way, we're running the `text` method against the name field to make sure that it only contains text and spaces. You can try this out in the editor.

If you want the validation to fail, you can edit the `data` in the `request.json` file with invalid data.

## MULTIPLE VALIDATION RULES

So far, we've only looked at validating data against a single rule. But what if we want to validate data against multiple rules? We can do this by passing an array of rules into the `validate` function. For example, we can validate the email field against the `email` and `required` rules.

```php
'email' => ['required', 'email'],
```

You can add as many rules as you want to the array, however, the order of the rules matter. If you want to validate a field against the `required` rule first, then you should put the `required` rule first in the array. You should also be sure not to use conflicting rules. For example, you can't use the `textOnly` rule and the `number` rule together.

## VALIDATION RULE ARGUMENTS

Some rules require some form of argument to work. For example, the `max` rule requires an argument to work. The argument tells the `max` rule how long the string should be. For example, if we want to validate the name field against the `max` rule, we can do this by passing the `max` rule an argument of `10`.

```php
'username' => 'max:10',
```

To pass a rule an argument, you simply add a `:` after the rule name and then add the argument. This also applies to the `min` rule.

## YOUR TASK

Your task is to write validation rules for the data below.

- **name** - Should be text with spaces only
- **country** - Should be required,
- **city** - Should be required,
- **email** - Should be a valid email

Sample data has already been provided in the `request.json` file. You can edit this to get different data in your app.

## BONUS: CREATE YOUR OWN RULE

Leaf Form has rules for the most used kinds of validation, however, you may need your validation rules to work in ways not specified by Leaf. For this reason, we've added functionality to create your own validation rules.

To create your own rule, you can use the `rule` method on the <span class="class-mode">`Leaf\Form` class</span><span class="class-mode">`form` method</span>. `rule` takes two arguments, the first is the name of the rule and the second is a callback function.

Let's create a rule that checks if a string contains a word passed in.

<div class="class-mode">

```php
Leaf\Form::rule("contains", function ($field, $value, string $params) {
  if (strpos($value, $params) === false) {
    Leaf\Form::addError($field, "$field must contain $params");
    return false;
  }
});
```

</div>
<div class="functional-mode">

```php
form()->rule("contains", function ($field, $value, string $params) {
  if (strpos($value, $params) === false) {
    form()->addError($field, "$field must contain $params");
    return false;
  }
});
```

</div>

You might have also noticed the `addError` method in the code above. This method is used to add an error to the error list. It takes two arguments, the first is the field name and the second is the error message. You can use this method to add your own custom error messages.

After this, we can use our rule just like any other:

```php
'username' => 'contains:Leaf',
```

This section only brushed through creating your custom rules, you can [read the docs](/modules/forms/v/1.2/#create-your-own-rules) for more info.
