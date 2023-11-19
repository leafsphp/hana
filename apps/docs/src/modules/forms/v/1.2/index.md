---
title: "Forms v1.2"
---

<!-- markdownlint-disable no-inline-html -->
# Leaf Forms

Leaf Form contains methods to simply and quickly handle input from the user.

## Installation

You can quickly install leaf forms using the following composer or the leaf cli.

```bash
leaf install form
```

or with composer

```bash
composer require leafs/form
```

<div class="functional-mode">

## Functional Mode
<!-- <sup><Badge text="New" /></sup> -->

Leaf form now supports leaf 3's functional mode which allows you to simply call the `form` method from anywhere in your code. This returns an instance of the `Leaf\Form` class, so in case you can't use functional mode, simply call your method on `Leaf\Form`.

```php
form()->sanitizeInput(...);
```

</div>
<div class="class-mode">

## Form class

Leaf form can be used by initializing the leaf form class.

```php
$form = new Leaf\Form;
$form->sanitizeInput(...);
```

</div>

## sanitizeInput

sanitizeInput offers basic security for input data, i.e. sanitizing input against SQL injection.

<div class="functional-mode">

```php
$username = form()->sanitizeInput($username);
```

</div>
<div class="class-mode">

```php
$username = $form->sanitizeInput($username);
```

</div>

If you however need better sanitizing, you can check out the [anchor module](/modules/anchor/)

## Form Submit

This creates a form and submits it. You can call it a virtual form. It takes in 3 parameters, the request type, the form action and the form data. Currently, it only supports GET and POST requests.

<div class="functional-mode">

```php
form()->submit("POST", "/book/create", [
  "title" => "Book One",
  "author" => "Mychi"
]);
```

</div>
<div class="class-mode">

```php
$form->submit("POST", "/book/create", [
  "title" => "Book One",
  "author" => "Mychi"
]);
```

</div>

## isEmail

This checks if a field contains an email or not.

<div class="functional-mode">

```php
if (form()->isEmail($field)) {
  echo "This is an email";
}
```

</div>
<div class="class-mode">

```php
if ($form->isEmail($field)) {
  echo "This is an email";
}
```

</div>

## body

This returns all fields passed into a request as an array.

<div class="functional-mode">

```php
$data = form()->body();
```

</div>
<div class="class-mode">

```php
$data = $form->body();
```

</div>

## Validation

Validation is one of the most important features used in many different types of projects. Leaf Forms provides a very simple way to validate fields returned from forms, json data and even urls and files.

### Validate

Validate simply makes sure that the selected parameters pass these validation tests.

Parameters which fail the form validation are saved in the form's errors which can be accessed with `errors()`. So In case the validation fails, `validate` returns false, else true.

<div class="functional-mode">

```php
$validatorSuccess = form()->validate([
  "username" => "username",
  "email" => "email",
  "password" => "required"
]);

if (!$validatorSuccess) {
  response()->exit(form()->errors());
}
```

</div>
<div class="class-mode">

```php
$validatorSuccess = $form->validate([
  "username" => "username",
  "email" => "email",
  "password" => "required"
]);

if (!$validatorSuccess) {
  response()->exit($form->errors());
}
```

</div>

#### Inline validate
<!-- <Badge text="New" /> -->

For single rules, using an array takes up a few more lines and looks a bit clustered. For those cases, you can run your validation rules inline:

<div class="functional-mode">

```php
$validation = form()->validate('firstname', 'nospaces');

if (!$validation) {
  response()->exit(form()->errors());
}
```

</div>
<div class="class-mode">

```php
$validation = $form->validate('firstname', 'nospaces');

if (!$validation) {
  response()->exit($form->errors());
}
```

</div>

### validateData

validateData works pretty much the same way as `validate` except that instead of passing the name of the field you want to validate, you validate the data itself.

<div class="functional-mode">

```php
form()->validateData([
  "mychi.darko" => "validUsername",
  "mychi@leafphp.dev" => "email"
]);
```

</div>
<div class="class-mode">

```php
$form->validateData([
  "mychi.darko" => "validUsername",
  "mychi@leafphp.dev" => "email"
]);
```

</div>

### validateField

This method also allows you validate data, but compared, to the method above, this is much faster.

<div class="functional-mode">

```php
form()->validateField("username", "michael", "validUsername");
```

</div>
<div class="class-mode">

```php
$form->validateField("username", "michael", "validUsername");
```

</div>

### Multiple Rule Validation

You can also pass an array as the rule parameter. If there's more than one rule, both of them will apply. Also, be sure not to use contradictory rules like `number` and `textOnly` or `username` and `email`.

<div class="functional-mode">

```php
form()->validate([
  "username" => "validUsername",
  "email" => "email",
  "password" => ["required", "noSpaces"]
]);

form()->validate('username', 'validUsername');
```

