# Leaf Password

<!-- markdownlint-disable no-inline-html -->

Password encoding and verification are one of the most important parts of any application. This usually involves a lot of security concerns and can be a pain to implement. Leaf makes this process a lot easier with the password helper.

This module simply helps create and manage passwords, encrypt and verify without any security concerns. It is fully static, as such, can be used from anywhere in your application.

## Installation

You can quickly install a password helper through the leaf cli:

```bash
leaf install password
```

or you can install it via composer:

```bash
composer require leafs/password
```

## spice

Just as the name implies, spice adds a little "spice" to users' passwords. They help make even weak passwords a pain for systems to crack by chaining additional characters to the password before encoding or decoding.

A weak password like `password123` when spiced can become `@X$p0#f&password123` without pressing the user to stick to "Your password should contain numbers, letters and ...".

The `spice` method can both be used to set and get the password spice.

This sets the password spice which will be encrypted based on the hash you set:

```php
use Leaf\Helpers\Password;

Password::spice('#@%7g0!&');
```

**The next examples will assume you've added `use Leaf\Helpers\Password`**

This returns the password spice:

```php
$spice = Password::spice();
```

**Spices are automaticatically chained to all password related stuff, so after setting your spice, you don't need to worry about it.**

## `Password::hash()`

This method basically creates a password hash. It takes in 3 parameters:

- The password to encrypt
- The encryption hash (optional)
- An array of options for the password hash (optional)

```php
$hash = Password::hash('USER_PASSWORD', Password::BCRYPT);
```

The default encryption hash used if none is provided is `Password::DEFAULT` which is `PASSWORD_DEFAULT`.

Also, the most commonly used hashes, BCRYPT and Argon2 are accessible on the Password Helper object as `Password::BCRYPT` and `Password::ARGON2`.

The final options array differs based on the hash you're using. See the [password algorithm constants](https://secure.php.net/manual/en/password.constants.php) for documentation on the supported options for each algorithm.

## `Password::verify()`

Verifying a user’s password has been made really simple thanks to the `verify()` method. Simply pass the plaintext password supplied by the user and compare it to the stored hash, like so:

```php
if (Password::verify($password, $hashedPassword)) {
    // handle user login here
}
```

verify returns true on success and false on failure.

`$hashedPassword` in the following examples refers to the stored hashed password.

## argon 2

Argon2 is one encryption method heavily used by a lot of developers. Although creating and verifying passwords with argon2 is nothing difficult, Leaf makes it even simpler with methods targetting only argon.

### `argon2()`

This is a simply method used to create an Argon2 hash for your password. It takes in 2 parameters, the password to encrypt and the options for the hashing.

```php
$hash = Password::argon2($password, $options);
```

The options parameter is optional, but in case you want to set your own options, see the [password algorithm constants](https://secure.php.net/manual/en/password.constants.php) for documentation on the supported options for Argon2.

### `argon2Verify()`

This method simply checks the validity of an Argon2 hash.

```php
if (Password::argon2Verify($password, $hashedPassword)) {
    // handle user login here
}
```

## BCRYPT

BCRYPT is another hash used widely by a lot of developers, especially since support with BCRYPT has been on longer than other hashes like Argon 2. We just make hashing with BCRYPT even easier than it currently is.

### `bcrypt()`

This is a simply method used to create an BCRYPT hash for your password. It takes in 2 parameters, the password to encrypt and the options for the hashing.

```php
$hash = Password::bcrypt($password, $options);
```

The options parameter is optional, but in case you want to set your own options, see the [password algorithm constants](https://secure.php.net/manual/en/password.constants.php) for documentation on the supported options for BCRYPT.

### `brcyptVerify()`

This method simply checks the validity of an BCRYPT hash.

```php
if (Password::brcyptVerify($password, $hashedPassword)) {
    // handle user login here
}
```
