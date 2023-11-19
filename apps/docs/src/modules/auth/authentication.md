---
title: "Authentication helper"
---

<!-- markdownlint-disable no-inline-html -->
# 🧨 Leaf Authentication

Authentication provides simple methods to help with manual authentication and working with tokens. In v2, Authentication has been added to Leaf Heplers, so it's now just an authentication helper. If you want a much simpler way, you can check out [Simple Auth](/modules/auth/).

## Working with tokens

Leaf provides you with the `JWT` object which includes various methods for creating and parsing token data....but we do not advice directly using the `JWT` object. For this reason, this object has been created to work with all the `JWT` data.

```php
use Leaf\Helpers\Authentication as Auth;

$token = Auth::generateSimpleToken(...);
```

The examples below will all use `Auth::` pointing the example above.

## Authentication methods

Here are the methods you can use on `Authentication`

### generateSimpleToken()

This method generates a new JSON Web Token. It takes 2 arguments. check out JWT for more info on JWT params

- (int) - A user id to encode
- (string) - A secret phrase to encode with the token

```php
$token = Auth::generateSimpleToken(24', 'LEAF PHP SECRET CODE 1442');
```

### generateToken()

This method generates a new JSON Web Token: the same as `generateSimpleToken`, the only difference is that this method gives you more control over the token i.e. expiry time and custom fields. This method takes in 2 params, the entire `payload` of your JWT and a secret phrase. check out JWT for more info on JWT payload params.

- (array) - JWT payload
- (string) - A secret phrase to encode with the token

```php
$payload = [
  'iat' => time(),
  'iss' => 'localhost',
  'exp' => time() + (15*60),
  'userId' => $user_id,
  'username' => $username
];

$token = Auth::generateToken($payload, "secret phrase");
```

### validateToken()

This method is used to confirm the identity of a token from an authorization header.

```php
$payload = Auth::validateToken("SECRET PHRASE");
```

If the token is valid, it returns the decoded `payload`. So if we encode a payload:

```php
$payload = [
  'iat' => time(),
  'iss' => 'localhost',
  'exp' => time() + (15*60),
  'userId' => $user_id,
  'username' => $username
];
```

We can retrieve this payload by calling

```php
$payload = Auth::validateToken("SECRET PHRASE");

$username = $payload["username"];
```

If the validation fails, it returns `null`, you can get any error by calling the `errors` method.

```php
$payload = Auth::validateToken("SECRET PHRASE"); // returns null if failed

if (!$payload) {
  $response->exit(Auth::errors());
}
```

### validate()

This method is used to confirm the identity of a token. Unlike `validateToken`, the token to validate is directly passed into it. Just like `validateToken`, it returns the token's `payload`

```php
$payload = Auth::validate($token, "SECRET PHRASE");

$username = $payload["username"];
```

If the validation fails, it returns `null`, you can get any error by calling the `errors` method.

```php
$payload = Auth::validate($token, "SECRET PHRASE"); // returns null if failed

if (!$payload) {
  $response->exit(Auth::errors());
}
```

### getBearerToken()

This method is used to get the bearer token from an authorization header. It returns `false` if there's no token. You can then use the `errors` method to retrieve any errors.

```php
$token = Auth::getBearerToken();

// if there are any errors
if (!$token) {
  echo Auth::errors();
}
```

### getAuthorizationHeader()

This method is used to an authorization header. Returns `null` if anything goes wrong.

```php
$authHeader = Auth::getAuthorizationHeader();
```
