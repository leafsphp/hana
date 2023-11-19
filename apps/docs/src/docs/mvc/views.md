# Views

<!-- markdownlint-disable no-inline-html -->

Views make up the 'V' in MVC. Views allow you to separate your logic from your presentation layer instead of mixing them together in a single file. This allows you to easily change the look and feel of your application without having to change any of your logic.

## View Engines

Leaf comes with support for 3 view engines designed by the team at Leaf:

| Engine                           | Use case                                     |
| -------------------------------- | -------------------------------------------- |
| [bareui](/modules/views/bareui/) | Blazing fast templating with no compile time |
| [veins](/modules/views/veins/)   | Lightweight but powerful templating engine   |
| [blade](/modules/views/blade/)   | Laravel blade templating engine for leaf     |

Leaf MVC and Leaf API come with Blade already installed and configured, but of course, you can use any templating engine you prefer. These have first party support, and work amazingly well out of the box.

***You can find more information on the [Views Docs Page](/modules/views/)***

## Defining Views

Views are defined in the `app/views` directory in  Leaf API and Leaf MVC. You can create subdirectories to organize your views based on your preference. For example, you might create a `layouts` directory to store your layout files. To quickly create a view, you can use the `php leaf g:template` command from the root of your project.

```bash
php leaf g:template home
```

This will create a file called `home.blade.php` in the `app/views` directory.

## Rendering Views

Leaf ships a `view` method as an extension of functional mode. This method allows you to render a view/template found in the views directory. This method accepts two parameters:

- The name of the view to render
- Data to pass to the view

```php
echo view('home', ['name' => 'John Doe']);
```

Notice that we pass the name of the view without the file extension. This is because Leaf will automatically append the correct file extension based on the view engine you're using.

### The `render()` method

To make things even easier for you, Leaf also ships with a `render()` method. This method accepts the same parameters as the `view()` method but automatically outputs the views with the correct headers in place.

```php
render('home', ['name' => 'John Doe']);
```

## Asset Bundling

[Vite](https://vitejs.dev/) is a modern build tool for frontend applications. It aims to provide a faster and leaner development experience for modern web projects. Leaf allows you to bundle your CSS and JS assets using vite, using the powerful [leaf-vite](/modules/views/vite/) module.

[> Read the docs](/modules/views/vite/)

## Frontend Frameworks

Leaf has support for some of the most popular frontend frameworks using [Inertia.js](https://inertiajs.com/). Inertia.js is a framework that allows you to create fully client-side rendered, single-page apps, without much of the complexity that comes with modern SPAs. It does this by leveraging Leaf's server-side rendering capabilities.

[> Read the docs](/modules/views/inertia/)

## Next Steps

You can continue learning about MVC with Leaf from the sidebar or check out the view engines below:

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/docs/mvc/controllers">
    <h3 class="next-steps-link">Controllers</h3>
    <small class="next-steps-caption">Learn how to use controllers in your Leaf applications.</small>
  </a>
  <a class="vt-box" href="/modules/views/blade/">
    <h3 class="next-steps-link">Blade Documentation</h3>
    <small class="next-steps-caption">Check out Leaf's port of Laravel's blade engine</small>
  </a>
  <a class="vt-box" href="/modules/views/bareui/">
    <h3 class="next-steps-link">BareUI Documentation</h3>
    <small class="next-steps-caption">Learn about Leaf's BareUI Engine.</small>
  </a>
</div>
