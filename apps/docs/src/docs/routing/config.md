# Router Configuration
<!-- markdownlint-disable no-inline-html -->

If you generate your app using the [create-hana-app CLI](/docs/cli/), the router will be automatically configured for you. However, if you have an existing app, you can configure the router manually.

## useSrc

By default, Hana expects your application's source code to be in a `src` directory. If you want to change this, you can set the `useSrc` option to `false` in your `vite.config.ts` file.

```js
import { defineConfig } from 'vite';
import { hana } from '@hanabira/router';

export default defineConfig({
  plugins: [
    hana({
      useSrc: false
    }),
  ],
});
```

## typescript

By default, Hana expects your application to be written in JavaScript. If you want to change this, you can set the `typescript` option to `true` in your `vite.config.ts` file.

```js
import { defineConfig } from 'vite';
import { hana } from '@hanabira/router';

export default defineConfig({
  plugins: [
    hana({
      typescript: true
    }),
  ],
});
```

## useLazy

By default, Hana will lazy load all your routes. If you want to change this, you can set the `useLazy` option to `false` in your `vite.config.ts` file.

```js
import { defineConfig } from 'vite';
import { hana } from '@hanabira/router';

export default defineConfig({
  plugins: [
    hana({
      useLazy: false
    }),
  ],
});
```

## mode

By default, Hana will use `history` mode for routing. This means that your routes will not have a `#` in them. If you want to change this, you can set the `mode` option to `hash` in your `vite.config.ts` file.

```js
import { defineConfig } from 'vite';
import { hana } from '@hanabira/router';

export default defineConfig({
  plugins: [
    hana({
      mode: 'hash'
    }),
  ],
});
```
