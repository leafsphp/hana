# Why Leaf

When it comes to building web applications, there are numerous tools and frameworks at your disposal. Nevertheless, we are convinced that Leaf is the optimal selection for developing powerful, web applications and APIs.

## The problems

While PHP frameworks can make web development faster and more efficient, there are some potential challenges or drawbacks to using them, including:

- ***Learning curve***: Most PHP frameworks have a steep learning curve, especially for developers who are new to the language or the framework's conventions.

- ***Performance overhead***: Some PHP frameworks can add unnecessary performance overhead, due to the additional abstraction layers and features they provide.

- ***Code maintenance***: Most frameworks require adhering to specific coding standards and conventions, which can make maintenance and updates more challenging if you are not already familiar with those standards.

- ***Limited flexibility***: PHP frameworks can be more rigid than writing code from scratch, as they may require you to adhere to specific coding standards and conventions. This can limit your flexibility in terms of how you structure your code and handle specific use cases.

- ***Compatibility with other systems***: Most PHP frameworks are bound to a particular ecosystem and make it difficult to randomly pick and use packages which don't have support for the framework you are using.

- ***Packing a ton of unused code/packages***: Just about every PHP framework out there adds a ton of complexity to your applications in the form of unused code, classes and packages. This in turn leads to bloat and ultimately a drop in performance

## How Leaf tackles these

Leaf 3 provides a bunch of features that aim to tackle these common problems found in just about every PHP framework out there.

### Low barrier to entry

Leaf is the easiest framework to learn with PHP newbies building powerful leaf apps in a few minutes of reading the docs/watching out tutorial videos. All you truly need to get started with Leaf is basic PHP knowledge and optional but recommended knowledge on some backend concepts like JWT auth and more.

### Lightweight

Leaf 2 was lightweight and fast enough to be considered one of the most lightweight but powerful frameworks around, and Leaf 3 makes leaf 2 look like a joke. Leaf 3 can now be considered the most lightweight PHP framework with a source of about 30kb and allows you to build full apps and APIs which end up less than 20mb including user dependencies (leaf api). This is a big haul compared to other frameworks which require dependencies and tons of files which end up more than 100mb.

![image](https://user-images.githubusercontent.com/26604242/146754044-4c71c4ec-7b37-4c85-9c8b-56e8c2b54831.png)

> a comparison with slim - slim (left) - leaf (right)

### Enables high developer productivity

A whole lot of research and testing has been done to build amazing features which allow developers to focus on only what they need: their apps. Leaf 3 has put tons of strategies together to create the best developer experience known to PHP. From things like removing class initializers and creating global functions which allow you call classes from anywhere in your application, modules and other amazing leaf features.

### Powered by [modules](/modules/)

Leaf 3 and its ecosystem are heavily powered by modules, which are simply pieces of leaf's functionality shipped into independently installable libraries. Modules help make leaf even more lightweight and help developers only deal with features which they need in their applications. This means that you only install what you need.

### Easy to use features

As mentioned above, a lot of research has gone into the developer experience for leaf 3 and one aspect was to make our existing features more performant and easier to use. We employed various strategies like modeling some features after popular libraries in other languages and frameworks. For instance, the API for leaf cors is almost an exact replica of the expressjs cors middleware.

### Library/Framework compatibility

Since the beginning of Leaf, we've set out to create code which could easily be integrated with other libraries and frameworks. No matter how powerful leaf is, we try to base of everything we do on simple concepts as opposed to other frameworks which need things like providers in order to access framework features in libraries.

### Scalability

One of the most beautiful things about leaf is that, no matter what package you're using with leaf, if it works in development, it will definitely work in production with near zero config, unless you want some special features. Leaf provides a core and other frameworks/libraries that build around leaf. This makes leaf appropriate for almost any project no matter it's size.
