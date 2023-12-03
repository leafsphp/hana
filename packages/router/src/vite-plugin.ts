import fs from 'fs';
import path from 'path';
import { Plugin } from 'vite';

import type { HanaOptions } from './@types';

export default function hana(options: HanaOptions): Plugin {
  const isJavascriptFile = (file: string) =>
    (file.endsWith('.js') ||
      file.endsWith('.jsx') ||
      file.endsWith('.ts') ||
      file.endsWith('.tsx')) &&
    !file.endsWith('.d.ts') &&
    !file.endsWith('.test.js') &&
    !file.endsWith('.test.jsx') &&
    !file.endsWith('.test.ts') &&
    !file.endsWith('.test.tsx');

  const isNotHanaFile = (file: string) =>
    isJavascriptFile(file) && !file.includes('/_');

  const isErrorPage = (file: string) =>
    isJavascriptFile(file) && file.includes('/_error.');

  const isLoadingFile = (file: string) =>
    isJavascriptFile(file) && file.includes('/_loading.');

  const setupAppFile = (routes: any) => {
    const appFile = path.resolve(
      options.root,
      '.hana',
      `_app.${options.typescript ? 'tsx' : 'jsx'}`
    );

    if (!fs.existsSync(appFile)) {
      fs.writeFileSync(
        appFile,
        `import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRouter } from '@hanabira/router';

${routes.routes
  ?.map(
    (appRoute: any) =>
      `const ${appRoute.component} = import('../pages${appRoute.file}');`
  )
  .join('\n')}${routes.errorPages
          ?.map(
            (errorPage: any) =>
              `const ${errorPage
                .replace(/\//g, '_')
                .replace(/\./g, '_')} = import('../pages${errorPage}');`
          )
          .join('\n')}${routes.loadingPages
          ?.map(
            (loadingPage: any) =>
              `const ${loadingPage
                .replace(/\//g, '_')
                .replace(/\./g, '_')} = import('../pages${loadingPage}');`
          )
          .join('\n')}

${routes._404Page ? `const _404 = import('./../pages${routes._404Page}');` : ''}

import Application from './../pages/_app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Application>
      {createRouter({
        usePageTransition: ${options.usePageTransition ?? false},
        mode: '${options.mode ?? 'history'}',
        root: import.meta.url,
        routes: {
          routes: [
            ${routes.routes
              ?.map(
                (appRoute: any) =>
                  `{
                file: '${appRoute.file}',
                path: '${appRoute.path}',
                component: ${appRoute.component},
              },`
              )
              .join('\n')}
          ],
          errorPages: [
            ${routes.errorPages
              ?.map(
                (errorPage: any) =>
                  `{
                file: '${errorPage}',
                component: ${errorPage.replace(/\//g, '_').replace(/\./g, '_')},
              },`
              )
              .join('\n')}
          ],
          loadingPages: [
            ${routes.loadingPages
              ?.map(
                (loadingPage: any) =>
                  `{
                file: '${loadingPage}',
                component: ${loadingPage
                  .replace(/\//g, '_')
                  .replace(/\./g, '_')},
              },`
              )
              .join('\n')}
          ],
          _404Page: ${
            routes._404Page
              ? `{ file: '${routes._404Page}', component: _404 }`
              : `{ file: null, component: null }`
          },
        },
      })}
    </Application>
  </React.StrictMode>
);
`
      );
    }
  };

  const buildRoutes = () => {
    console.log('Building your routes...');

    const compileRoutes: (dir?: string) => {
      javascriptFiles: any[];
      loadingFiles: any[];
      errorFiles: any[];
      _404Page: string;
    } = (dir = 'pages') => {
      const javascriptFiles: any = [];
      const errorFiles: any = [];
      const loadingFiles: any = [];

      const files = fs.readdirSync(path.resolve(options.root, dir), {
        withFileTypes: true,
      });

      for (const file of files) {
        if (file.isDirectory()) {
          const data = compileRoutes(`${dir}/${file.name}`);

          javascriptFiles.push(...data.javascriptFiles);
          loadingFiles.push(...data.loadingFiles);
          errorFiles.push(...data.errorFiles);
        } else {
          javascriptFiles.push(`${dir}/${file.name}`.replace('pages', ''));
          loadingFiles.push(`${dir}/${file.name}`.replace('pages', ''));
          errorFiles.push(`${dir}/${file.name}`.replace('pages', ''));
        }
      }

      return {
        javascriptFiles: javascriptFiles.filter(isNotHanaFile),
        loadingFiles: loadingFiles.filter(isLoadingFile),
        errorFiles: errorFiles.filter(isErrorPage),
        _404Page: javascriptFiles.find((file: string) =>
          file.includes('/_404.')
        ),
      };
    };

    const routes: any = [];
    const appFiles = compileRoutes();
    const errorPages = appFiles.errorFiles;
    const appRoutes = appFiles.javascriptFiles;
    const loadingPages = appFiles.loadingFiles;
    const _404Page = appFiles._404Page;

    appRoutes.forEach((route: string) => {
      const routePath = route
        .replace(/\[(.*?)\]/g, ':$1')
        .replace(/\$/g, '')
        .replace(/\.(js|jsx|ts|tsx)$/g, '')
        .replace(/\/index$/g, '')
        .replace(/\/_/g, '/:')
        .replace(/\/\//g, '/')
        .toLowerCase();

      routes.push({
        path: routePath,
        file: route,
        component: route
          .replace(/:/g, '_')
          .replace(/\//g, '_')
          .replace(/\[/g, '_')
          .replace(/\]/g, '_')
          .replace(/\.(js|ts)$/g, '___')
          .replace(/\.(jsx|tsx)$/g, '____')
          .toUpperCase(),
      });
    });

    console.log('Routes built successfully!');

    fs.mkdirSync(path.resolve(options.root, '.hana'), { recursive: true });
    fs.writeFileSync(
      path.resolve(options.root, '.hana/routes.json'),
      JSON.stringify({ routes, errorPages, loadingPages, _404Page })
    );

    setupAppFile({ routes, errorPages, loadingPages, _404Page });
  };

  return {
    name: 'hana',

    configResolved(config) {
      if (config.command === 'build') {
        console.log('Starting production build...');
      }

      buildRoutes();
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
