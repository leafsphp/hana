# Leaf Mail

<!-- markdownlint-disable no-inline-html -->

Mailing in PHP apps has always been seen as a daunting task. Leaf Mail provides a simple, straightforward and efficient email API that is built on the widely used [PHPMailer Library](https://github.com/PHPMailer/PHPMailer) component.

With Leaf Mail, you can easily send emails using various drivers and services such as SMTP, Mailgun, SendGrid, Amazon SES, and sendmail. This flexibility enables you to swiftly begin sending emails through a preferred local or cloud-based service.

## Installation

You can install leaf mail using the leaf cli:

```bash
leaf install mail
```

or with composer:

```bash
composer require leafs/mail
```

## Setting Up

Leaf Mail provides a `Mailer` class that is responsible for validating and sending emails. This class handles the connection to your mail server, the configuration for how to send your emails and the actual sending of emails.

<div class="class-mode">

It also provides a `Mail` class that is responsible for creating and formatting emails. Most of the time, you'll be using the `Mail` class to create and send emails.

</div>
<div class="functional-mode">

It also provides a `mailer()` method that is responsible for creating and formatting emails. Most of the time, you'll be using the `mailer()` method to create and send emails.

</div>

***Note that you need to setup the connection to your mail server using the `Leaf\Mail\Mailer` class before sending your emails.***

## Mail Server Connection

The `Leaf\Mail\Mailer` class is responsible for connecting to your mail server and handling the sending emails. It provides a `connect()` method that you can use to connect to your mail server.

The `connect()` method takes in an array of configuration options that you can use to configure your mail server connection. The configuration options are:

| Param    | Use case                                     |
| -------- | -------------------------------------------- |
| host     | Hostname for your mail server                |
| port     | Port for your mail server                    |
| security | Any encryption supported by PHPMailer        |
| auth     | Auth for your mail server                    |

### Gmail connection example

Gmail is one of the most popular mail servers. Unfortunately, a connection with your email and password is no longer supported, so you will need to use OAuth. You will need to add an OAuth provider like [league/oauth2-google](https://github.com/thephpleague/oauth2-google) to your project.

```bash
leaf install league/oauth2-google

# or with composer

composer require league/oauth2-google
```

From there you can create your connection like this:

```php
use Leaf\Mail\Mailer;
use League\OAuth2\Client\Provider\Google;
use PHPMailer\PHPMailer\OAuth;
use PHPMailer\PHPMailer\PHPMailer;

...

Mailer::connect([
  'host' => 'smtp.gmail.com',
  'port' => 465,
  'security' => PHPMailer::ENCRYPTION_SMTPS,
  'auth' => new OAuth(
    [
      'userName' => 'mail@gmail.com',
      'clientSecret' => 'CLIENT_SECRET',
      'clientId' => 'CLIENT_ID',
      'refreshToken' => 'GMAIL_REFRESH_TOKEN',
      'provider' => new Google(
        [
          'clientId' => 'CLIENT_ID',
          'clientSecret' => 'CLIENT_SECRET',
        ]
      ),
    ]
  )
]);
```

### SMTP connection example

The example above uses OAuth, however, some mail servers also support using a username/password for connections. Here's an example of connecting to Mailtrap using SMTP:

```php
use Leaf\Mail\Mailer;
use PHPMailer\PHPMailer\PHPMailer;

...

Mailer::connect([
  'host' => 'smtp.mailtrap.io',
  'port' => 2525,
  'security' => PHPMailer::ENCRYPTION_STARTTLS,
  'auth' => [
    'username' => 'MAILTRAP_USERNAME',
    'password' => 'MAILTRAP_PASSWORD'
  ]
]);
```

## Mailer config

The `Mailer` class provides a `config()` method that you can use to configure your mail server connection. The configuration options are:

| Param    | Use case                                                                                                                                                            |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| debug    | Enable or disable debug mode. Supported values are 'SERVER', `false` or any value supported by PHPMailer's `SMTPDebug` config                                       |
| defaults | This config is used to set default values for the `recipientEmail`, `recipientName`, `senderEmail`, `senderName`, `replyToName`, and `replyToEmail` of your emails. |
| keepAlive | This config is used to keep the connection to your mail server alive. This is useful if you are sending multiple emails. It takes in a boolean.                    |

```php
Mailer::config([
  'keepAlive' => true,
  'debug' => 'SERVER',
  'defaults' => [
    'recipientEmail' => 'name@mail.com',
    'recipientName' => 'First Last',
    'senderName' => 'Leaf Mail',
    'senderEmail' => 'mychi@leafphp.dev',
  ],
]);
```

*Setting your defaults allows you to send your mails without having to configure sender/receiver mails for every mail.*

## Your first mail

Now that we've gotten all the annoying config out of the way, all that's left is the easy part: sending your mails.

<div class="class-mode">

To send your first mail, you'll need to create a new instance of the `Leaf\Mail` class. It takes in an array used to create your email:

```php
$mail = new \Leaf\Mail([
  'subject' => 'Leaf Mail Test',
  'body' => 'This is a test mail from Leaf Mail using gmail',
  
  // next couple of lines can be skipped if you
  // set defaults in the Mailer config
  'recipientEmail' => 'name@mail.com',
  'recipientName' => 'First Last',
  'senderName' => 'Leaf Mail',
  'senderEmail' => 'mychi@leafphp.dev',
]);

// Send your mail
$mail->send();
```

You can also use the `create()` method to create your mail:

```php
$mail = \Leaf\Mail::create([
  'subject' => 'Leaf Mail Test',
  'body' => 'This is a test mail from Leaf Mail using gmail',
  
  // next couple of lines can be skipped if you
  // set defaults in the Mailer config
  'recipientEmail' => 'name@mail.com',
  'recipientName' => 'First Last',
  'senderName' => 'Leaf Mail',
  'senderEmail' => 'mychi@leafphp.dev',
]);

// Send your mail
$mail->send();
```

</div>
<div class="functional-mode">

To send your first mail, you'll need to call the `create()` method returned from `mailer()`. It takes in an array used to create your email:

```php
mailer()
  ->create([
    'subject' => 'Leaf Mail Test',
    'body' => 'This is a test mail from Leaf Mail using gmail',
    
    // next couple of lines can be skipped if you
    // set defaults in the Mailer config
    'recipientEmail' => 'name@mail.com',
    'recipientName' => 'First Last',
    'senderName' => 'Leaf Mail',
    'senderEmail' => 'mychi@leafphp.dev',
  ])
  ->send();
```

</div>

This is a full list of the parameters you can use to create your mail:

| Param           | Use case                                                                                      |
| :-------------- | :--------------------------------------------------------------------------------------------- |
| subject         | The subject of your email                                                                    |
| body            | The body of your email                                                                       |
| recipientEmail  | The email of the person you're sending the mail to                                           |
| recipientName   | The name of the person you're sending the mail to                                            |
| senderName      | The name of the person sending the mail                                                      |
| senderEmail     | The email of the person sending the mail                                                     |
| replyToName     | Add a name for your "Reply-To" address                                                       |
| replyToEmail    | Add a "Reply-To" address                                                                      |
| cc              | The email of the person you want to carbon copy                                               |
| bcc             | The email of the person you want to blank carbon copy                                         |
| isHTML          | A boolean value that determines if your mail is HTML or not                                   |
| altBody         | This body can be read by mail clients that do not have HTML email capability such as mutt & Eudora. Clients that can read HTML will view the normal Body                       |

## Adding Attachments

You can add attachments to your mail using the `attach()` method. It takes in an array of attachment data or just a string containing a single attachment. The attachment data is an array containing the following keys:

<div class="class-mode">

```php
$mail = new \Leaf\Mail([
  'subject' => 'Leaf Mail Test',
  'body' => 'This is a test mail from Leaf Mail using gmail',
]);

$mail->attach('./attachment.txt');
$mail->attach([
  './file1.txt',
  './file2.txt'
]);

$mail->send();
```

</div>
<div class="functional-mode">

```php
mailer()
  ->create([
    'subject' => 'Leaf Mail Test',
    'body' => 'This is a test mail from Leaf Mail using gmail',
  ])
  ->attach('./attachment.txt')
  ->attach([
    './file1.txt',
    './file2.txt'
  ])
  ->send();
```

</div>

## Error handling

In order not to flood your application with logs and errors, Leaf Mail gathers all errors thrown by the mail server, and saves them internally. You can return all errors with `$mail->errors()`

```php
if (!$mail->send(...)) {
  return $mail->errors();
}
```
