# Helper Methods

Leaf Auth already has methods that cater for most of your authentication use-cases, however, you may have a flow that is more complex than what Leaf Auth offers, for this reason, Leaf Auth provides low-level helper methods that allow you build auth flows from the ground up.

## Working with JWTs

According to the [JWT docs](https://jwt.io/introduction), JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

In authentication, you can use JWTs as an identifier that a user has successfully logged in. The JWT usually also contains information about the authenticated user, usually the user's id. Leaf auth has helpers for interacting with JWTs. We'll take a look at them in this document.

## Generating JWTs

Leaf provides multiple ways for generating JWTs.

- ### Using the `generateSimpleToken` method

  The simplest method is to use the `generateSimpleToken` method on the `Leaf\Helpers\Authentication` class. This method takes in 3 parameters:

  - The user id of the currently authenticated user
  - The jwt secret string
  - The jwt expiry time in seconds

  ```php
  use Leaf\Helpers\Authentication;

  // ... your application code

  Authentication::generateSimpleToken(
      $userId,
      'MY_JWT_SECRET_STRING',
      time() + 3600
  );
  ```

- ### Using the `generateToken` method

  The `generateToken` method on the `Leaf\Helpers\Authentication` class is a more advanced method for generating JWTs. It takes in 2 parameters:

  - An array of claims to be added to the JWT
  - The JWT secret string

  ```php
  use Leaf\Helpers\Authentication;

  // ... your application code

  Authentication::generateToken(
      [
          'user_id' => $userId,
          'iat' => time(),
          'iss' => 'localhost',
          'exp' => time() + 3600,
      ],
      'MY_JWT_SECRET_STRING'
  );
  ```

## Getting JWTs from the request

Tokens from authenticated requests are usually sent in the `Authorization` header. Leaf Auth provides helpers that allow you directly pull in tokens from the request header.

### Using the `getAuthorizationHeader` method

Leaf Auth provides the `getAuthorizationHeader` helper method for getting the token from the request header. It returns null if no authorization header is found.

```php
use Leaf\Helpers\Authentication;

$header = Authentication::getAuthorizationHeader();
```

### Using the `getBearerToken` method

Leaf Auth provides the `getBearerToken` helper method for getting the token from the request header. It returns null if no bearer token is found.

```php
use Leaf\Helpers\Authentication;

$token = Authentication::getBearerToken();
```

## Verifying JWTs

Verifying JWTs is a very important step in the authentication process. Tokens can be tampered with, they can also expire, or be issued by an untrusted source. For this reason, you should always verify the token before using it.

Leaf Auth provides 2 methods for verifying JWTs.

- ### Using the `validateToken` method

This method automatically checks if there is a token in the request header, and if there is, it verifies the token. It returns the decoded token if the token is valid, and returns false if the token is invalid.

It takes in a single parameter, which is the JWT secret string. This secret string should be the same as the one used to generate the token.

```php
use Leaf\Helpers\Authentication;

$data = Authentication::validateToken($secret);
```

Note that this method will automatically return false if there is no token in the request header. You can use the `errors` method to get the error message which is why the token validation failed.

```php
use Leaf\Helpers\Authentication;

$data = Authentication::validateToken($secret);

if (!$data) {
    $errors = Authentication::errors();
}
```

- ### Using the `validate` method

Unlike the `validateToken` method, this method does not automatically check for a token in the request header. It takes in 2 parameters:

- The token to be validated
- The JWT secret string

```php
use Leaf\Helpers\Authentication;

$token = Authentication::getBearerToken();
$data = Authentication::validate($token, $secret);
```

Just like the `validateToken` method, this method returns the decoded token if the token is valid, and returns false if the token is invalid. You can use the `errors` method to get the error message which is why the token validation failed.

```php
use Leaf\Helpers\Authentication;

$token = Authentication::getBearerToken();
$data = Authentication::validate($token, $secret);

if (!$data) {
    $errors = Authentication::errors();
}
```
