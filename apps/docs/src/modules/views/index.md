# Frontend

As a backend inclined framework, leaf has always focused on tooling for building APIs and backend applications. However, as frontend frameworks and libraries have become more popular, leaf has also evolved to support some modern frontend tooling which can be used to build amazing full-stack applications.

This section of the docs will cover all the frontend tooling leaf has to offer.

## Templating Engines

Over the years, leaf has had suport for many built-in templating engines. All of these templating engines have first class support in leaf and can be used to build amazing frontend applications. These engines are available as separate packages and can be installed using composer, which means you can use them outside leaf apps as well.

Depending on your needs, you may want to go with a particular templating engine.

| Engine                           | Use case                                     |
| -------------------------------- | -------------------------------------------- |
| [bareui](/modules/views/bareui/) | Blazing fast templating with no compile time |
| [veins](/modules/views/veins/)   | Lightweight but powerful templating engine   |
| [blade](/modules/views/blade/)   | Laravel blade templating engine for leaf     |

### BareUI vs Veins vs Blade

| Engine                           |  Speed  |  Cool Magic  |  Lightweight  | Editor Support |
| -------------------------------- | :-----: | :----------: | :-----------: | :------------: |
| [bareui](/modules/views/bareui/) |    ⚡️   |       ❌      |      ⚡️       |       ⚡️       |
| [veins](/modules/views/veins/)   |    🔥   |       🔥      |      🔥       |       🔥       |
| [blade](/modules/views/blade/)   |    ❌   |       ⚡️      |      🔥       |       ⚡️       |

### Third Party Templating Engines

Although Leaf has some preferred templating engines, you can use any templating engine you want with leaf. Here are some of the most popular templating engines you can use with leaf:

- [Twig](https://twig.symfony.com/)
- [Smarty](https://www.smarty.net/)

You can check out the [third party templating engines](/modules/views/third-party/) section of the docs to learn how to use any templating engine with leaf.

## Asset Bundling

[Vite](https://vitejs.dev/) is a modern build tool for frontend applications. It aims to provide a faster and leaner development experience for modern web projects. Leaf allows you to bundle your CSS and JS assets using vite, using the powerful [leaf-vite](/modules/views/vite/) module.

[> Read the docs](/modules/views/vite/)

## Frontend Frameworks

Leaf has support for some of the most popular frontend frameworks using [Inertia.js](https://inertiajs.com/). Inertia.js is a framework that allows you to create fully client-side rendered, single-page apps, without much of the complexity that comes with modern SPAs. It does this by leveraging Leaf's server-side rendering capabilities.

[> Read the docs](/modules/views/inertia/)
