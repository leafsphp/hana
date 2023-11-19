# Introduction

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

Leaf is a slim and lightweight PHP framework focused on developer experience, usability, and high-performance code. It is a modern PHP framework built to be simple and elegant, yet extremely powerful.

Here's an example:

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->json(['message' => 'Hello World!']);
});

app()->run();
```

## Features

Leaf has a ton of features that make it a great choice for building your next project. Here are some of the features that make Leaf stand out:

- Lightweight
- Super performant
- Easy to learn
- Easy to use

For an in-depth look at Leaf's features, check out the [features page](/docs/introduction/why.html).

## Getting Started

The official guide assumes **basic** level knowledge of PHP.

::: tip Down to the basics

<details>
<summary>😵‍💫 Don't know PHP?</summary>
If you are not familiar with PHP, we recommend that you check out the <a href="https://www.w3schools.com/php/default.asp" target="_blank">W3Schools PHP Tutorial</a> before continuing or use the video below. This is because you will basically be writing PHP code when using Leaf (or any other framework).

<VideoDocs
  title="Introduction to PHP"
  subject="Introduction to PHP"
  description="You can follow along with the video by FreeCodeCamp to learn the basics of PHP."
  link="https://www.youtube.com/embed/OK_JCtrrv-c"
/>
</details>

<details>
<summary>What's a PHP Framework?</summary>
If you are not familiar with the concept of PHP frameworks, you can check out the video below by <a href="https://kinsta.com/" target="_blank">Kinsta</a>.

<VideoDocs
  title="Introduction to PHP Frameworks"
  subject="What Are PHP Frameworks?"
  description="You can follow along with the video below to learn the basics of PHP frameworks."
  link="https://www.youtube.com/embed/pW7Vyr2SW_s"
/>
</details>

:::

### Installation

<VideoDocs
  subject="Watch the leaf 3 installation walkthrough"
  description="Throughout the leaf documentation, you will see video links like the one just below. If you are a visual learner, this gives you another way to follow along with our documentation. We call these the video docs."
  link="https://www.youtube.com/embed/PuOk5xqTIsA"
/>

To quickly get started with Leaf, check out our [installation guide](/docs/introduction/installation.html). This gives you an in-depth explanation of how to set up leaf using various methods.

## Classes vs Functions

Leaf supports two different ways of writing your code:

- Using functional mode which you saw above
- Using class mode which is building your app using Leaf's classes

### Class Mode

If you are familiar with PHP frameworks, you've probably spent a lot of time writing code using classes. Leaf comes with a ton of powerful classes that you can use to build your app. Let's take a look at the code above in class mode.

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/', function () use ($app) {
  $app->response()->json(['message' => 'Hello World!']);
});

$app->run();
```

### Functional Mode

Classes can become annoying and very repetitive, especially because of namespaces. You also sometimes need to worry about variable scoping and re-initializing classes.

For these and many more reasons, Leaf allows you to build your apps entirely using functions. Let's take a look at the code above in functional mode.

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->json(['message' => 'Hello World!']);
});

app()->run();
```

Besides the benefits functional mode gives you on a surface level, it also does a lot of work behind the scenes to make your code more efficient and faster.

## Modes in the docs

The docs are written in both functional and class mode. You can switch between the two modes using the switcher at the top of the page.

![Switcher](https://user-images.githubusercontent.com/26604242/178108346-c9c22a19-6a82-4786-ac3e-00cbfe69cba8.png)

## Leaf modules

Modules are pieces of Leaf's functionality that are available as separate packages. These packages can be installed and used with Leaf to extend its functionality. Most modules are framework agnostic and can be used with other frameworks and libraries, but they are built to work best with Leaf.

You can check out the [modules page](/modules/) to see a list of all the modules available for Leaf.

## Ready for More?

We've briefly introduced the most basic features of Leaf 3 - the rest of this guide will cover them and other advanced features in much finer detail, so make sure to read through it!

## Next Steps

If you are new to Leaf, we strongly recommend reading this page before moving on to the rest of the documentation. It will provide you with a solid foundation on which to build your Leaf knowledge. If you are already familiar with Leaf, feel free to check out the rest of the documentation.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/docs/introduction/installation">
    <h3 class="next-steps-link">Continue the Guide</h3>
    <small class="next-steps-caption">The guide walks you through every aspect of the framework in full details.</small>
  </a>
  <a class="vt-box" href="/docs/introduction/first-app">
    <h3 class="next-steps-link">Follow the Tutorial</h3>
    <small class="next-steps-caption">For those who prefer learning things hands-on. Let's build something real!</small>
  </a>
  <a class="vt-box" href="/codelabs/">
    <h3 class="next-steps-link">Check out CodeLabs</h3>
    <small class="next-steps-caption">Codelabs provides interactive tutorials with in-depth explanations.</small>
  </a>
</div>
