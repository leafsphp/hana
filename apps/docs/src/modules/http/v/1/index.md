---
title: "Introduction"
aside: none
---

# Leaf Http v1

::: warning
There is no need to manually add the Http module if you're using Leaf 3 since this is done for you automatically.
:::

::: tip 🎊 Http v2 released
We just released Leaf Http v2. It comes with a ton of bug fixes and updated functionality for almost each class. These changes include standardization of some practices and performance upgrades.

[Read the docs](/modules/http/v/2/)
:::

The Leaf Http module contains a bunch of handlers for managing the kinds and methods through which data flows in and out of your application.

The available classes in the Http module are:

- [`Leaf\Http\Request`](/modules/http/v/1/request)
- [`Leaf\Http\Response`](/modules/http/v/1/response)
- [`Leaf\Http\Headers`](/modules/http/v/1/headers)
- [`Leaf\Http\Cache`](/modules/http/v/1/cache)

## Installation

You can install the http module with the [leaf cli](/docs/cli/):

```bash
leaf install http
```

or with composer:

```bash
composer require leafs/http
```

From there you can use any of the classes above in your project.

::: tip
Cookies and session are independent modules which are not added to the Http module. This is because, the use of session and cookies is relatively low in APIs. If you however want to use sessions and cookies, you can read their guides for information on them.
:::

## Request

This is a developer friendly interface which allows you to interact with data coming into your application. [Read the docs](/modules/http/v/1/request)

## Response

This interface allows you to output data from your application in different forms. [Read the docs](/modules/http/v/1/response)

## Headers

This interface allows you to manage headers in your application. [Read the docs](/modules/http/v/1/headers)

## Cache

This interface allows you to manage http cache in your app. [Read the docs](/modules/http/v/1/cache)

## Session (module)

This module allows you to manage session in your application. [Read the docs](/modules/session/)

## Cookies (module)

This module allows you to manage cookies in your application. [Read the docs](/modules/cookies/)
