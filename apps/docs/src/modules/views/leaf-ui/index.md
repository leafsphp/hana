<!-- markdownlint-disable no-inline-html -->

# Leaf UI <sup class="vt-badge warning">Beta</sup>

Leaf UI is a PHP library that allows you to build modern web apps and scaffold dynamic and interactive UIs using the same PHP you already know and love. It's fast, easy, and fun. Leaf UI follows the component-based UI paradigm, which makes it simple to build reusable components that sync with the DOM automatically.

<!-- You can use Leaf UI to build anything from simple UIs to full-blown apps, including SSR (server-side rendering), static websites, PWAs (progressive web apps), hybrid mobile apps for Android and iOS, and even Electron apps. -->

This guide only covers how to use Leaf UI in your Leaf apps. For a more detailed explanation of how Leaf UI works, including explanations of its core principles and concepts, check out the [Leaf UI documentation](https://ui.leafphp.dev).

## Installation

You can quickly install Leaf UI with the Leaf CLI:

```bash
leaf install ui
```

Or with composer:

```bash
composer require leafs/ui
```

## Getting Started

To get started, you need to create a new Leaf UI component. A component is a reusable piece of your website or app's UI, such as a header, sidebar, or button. A component includes HTML markup and the business logic needed to make that markup interactive. You can think of a component as a self-contained module that encapsulates its own functionality, which can then be reused throughout your website or app. You can also pass data into a component, making it more dynamic and reusable. Check out the [Leaf UI documentation](https://ui.leafphp.dev/docs/essentials/components.html) for more information on components.

To create a new component, we need to add a new class. Let's create a new component called `HelloWorld`:

```php
<?php

use Leaf\UI\Component;

class HelloWorld extends Component
{
    public $key = 'HelloWorld';

    public function render()
    {
        return <<<HTML
            <body>
                <h1>Hello World!</h1>
            </body>
        HTML;
    }
}
```

We can make this component more dynamic by passing data into our view. Let's add a `greeting` property and a `sayHello()` method to our component and use it in our markup:

```php
<?php

use Leaf\UI\Component;

class HelloWorld extends Component
{
    public $key = 'HelloWorld';
    public $greeting = 'Hello World!';

    public function sayHello()
    {
        $this->greeting = 'Hi World!';
    }

    public function render()
    {
        return <<<HTML
            <body>
                <h1>{{ $greeting }}</h1>
                <button @click="sayHello">Say Hello</button>
            </body>
        HTML;
    }
}
```

## Rendering Components

Now that we have our component, we can use it in our Leaf app. Let's create a new route and return our component. We can do this by calling `render()` on the `UI` class and passing in our component:

<div class="class-mode">

```php
<?php

use Leaf\UI;

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/HelloWorld.php'; // our component

$app = new Leaf\App;

$app->get('/', function() {
    UI::render(new HelloWorld());
});

$app->run();
```

</div>

<div class="functional-mode">

```php
<?php

use Leaf\UI;

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/HelloWorld.php'; // our component

app()->get('/', function() {
    UI::render(new HelloWorld());
});

app()->run();
```

</div>
