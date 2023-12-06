# create-hana-app

<!-- markdownlint-disable no-inline-html -->

<!-- <script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script> -->

<p class="flex flex:start-all" style="gap:10px;">
  <a href="https://npmjs.com/package/create-hana-app"><img src="https://img.shields.io/npm/v/create-hana-app" alt="npm version" height="18"></a>
  <img src="https://img.shields.io/npm/dt/create-hana-app" class="m:0" alt="">
</p>

create-hana-app provides a quick and easy way to get started with Hana. It offers a modern build setup with no configuration. It also allows you to customize your installation and choose between TypeScript and JavaScript.

## Set up

```bash
npx create-hana-app@latest
```

```bash
npm create hana-app@latest
```

```bash
yarn create hana-app
```

```bash
pnpm create hana-app
```

```bash
bunx create-hana-app
```

You will then be prompted to choose a template and enter a project name:

```bash
? Project name: › my-hana-app
? Select a template: › - Use arrow-keys. Return to submit.
❯   JavaScript
    TypeScript
```

After that, a new Hana app will be created in the directory you specified with all the dependencies installed. You can then run your app with `npm run dev`.

## More to come

This is a work in progress. More templates and options will be added soon.
