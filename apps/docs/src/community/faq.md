# Frequently Asked Questions

## Who maintains Leaf?

Leaf is an independent, community-driven project. It was created by [Michael Darko](https://github.com/mychidarko) in 2019 as a personal side project. Today, Leaf is actively maintained by [a team of both full-time and volunteer members from all around the world](/community/team), where Michael serves as the project lead. You can find Leaf's history [here](/community/history).

Leaf's development is primarily funded through sponsorships and personal contributions from Michael and friends. If you or your business benefit from Leaf, consider [sponsoring us](/support/) to support Leaf's development!

## What license does Leaf use?

Leaf is a free and open source project released under the [MIT License](https://opensource.org/licenses/MIT).

## Is Leaf reliable?

After going through 2 major versions over the past 2 years, Leaf is now a battle-tested framework suitable for just about any PHP project. It is also one of the most popular lightweight PHP micro-frameworks and even has it's variant - Leaf API being a very popular framework.

Leaf is used by individuals for large and personal projects, as well as by companies all over the world.

## Is Leaf fast?

Leaf 3 is one of the most performant and lightweight PHP frameworks today. It is also 100% compatible with standard PHP libraries and servers, which means there's almost no need for configurations and manual optimizations.

In sample benchmarks, Leaf even out-performs frameworks like Slim PHP which was considered the most lightweight PHP micro-framework with blazing speed.

## Is Leaf lightweight?

As mentioned above, Leaf 3 is one of the most lightweight PHP frameworks with a source of about 30kb. With Leaf 3's functional mode, a hello world application can be prepared in just 10 lines of code, including spaces and PHP initializers.

## What's the difference between Leaf 2 and Leaf 3?

Leaf 3 is the current, latest major version of Leaf. It contains new features that are not present in Leaf 2 (most notably functional mode and modules), and also contains a few breaking changes that makes it incompatible with Leaf 2. Despite the differences, the majority of Leaf APIs are shared between the two major versions, so almost all of your Leaf 2 knowledge will continue to work in Leaf 3.

In general, Leaf 3 provides smaller bundle sizes, better performance, better scalability, and better IDE support. If you are starting a new project today, Leaf 3 is the recommended choice. The only reason for you to consider Leaf 2 as of now is if you feel Leaf 3 is too modular, of course this is solved if you use Leaf 3 with Leaf MVC or Leaf API.

Since both Leaf 2 and 3 are wired to accept any PHP code, all external libraries usable in Leaf 2 will still work perfectly with Leaf 3. If you intend to migrate an existing Leaf 2 app to Leaf 3, consult the dedicated Leaf 3 Migration Guide.

Leaf 2 will receive a final minor release (2.7) in 2022. This minor release will backport a selected subset of new features from Leaf 3. After that, Leaf 2 will enter maintenance mode: it will no longer ship new features, but will continue to receive critical bug fixes and security updates.

## Does Leaf scale?

Yes. Despite a common misconception that Leaf is only suitable for simple use cases, Leaf is perfectly capable of handling large scale applications:

- [Skeleton](https://skeleton.leafphp.dev) provides a base setup which holds your hand through separation of concerns. It provides a partial MVC setup which allows for incremental adoption.

  ::: warning Remember
  This is not a framework.
  :::

- [Leaf API](https://api.leafphp.dev) is an MVC framework bootstrapped with Leaf at it's core. It uses the [MVC architecture](https://towardsdatascience.com/everything-you-need-to-know-about-mvc-architecture-3c827930b4c1) to ensure separation of concerns. Leaf API is specially crafted to aid rapid developement of powerful but scalable APIs.

- [Leaf MVC](https://mvc.leafphp.dev) just like Leaf API is a framework built with leaf that relies on the MVC architecture. The main difference is leaf MVC comes with tools which aid in building fullstack web apps/APIs. This makes Leaf MVC more general purpose, compared to the one-track API machine: Leaf API.

As you see above, all of these setups/frameworks are built using leaf as their core. Leaf can fit into any environment depending on how you use it.

## How do I contribute to Leaf?

We appreciate your interest! Please check out our [Contribution Guide](/community/contributing/).

<!-- ## What's the difference between Leaf 2 and Leaf 3?

Please refer to the [dedicated Leaf 2 vs. Leaf 3 FAQ](./v2-faq). -->

<!-- ## TODO How does Leaf compare to Laravel? -->

<!-- ## TODO How does Leaf compare to Slim? -->
