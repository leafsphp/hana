# Welcome to HanaJS🍃

This is a [Hana.js](https://hanajs.dev/) project bootstrapped with [`create-hana-app`](https://github.com/leafsphp/hana/tree/main/packages/create-hana-app).

## Getting Started

First, install your dependencies:

```bash
npm run install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## 📐 Project Structure

Inside of your Hana project, you'll see the following folders and files:

```text
/
├── public/
│   └── eclipse.svg
│   └── eclipse-dark.svg
├── src/
│   └── pages/
│       └── app.tsx
│       └── index.tsx
│       └── index.module.css
│   ├── styles/
│   │   └── index.css
└── package.json
```

Hana looks for `.tsx` or `.jsx` files in the `src/pages/` directory. Each page is exposed as a route based on its file name. `_app.tsx` is reserved for app config.

Any static assets, like images and fonts, can be placed in the `public/` directory.

## 👀 Want to learn more?

Feel free to check [our documentation](https://hanajs.dev/) or jump into our [Discord server](https://discord.gg/Pkrm9NJPE3).
