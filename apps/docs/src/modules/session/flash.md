<!-- markdownlint-disable no-inline-html -->
# Leaf Flash

Session flash messages are temporary messages that are stored in the session and displayed to the user for a short duration, usually just until they are shown once. These messages are commonly used to provide feedback or notifications to the user after a specific action or event, such as successfully completing a form submission, encountering an error, or performing a specific operation.

Leaf session provides a simple interface for creating and managing flash messages. Flash messages are stored in the session and can be retrieved and displayed in the view.

## Config

Leaf Flash comes with a default configuration that works out of the box. However, you can change the configuration to suit your needs. You can skip this section if you're using the default configuration.

Using the `config()` method, you can change where Leaf stores flash messages in session, the keys for messages and saved content. The available options are:

- key: The key to save flash array in session. Default: `leaf.flash`,
- default: The key for default flash messages. Default: `message`,
- saved: The key for saved flash messages. Default: `leaf.flashSaved`,

<div class="functional-mode">

```php
flash()->config([
  'key' => 'my_flash_items'
]);

flash()->set('This is my message');

// logging $_SESSION
=> ['my_flash_items' => ['message' => 'This is my message']]
```

</div>
<div class="class-mode">

```php
use Leaf\Flash;

Flash::config([
  'key' => 'my_flash_items'
]);

Flash::set('This is my message');

// logging $_SESSION
=> ['my_flash_items' => ['message' => 'This is my message']]
```

</div>

**Flash searches for an existing session and creates one if there's no active session.**

## Adding a new flash

Leaf Flash provides a `set()` method for adding new flash messages to the session. The `set()` method accepts two arguments:

- The item to flash
- The key to save it under. The key is optional and defaults to `message`.

<div class="functional-mode">

```php
flash()->set('This is my message');
flash()->set('This is my message', 'info');

// accepts different types of data
flash()->set($userObject);
flash()->set($userArray);
flash()->set($userString);
flash()->set($userInt);
```

</div>
<div class="class-mode">

```php
Leaf\Flash::set('This is my message');
Leaf\Flash::set('This is my message', 'info');

// accepts different types of data
Leaf\Flash::set($userObject);
Leaf\Flash::set($userArray);
Leaf\Flash::set($userString);
Leaf\Flash::set($userInt);
```

</div>

Leaf flash allows you to keep multiple flash messages at the same time. They won't be removed until you show them. To do this, you will need to set different keys for each flash message.

<div class="functional-mode">

```php
flash()->set('This is my message', 'info');
flash()->set('This is my message', 'error');
flash()->set('This is my message', 'success');
```

</div>
<div class="class-mode">

```php
Leaf\Flash::set('This is my message', 'info');
Leaf\Flash::set('This is my message', 'error');
Leaf\Flash::set('This is my message', 'success');
```

</div>

## Displaying a flash message

Leaf Flash provides a `display()` method that you can use to retrieve your session flash. As soon as the flash message is retrieved, it is removed from the session which means it won't show on the next load.

<div class="functional-mode">

```php
flash()->set('message 1');
flash()->set('message 2', 'info');

echo flash()->display(); // message 1
echo flash()->display('info'); // message 2
```

</div>
<div class="class-mode">

```php
Leaf\Flash::set('message 1');
Leaf\Flash::set('message 2', 'info');

echo Leaf\Flash::display(); // message 1
echo Leaf\Flash::display('info'); // message 2
```

</div>

## Remove a flash message

The `unset()` method allows you to remove a flash message. Note that flash messages are automatically removed when you display them, so you might never need to use this method.

<div class="functional-mode">

```php
flash()->unset();
flash()->unset('info'); // unset a specific flash message
```

</div>
<div class="class-mode">

```php
Leaf\Flash::unset();
Leaf\Flash::unset('info'); // unset a specific flash message
```

</div>

## Permanent flash messages

Flash also allows you to create a message that stays in session till it is manually removed. You can add permanently stored flash data using the `save()` method. Note that unlike regular flashes, there can be only one saved flash message.

<div class="functional-mode">

```php
flash()->save('This is my message');
```

</div>
<div class="class-mode">

```php
Leaf\Flash::save('This is my message');
```

</div>

## Removing saved flash messages

You can use the `clearSaved()` method to remove saved flash messages.

<div class="functional-mode">

```php
flash()->clearSaved();
```

</div>
<div class="class-mode">

```php
Leaf\Flash::clearSaved();
```

</div>

## Displaying saved flash messages

You can use the `displaySaved()` method to display saved flash messages.

<div class="functional-mode">

```php
echo flash()->displaySaved();
```

</div>
<div class="class-mode">

```php
echo Leaf\Flash::displaySaved();
```

</div>
