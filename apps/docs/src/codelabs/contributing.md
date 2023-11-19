<!-- markdownlint-disable no-inline-html -->

# Contributing

## What we are looking for

The Codelab section gives developers examples to work off of that both cover common or interesting use cases, and also progressively explain more complex detail. Our goal is to move beyond a simple introductory example, and demonstrate concepts that are more widely applicable, as well as some caveats to the approach.

If you're interested in contributing, please initiate collaboration by filing an issue under the tag **`codelabs experiment`** with your concept so that we can help guide you to a successful pull request. After your idea has been approved, please follow the template below as much as possible. Some sections are required, and some are optional. Following the numerical order is strongly suggested, but not required.

Experiments should generally:

- Solve a specific, common problem
- Start with the simplest possible example
- Introduce complexities one at a time
- Link to other docs, rather than re-explaining concepts
- Describe the problem, rather than assuming familiarity
- Explain the process, rather than just the end result
- Explain the pros and cons of your strategy, including when it is and isn't appropriate
- Mention alternative solutions, if relevant, but leave in-depth explorations to a separate experiment

We request that you follow the structure below. We understand, however, that there are times when you may necessarily need to deviate for clarity or flow.

### What Are We Building? <sup class="vt-badge bg:red text:white">required</sup>

1. Define the problem you are trying to solve in a few sentences.
2. Explain the simplest possible solution in a sentence or two.
3. Show a small code sample.

### Pre-requisites <sup class="vt-badge bg:red text:white">required</sup>

1. List any pre-requisites for this pattern to work.
2. Be sure to link the relevant documentation.

### Setup for the tutorial <sup class="vt-badge bg:red text:white">required</sup>

Demonstrate how to setup a project for your experiment. This is required for every experiment.

### Cautions <sup class="vt-badge text:white">optional</sup>

It's extremely helpful to write add a section about any potential pitfalls or gotchas. This is especially important for more advanced experiments. If you're not sure what to write here, you can leave it out.

### What to avoid <sup class="vt-badge text:white">optional</sup>

PHP is a language with many ways to solve a problem, and it's important to explain why you've chosen the approach you have. This section should be used to explain why other approaches are not recommended. This section is not required, but heavily recommended.

### Custom titles <sup class="vt-badge text:white">optional</sup>

You can use custom titles for your sections if you feel it helps the flow of your experiment. This is not required, but can be helpful.

## Template

We've provided a template below that you can copy and paste into a new file. You can add the details in the sections as you see fit. If you have any questions, please file an issue and we'll be happy to help. If you have an idea for a codelab, please file an issue with the tag **`codelabs experiment`**.

```md
# Experiment Title

::: warning Version support
Version support. You should also add if it requires a particular PHP version.
:::

## What Are We Building?

You can give an overview followed by a real world example of what you will be doing and how it helps.

::: details (For beginners)
You can add beginner info in collapsible blocks like this so advanced users don't have to read everything.
:::

## Pre-requisites

You need to know this and that to follow this tutorial.
You need to have this and that installed.

## Setup for the Tutorial

Add this section only if this tutorial requires a special setup.

## Cautions (if any)

Remember to link any relevant document or resource.

## (Your title for body)

You can use subtitles and anything you need to convey your tutorial effectively to the user.

<br>

Experiment by **Name**
```

## Thank you

It takes time to contribute to documentation, and if you spend the time to submit a PR to this section of our docs, you do so with our gratitude.
