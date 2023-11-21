import fs from 'fs';
import path from 'path';
import { Plugin } from 'vite';

export default function hana(): Plugin {
  const isJavascriptFile = (file: string) =>
    (file.endsWith('.js') ||
      file.endsWith('.jsx') ||
      file.endsWith('.ts') ||
      file.endsWith('.tsx')) &&
    !file.startsWith('_') &&
    !file.endsWith('.d.ts') &&
    !file.endsWith('.test.js') &&
    !file.endsWith('.test.jsx') &&
    !file.endsWith('.test.ts') &&
    !file.endsWith('.test.tsx');

  const buildRoutes = () => {
    console.log('Building your routes...');

    const compileRoutes = (dir = 'pages') => {
      const javascriptFiles = [];

      const files = fs.readdirSync(path.resolve(__dirname, dir), {
        withFileTypes: true,
      });

      for (const file of files) {
        if (file.isDirectory()) {
          javascriptFiles.push(...compileRoutes(`${dir}/${file.name}`));
        } else {
          javascriptFiles.push(`${dir}/${file.name}`.replace('pages', ''));
        }
      }

      return javascriptFiles.filter(isJavascriptFile);
    };

    const routes = {};
    const appRoutes = compileRoutes();

    appRoutes.forEach((route: string) => {
      const routePath = route
        .replace(/\[(.*?)\]/g, ':$1')
        .replace(/\$/g, '')
        .replace(/\.(js|jsx|ts|tsx)$/g, '')
        .replace(/\/index$/g, '')
        .replace(/\/_/g, '/:')
        .replace(/\/\//g, '/')
        .toLowerCase();

      routes[routePath] = route;
    });

    console.log('Routes built successfully!', routes);

    fs.mkdirSync(path.resolve(__dirname, '.hana'), { recursive: true });
    fs.writeFileSync(
      path.resolve(__dirname, '.hana/routes.json'),
      JSON.stringify(routes)
    );
  };

  return {
    name: 'hana',

    configResolved(config) {
      if (config.command === 'serve') {
        buildRoutes();
      }
    },

    async handleHotUpdate({ file, read }) {
      if (
        isJavascriptFile(file) &&
        (await read()).indexOf('export default') > -1
      ) {
        buildRoutes();
      }
    },
  };
}
