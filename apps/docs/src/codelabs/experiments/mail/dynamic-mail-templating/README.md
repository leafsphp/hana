# Dynamic Emails With Templating

## Base Example

Writing and designing mails everytime you want to send a message to a user can be a major pain. One solution to this is to have an HTML or PHP script written as an email body, but of course this is very messy and unpractical.

In this codelab experiment, we'll be using Leaf Mail, leaf's mail managing package in addition to Leaf Blade templating engine to send dynamic emails.

So first we'll to prepare our system, initialise any needed package before we continue.

```php
<?php
require "vendor/autoload.php";

$app = new Leaf\App;
$mail = new Leaf\Mail;
```

At this point, it will be best to define our view. We're using Leaf Blade templating which is just Leaf's adaptation of [Laravel's Blade Templating Engine](https://laravel.com/docs/5.8/blade), so our files will end with `.blade.php`. I'll name my mail template `mail.php`. In the "real world", meaningful template names are used like `withdrawal_processed` or something along those lines.

### Our Blade View

This is just a really simple sample

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>{{ $title }}</title>
</head>
<body>
	<article>
		<h3>Dear {{ $name }},</h3>
		<p>
			We are glad to announce that you have been employed as {{ $position }} at Leaf PHP
		</p>
		<p>
			Love, The Leaf Team.
		</p>
	</article>
</body>
</html>
```

### The System

Basically, we've created a view which takes in a `$title`, `$name` and `$position`. So, back to our main system, we have to fill these fields and save the whole view into our mail body. Let's see how that works.

**Be sure to read Leaf Blade docs and Leaf Mail docs.**

```php
<?php
require "vendor/autoload.php";

$app = new Leaf\App;
$mail = new Leaf\Mail;

$mail->smtp_connect("host", 0000, true, "username", "password");

$mail->Subject = "Subject";
$mail->Body = "BLADE VIEW HERE";
```

So as you can see, all we have to do is to load the blade view into the `Body` section. That's actually all there is to it. Now let's work with blade a bit. We'll have to configure the directories for our blade views, and their compiled files too, after that, we render and pass in the required variables. 

Note that rendering blade views doesn't output that view, it just returns it, to actually output the view, we have to explicitly use `echo` or Leaf's `renderMarkup`. Thus, we're taking advantage of this.

```php
$app->blade->configure("app/pages", "app/pages/cache");
$body = $app->blade->render("mail", [
	"title" => "Employment",
	"name" => "Michael",
	"position" => "maintainer"
]);
```

Now, our complete view is saved in the `$body` variable, simple right? Now let's patch all what we've done together and send our email.

```php
<?php
require "vendor/autoload.php";

$app = new Leaf\App;
$mail = new Leaf\Mail;

$app->blade->configure("app/pages", "app/pages/cache");
$mail->smtp_connect("host", 0000, true, "username", "password");

$mail->Subject = "Subject";
$mail->Body = $app->blade->render("mail", [
	"title" => "Employment",
	"name" => "Michael",
	"position" => "maintainer"
]);
// other mail fields go here
$mail->send();
```

Dont forget to check Leaf Mail's documentation

<br>

Experiment by <a href="https://mychi.netlify.app" style="font-size: 20px; color: #111;" target="_blank">Mychi Darko</a>
