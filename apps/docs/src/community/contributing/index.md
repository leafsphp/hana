# Contribution Guide

<script setup>
import SponsorsGroup from '/@theme/components/SponsorsGroup.vue'
</script>

Hi! We're really excited that you are interested in contributing to Leaf. Before submitting your contribution, please make sure to take a moment and read through the following guidelines:

- [Development Setup](#development-setup)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Project Structure](#project-structure)

## Development Setup

You will need PHP 7.4 + and [composer](https://getcomposer.org).

After cloning the repo, run:

```bash
leaf install
```

Or with composer:

```bash
composer install
```

## Pull Request Guidelines

We encourage contributions through pull requests on our repositories. Pull requests are usually of 2 types: bug fixes and feature additions. You can open a "draft" pull request to let the community keep track of work you're doing, however, pull requests will only be evaluated if they are marked as "ready for review" and all tests for new features are passing. Any inactive pull requests left in the "draft" state for an extended period will be closed. The following guidelines should be followed when submitting a pull request:

- The `master` branch is just a snapshot of the latest stable release. All development should be done in dedicated branches. **Do not submit PRs against the `master` branch.**

- Checkout a topic branch from the relevant branch, e.g. `v3.x`, and merge back against that branch.

- It's OK to have multiple small commits as you work on the PR - GitHub will automatically squash it before merging.

- If adding a new feature:

  - Add accompanying test case.
  - Provide a convincing reason to add this feature. Ideally, you should open a suggestion issue first with the `suggestion` or `feature request` tag and have it approved before working on it.

- If fixing bug:
  - If you are resolving a special issue, add `(fix #xxxx[,#xxxx])` (#xxxx is the issue id) in your PR title for a better release log, e.g. `update entities encoding/decoding (fix #3899)`.
  - Provide a detailed description of the bug in the PR.

## Project Structure

- **`src`**: contains the source code.

  - **`Exception/`**: contains code for the general leaf exceptions.

    This contains default error states and screens for errors, down-times and the like. It also contains extensible mark-up and logging to keep track of errors. Basically, anything relating to errors.

  - **`Helpers/`**: contains default leaf utilities like the container (DI container).

  - **`App.php`**: contains initializers and main leaf code.

  - **`Config.php`**: class for configuring how leaf behaves.

  - **`functions.php`**: Base functions for functional mode.

  - **`Middleware.php`**: base class for creating leaf middleware.

  - **`View.php`**: view config for leaf.

## Financial Contribution

As a pure community-driven project without any corporate backing, we also welcome financial contributions via OpenCollective.

- [Checkout our sponsor page](/support/)

## Credits

Thank you to all the people who have already code to Leaf!

<SponsorsGroup tier="code" showLabel placement="page" />