</div>
<div class="class-mode">

```php
$form->validate([
  "username" => "validUsername",
  "email" => "email",
  "password" => ["required", "noSpaces"]
]);

$form->validate('username', 'validUsername');
```

</div>

### Supported rules

This is a list of all supported validate rules

- `required`: field is required
- `number`: must only contain numbers
- `text` : must only contain text and spaces
- `textOnly`: should be text **only**, no spaces allowed
- `validUsername`: must only contain characters 0-9, A-Z and _
- `username`: alias for validUsername
- `email`: must be a valid email
- `noSpaces`: can't contain any spaces
- `max`: max length of a string (requires arguments)
- `min`: min length of a string (requires arguments)
- `date`: string should be a valid date
<!-- <Badge text="New" /> -->

**Note that these rules aren't case-sensitive, so you can type them anyway you prefer, as long as the spelling is the same.**

### Custom Error Messages
<!-- <sup><Badge text="New" /></sup> -->

This has been one of the most sought after features in leaf form, and now it comes pre-packaged in this version. Using custom error messages, you can take your app a step further and define custom error messages in your language of choice. You can do this using the `messages` method.

<div class="functional-mode">

```php
form()->messages('nospaces', '{field} no puede contener espacios');
```

</div>
<div class="class-mode">

```php
$form->messages('nospaces', '{field} no puede contener espacios');
```

</div>

or

<div class="functional-mode">

```php
form()->messages('min', '{field} doit comporter au moins 8 caractères');
```

</div>
<div class="class-mode">

```php
$form->messages('min', '{field} doit comporter au moins 8 caractères');
```

</div>

Note the use of `{field}`. This is a mini template that tells leaf to replace {field} with the current field. So in this case:

<div class="functional-mode">

```php
$validation = form()->validate('password', 'min:8');
```

</div>
<div class="class-mode">

```php
$validation = $form->validate('password', 'min:8');
```

</div>

`{field}` will be replaced with `password`. Leaf form also supports `{value}` and `{params}` which are basically the value of the field being checked and parameters passed into the current rule if any.

In the example above, `{value}` will be the value of `password` which the user passes into request, and `{params}` will be `8`: that's the parameter passed to the `min` rule.

::: warning Note
This only works for in-built rules, for custom rules, you can set your own error message using the `addError` method as done below.
:::

### Create your own rules

Not every project is the same, as such, you might need validation rules which are not available by default in leaf. As such, the `rule` method has been created to give you leeway to write your own validation rules.

*You will need to use `addError` to save error messages when the validation fails.*

<div class="functional-mode">

```php
form()->rule("max", function ($field, $value, $params) {
  if (strlen($value) > $params) {
    form()->addError($field, "$field can't be more than $params characters");
    return false;
  }
});
```

</div>
<div class="class-mode">

```php
$form->rule("max", function ($field, $value, $params) use($form) {
  if (strlen($value) > $params) {
    $form->addError($field, "$field can't be more than $params characters");
    return false;
  }
});
```

</div>

This is an example rule that makes sure that a string isn't longer than it should be. It takes in a `$params` value which is the max length of the string.

To use this rule, you can simply call max and pass a value into the `$params` field using `:`.

<div class="functional-mode">

```php
form()->validate([
  "username" => "max:10",
  ...
```

</div>
<div class="class-mode">

```php
$form->validate([
  "username" => "max:10",
  ...
```

</div>

Adding the params field is not compulsory, you can create a rule that doesn't take a params field like this:

<div class="functional-mode">

```php
form()->rule("required", function ($field, $value) {
  if (($value == "" || $value == null)) {
    form()->addError($field, "$field is required");
    return false;
  }
});
```

</div>
<div class="class-mode">

```php
$form->rule("required", function ($field, $value) use($form) {
  if (($value == "" || $value == null)) {
    $form->addError($field, "$field is required");
    return false;
  }
});
```

</div>

This example doesn't take in any parameters.

### supportedRules

You can also get all the supported rules. This includes custom rules you've created.

<div class="functional-mode">

```php
$formRules = form()->supportedRules();
```

</div>
<div class="class-mode">

```php
$formRules = $form->supportedRules();
```

</div>

### errors

Remember we talked about Leaf Form errors? Leaf Form holds errors for all failed tests, you get all these errors back with `errors()`

<div class="functional-mode">

```php
$validation = form()->validate([
  "username" => "validUsername",
  "email" => "email",
  "password" => ["required", "noSpaces"]
]);

if (!$validation) {
  return form()->errors();
}
```

</div>
<div class="class-mode">

```php
$validation = $form->validate([
  "username" => "validUsername",
  "email" => "email",
  "password" => ["required", "noSpaces"]
]);

if (!$validation) {
  return $form->errors();
}
```

</div>
