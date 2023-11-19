---
title: "Forms v1"
---

<!-- markdownlint-disable no-inline-html -->
# 🎢 Leaf Forms

Leaf Form contains methods to simply and quickly handle input from the user.

## Installation

You can quickly install leaf forms using the following composer or the leaf cli.

```bash
composer require leafs/form v1.1
```

or

```bash
leaf install form@1.1
```

## sanitizeInput

sanitizeInput offers basic security for input data, i.e. sanitizing input against SQL injection.

```php
$username = Form::sanitizeInput($username);
```

If you however need better sanitizing, you can check out the [anchor module](/modules/anchor/)

## Form Submit

This creates a form and submits it. You can call it a virtual form. It takes in 3 parameters, the request type, the form action and the form data. Currently, it only supports GET and POST requests.

```php
Form::submit("POST", "/book/create", [
  "title" => "Book One",
  "author" => "Mychi"
]);
```

## isEmail

This checks if a field contains an email or not.

```php
if (Form::isEmail($field)) {
  echo "This is an email";
}
```

## body

This returns all fields passed into a request as an array.

```php
$data = Form::body();
```

## Validation

Validation is one of the most important features used in many different types of projects. Leaf Forms provides a very simple way to validate fields returned from forms, json data and even urls and files.

### Validate

Validate simply makes sure that the selected parameters pass these validation tests.

Parameters which fail the form validation are saved in the form's errors which can be accessed with `errors()`. So In case the validation fails, `validate` returns false, else true.

```php
$validatorSuccess = Form::validate([
  "username" => "username",
  "email" => "email",
  "password" => "required"
]);

if (!$validatorSuccess) {
  response()->exit(Form::errors());
}
```

### validateData

validateData works pretty much the same way as `validate` except that instead of passing the name of the field you want to validate, you validate the data itself.

```php
Form::validateData([
  "mychi.darko" => "validUsername",
  "mychi@leafphp.dev" => "email"
]);
```

### validateField

This method also allows you validate data, but compared, to the method above, this is much faster.

```php
Form::validateField("username", "michael", "validUsername");
```

### Multiple Rule Validation

You can also pass an array as the rule parameter. If there's more than one rule, both of them will apply. Also, be sure not to use contradictory rules like `number` and `textOnly` or `username` and `email`.

```php
Form::validate([
  "username" => "validUsername",
  "email" => "email",
  "password" => ["required", "noSpaces"]
]);
```

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
- `max`: max length of a string (require arguments)
- `min`: min length of a string (require arguments)

**Note that these rules aren't case-sensitive, so you can type them anyway you prefer, as long as the spelling is the same.**

### Create your own rules

Not every project is the same, as such, you might need validation rules which are not available by default in leaf. As such, the `rule` method has been created to give you leeway to write your own validation rules.

*You will need to use `addError` to save error messages when the validation fails.*

```php
Form::rule("max", function ($field, $value, $params) {
  if (strlen($value) > $params) {
    Form::addError($field, "$field can't be more than $params characters");
    return false;
  }
});
```

This is an example rule that makes sure that a string isn't longer than it should be. It takes in a `$params` value which is the max length of the string.

To use this rule, you can simply call max and pass a value into the `$params` field using `:`.

```php
Form::validate([
  "username" => "max:10",
  ...
```

Adding the params field is not compulsory, you can create a rule that doesn't take a params field like this:

```php
Form::rule("required", function ($field, $value) {
  if (($value == "" || $value == null)) {
    Form::addError($field, "$field is required");
    return false;
  }
});
```

This example doesn't take in any parameters.

### supportedRules

You can also get all the supported rules. This includes custom rules you've created.

```php
$formRules = Form::supportedRules();
```

### errors

Remember we talked about Leaf Form errors? Leaf Form holds errors for all failed tests, you get all these errors back with `errors()`

```php
$validation = Form::validate([
  "username" => "validUsername",
  "email" => "email",
  "password" => ["required", "noSpaces"]
]);

if (!$validation) return Form::errors();
```
