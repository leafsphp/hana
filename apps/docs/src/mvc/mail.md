# Mailing

Leaf provides amazing support for handling mailing in your application via Leaf Mail. The documentation for the Leaf Mailer module can be found on the [Leaf Mail page](/modules/mail/). This page will only cover how to use Leaf Mail in your Leaf MVC or Leaf API application.

If you haven't already, we recommend you read the [Leaf Mail documentation](/modules/mail/) before continuing.

## Setting up Leaf Mail

Leaf MVC and Leaf API provide a lean setup out of the box that comes without mailing pre-activated. To activate mailing, you can run the following command in the root of your app:

```bash
php leaf mail:setup
```

This will setup everything you need to start using mailing and will also create a `mail.php` file in your `config` folder. This file contains all the configuration options for Leaf Mail. You can read more about the configuration options in the [Leaf Mail documentation](/modules/mail/#mailer-config).

## Mail server connection

After setting up Leaf Mail, the next thing to do is to connect to your mail server. This connection is what Leaf Mail will attempt to use whenever you initiate an email send.

Before you can connect to your mail server, you need to have your mail server credentials. You can get these from your mail server provider.

### Your mail provider

If you are using a mail provider like Mailgun, Sendgrid, etc, you need to head over to your provider's dashboard and get your mail server credentials. From there, you need to update the mail host and port in your `.env` file.

```env
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
```

There are different kinds of server connections you can use. The most common one is SMTP using a username and password. You can also use OAuth authentication with a provider like Google.

### Connection with username and password

To connect to a server using your username and password, you can head over to your `.env` file and update the following values:

```env
MAIL_USERNAME=null
MAIL_PASSWORD=null
```

These are your mail server username and password respectively. **Note that these values are not set by default**. You need to set them yourself.

### Connection with OAuth

Some mail providers like Google require OAuth authentication. To connect to a server using OAuth, you need to add an OAuth provider like league/oauth2-google to your project. You can install this using the Leaf CLI:

```bash
leaf install league/oauth2-google
```

Or with composer:

```bash
composer require league/oauth2-google
```

From there, you need to update the `config/mail.php` file to work with OAuth instead of username and password. You can do this by replacing these lines:

```php
'auth' => [
    'username' => _env('MAIL_USERNAME'),
    'password' => _env('MAIL_PASSWORD'),
],
```

With the OAuth config:

```php
use League\OAuth2\Client\Provider\Google;
use PHPMailer\PHPMailer\OAuth;

return [
  ...
  
  'auth' => new OAuth(
    [
      'userName' => _env('MAIL_USERNAME'),
      'clientSecret' => _env('MAIL_CLIENT_SECRET'),
      'clientId' => _env('MAIL_CLIENT_ID'),
      'refreshToken' => _env('MAIL_REFRESH_TOKEN'),
      'provider' => new Google(
        [
          'clientId' => _env('MAIL_CLIENT_ID'),
          'clientSecret' => _env('MAIL_CLIENT_SECRET'),
        ]
      ),
    ]
  ),
  
  ...
];
```

Since more environment variables have been added, you need to update your `.env` file to include these variables:

```env
MAIL_CLIENT_ID=
MAIL_CLIENT_SECRET=
MAIL_REFRESH_TOKEN=
```

::: tip .env.example
It is a good practice to add these variables to your `.env.example` file so that other developers can easily know what environment variables they need to set.
:::

## Sending emails

Before you can send emails, you need to create a mailer. You can create a mailer by running the following command in the root of your app:

```bash
php leaf mail:create <mailer-name>
```

A mailer is a class that allows you to group related emails together. Mailers have methods called "actions" which are responsible for handling a specific type of email. For instance, you can create a mailer called `UserMailer` that has a `welcome` action for sending welcome emails, a `passwordReset` action for sending password reset emails, etc.

Using this example, we can create a `UserMailer` by running the following command:

```bash
php leaf mail:create user
```

This will create a `UserMailer` class in your `app/mailers` folder. The `UserMailer` class will look like this:

```php
<?php

namespace App\Mailers;

use Leaf\Mail;

class UserMailer
{
  public static function action($user)
  {
    return new Mail([
      'subject' => 'UserMailer Test',
      'body' => 'This is a test mail from action',
      'recipientEmail' => $user->email,
      'recipientName' => $user->name,
  
      // next couple of lines can be skipped if you
      // set defaults in the config/mail.php file
      'senderName' => _env('MAIL_SENDER_NAME'),
      'senderEmail' => _env('MAIL_SENDER_EMAIL'),
    ]);
  }
}
```

You can rename the `action` method to anything you want, in this case we will rename it to `welcome`. The method is responsible for creating and returning a new `Mail` instance. The `Mail` instance is what is used to send the email. You can read more about the `Mail` class in the [Leaf Mail documentation](/modules/mail/#mailer-config).

```php
<?php

namespace App\Mailers;

use Leaf\Mail;

class UserMailer
{
  public static function welcome($user)
  {
    return new Mail([
      'subject' => 'Welcome to my app',
      'body' => 'This is a test mail from action',
      'recipientEmail' => $user->email,
      'recipientName' => $user->name,
    ]);
  }
}
```

To send the welcome email, you can call the `welcome` method on the `UserMailer` class like this:

```php
UserMailer::welcome($user)->send();
```

## Setting mail defaults

Some values like the `senderName` and `senderEmail` are repeated in every email you send although they may not change. To avoid repeating these values, we set them as defaults in the `config/mail.php` file. You can configure these in your `.env` file like this:

```env
MAIL_SENDER_NAME=
MAIL_SENDER_EMAIL=
MAIL_REPLY_TO_NAME=
MAIL_REPLY_TO_EMAIL=
```

### Removing defaults

If you don't want to set defaults, you can remove them from the `config/mail.php` file. The `.env` values will then be ignored. Your updated `config/mail.php` file will look like this:

```php
...
'defaults' => [],
...
```

Removing these defaults means that you will have to set these values in every email you send.

## Mail Debugging

Leaf Mail by default reports all errors from your mail server. This is useful for debugging, but can be annoying when you are in production. You can disable this by setting the `MAIL_DEBUG` environment variable to `false` in your `.env` file.

```env
MAIL_DEBUG=false
```

## Mail Config

The `config/mail.php` file contains all the configuration options for Leaf Mail. You can read more about the configuration options in the [Leaf Mail documentation](/modules/mail/#mailer-config).

```php
<?php

/*
|--------------------------------------------------------------------------
| Mail Config
|--------------------------------------------------------------------------
|
| This file contains the configuration for your mailer.
|
| You can link your environment variables to this file by using the
| _env() helper function. This function will return the value set in
| your .env file. You can use the below settings as a reference.
|
*/

return [
    /*
    |--------------------------------------------------------------------------
    | Mail driver
    |--------------------------------------------------------------------------
    |
    | This tells leaf mail which mail driver to use.
    |
    */
    'driver' => _env('MAIL_DRIVER', 'smtp'),

    /*
    |--------------------------------------------------------------------------
    | Mailer hostname
    |--------------------------------------------------------------------------
    |
    | This is the hostname for your mailer
    |
    */
    'host' => _env('MAIL_HOST', 'smtp.mailtrap.io'),

    /*
    |--------------------------------------------------------------------------
    | Mailer port
    |--------------------------------------------------------------------------
    |
    | Port to use for mailer connection
    |
    */
    'port' => _env('MAIL_PORT', 2525),

    /*
    |--------------------------------------------------------------------------
    | Keep Alive
    |--------------------------------------------------------------------------
    |
    | This config is used to keep the connection to your mail server alive.
    | This is useful if you are sending multiple emails. It takes in a boolean.
    |
    */
    'keepAlive' => true,

    /*
    |--------------------------------------------------------------------------
    | Mailer Debug
    |--------------------------------------------------------------------------
    |
    | Enable or disable debug mode. Supported values are:
    | 'SERVER', false or any value supported by PHPMailer's
    | SMTPDebug config
    |
    */
    'debug' => _env('MAIL_DEBUG', 'SERVER'),

    /*
    |--------------------------------------------------------------------------
    | Mailer Encryption
    |--------------------------------------------------------------------------
    |
    | This is the encryption used for your mailer. Supported values are:
    | 'STARTTLS' or any value supported by PHPMailer's SMTPSecure config
    |
    */
    'security' => _env('MAIL_ENCRYPTION', 'STARTTLS'),

    /*
    |--------------------------------------------------------------------------
    | Auth
    |--------------------------------------------------------------------------
    |
    | This config handles the authentication details for your mailer.
    | It supports authentication with username and password and also
    | OAuth authentication.
    |
    | For OAuth authentication, you will need to add an OAuth
    | provider like league/oauth2-google to your project.
    |
    | An example OAuth config is shown below:
    |
    | use League\OAuth2\Client\Provider\Google;
    | use PHPMailer\PHPMailer\OAuth;
    |
    | 'auth' => new OAuth(
    |   [
    |     'userName' => 'mail@gmail.com',
    |     'clientSecret' => 'CLIENT_SECRET',
    |     'clientId' => 'CLIENT_ID',
    |     'refreshToken' => 'GMAIL_REFRESH_TOKEN',
    |     'provider' => new Google(
    |       [
    |         'clientId' => 'CLIENT_ID',
    |         'clientSecret' => 'CLIENT_SECRET',
    |       ]
    |    ),
    |  ]
    |)
    */
    'auth' => [
        'username' => _env('MAIL_USERNAME'),
        'password' => _env('MAIL_PASSWORD'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Default addresses
    |--------------------------------------------------------------------------
    |
    | This config is used to set default values for the
    | `recipientEmail`, `recipientName`,
    | `senderEmail`, `senderName`,
    | `replyToName`, and `replyToEmail` of your emails.
    |
    */
    'defaults' => [
        'senderName' => _env('MAIL_SENDER_NAME'),
        'senderEmail' => _env('MAIL_SENDER_EMAIL'),
        'replyToName' => _env('MAIL_REPLY_TO_NAME'),
        'replyToEmail' => _env('MAIL_REPLY_TO_EMAIL'),
    ],
];
```
