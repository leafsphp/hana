<!-- markdownlint-disable no-inline-html -->

# Leaf + MVC

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

Leaf is a simple PHP framework/set of libraries that can be used to build any kind of application. By default, Leaf doesn't give you a lot of structure, but it fully supports the MVC pattern without any extra configuration.

## What is MVC?

MVC stands for Model-View-Controller. It is a pattern that separates your application into three distinct parts:

- Models: These are the classes that represent your data. They are responsible for interacting with your database, and for validating your data.
- Views: These are the files that are responsible for displaying your data to the user. They are usually written in HTML, but can also be written in other templating languages like [BareUI](https://leafphp.dev/modules/views/bareui/) or [Blade](https://leafphp.dev/modules/views/blade/) or frameworks like [Vue](https://vuejs.org/) or [React](https://reactjs.org/)
- Controllers: These are the classes that are responsible for handling the user's request, and for returning the appropriate response.

<VideoDocs
  title="New to MVC?"
  subject="What is MVC? Simple Explanation"
  description="If you're new to the MVC pattern, you can take a look at this video by Traversy Media that explains the MVC pattern, how it works and how it works in real-world applications."
  link="https://www.youtube.com/embed/pCvZtjoRq1I"
/>

## MVC in Leaf

Leaf out of the box doesn't provide any structure, however, the Leaf team also provides a few setups that you can use to get started with Leaf and MVC. These setups are designed to give you a good starting point for your application, and come with additional tooling that make building with Leaf even faster.

We provide two setups for you to choose from:

- [Leaf MVC](/docs/leafmvc/)
- [Leaf API](/docs/leafapi/)

### Leaf MVC vs Leaf API

| Engine                      |    Main use     |          Extra Notes           |
| --------------------------- | :-------------: | :----------------------------: |
| [Leaf MVC](/docs/leafmvc/)    | General purpose |               -                |
| [Leaf API](/docs/leafapi/)    |  Building APIs  | View layer disabled by default |

Leaf MVC and Leaf API pretty much support the same tooling, but Leaf API is designed to be used for building APIs. It comes with the view layer disabled by default, and comes with a few extra tools that make building APIs with Leaf even easier.

## Leaf Skeleton <sup class="vt-badge bg:red" data-text="Deprecated"></sup>

Skeleton was designed to be a simple starting point for your application, and came with just the bare minimum to get you started. However, we have decided to deprecate Skeleton in favor of the Leaf CLI. The Leaf CLI is a command-line tool for generating Leaf projects, installing modules, and more.

We recently released an update to the Leaf CLI that allows you to select specific features you want to include and generate a project with everything you need. This functionality is similar to what Skeleton provided but is more flexible and allows you to create projects with only the features that you need, which is why we've decided to deprecate Leaf Skeleton.

Skeleton will still be available for download, but we won't be updating it anymore. We recommend that you generate a project with the CLI or use Leaf MVC or Leaf API instead.

[> Leaf CLI Docs](/docs/cli/)

## MVC Tools

Besides the MVC setups, Leaf also provides a few tools that can help you build your own MVC setup if you want to. You can check the "MVC Tools" section in the sidebar to learn more about these tools.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/docs/leafmvc/">
    <h3 class="next-steps-link">Leaf MVC</h3>
    <small class="next-steps-caption">Check out the documentation for Leaf MVC.</small>
  </a>
  <a class="vt-box" href="/docs/leafapi/">
    <h3 class="next-steps-link">Leaf API</h3>
    <small class="next-steps-caption">Start building apps with Leaf API and modules</small>
  </a>
  <a class="vt-box" href="/docs/cli/" target="_blank">
    <h3 class="next-steps-link">Leaf CLI</h3>
    <small class="next-steps-caption">Generate your first Leaf project with the Leaf CLI</small>
  </a>
</div>
