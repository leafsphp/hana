import fs from 'fs';
import path from 'path';
import { Plugin } from 'vite';

import type { HanaOptions, RouteCompiler } from './@types';

export default function hana({
  root,
  useSrc = true,
  useLazy = true,
  mode = 'history',
  typescript = false,
  usePageTransition = true,
}: HanaOptions): Plugin {
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

  const isLayoutFile = (file: string) =>
    isJavascriptFile(file) && file.includes('/_layout.');

  const isLoadingFile = (file: string) =>
    isJavascriptFile(file) && file.includes('/_loading.');

  const setupAppFile = (routes: any) => {
    const appFile = path.resolve(
      root,
      '.hana',
      `_app.${typescript ? 'tsx' : 'jsx'}`
    );

    if (!fs.existsSync(appFile)) {
      fs.writeFileSync(
        appFile,
        `import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRouter } from '@hanabira/router';

${routes.routes
  ?.map((appRoute: any) =>
    useLazy
      ? `const ${appRoute.component} = import(${
          useSrc
            ? `'../src/pages${appRoute.file}'`
            : `'../pages${appRoute.file}'`
        });`
      : `import ${appRoute.component} from ${
          useSrc
            ? `'../src/pages${appRoute.file}'`
            : `'../pages${appRoute.file}'`
        };`
  )
  .join('\n')}${routes.layoutPages
          ?.map((layoutPage: any) =>
            useLazy
              ? `const ${layoutPage
                  .replace(/:/g, '_')
                  .replace(/\//g, '_')
                  .replace(/\[/g, '_')
                  .replace(/\]/g, '_')
                  .replace(/\.(js|ts)$/g, '___')
                  .replace(/\.(jsx|tsx)$/g, '____')
                  .toUpperCase()} = import(${
                  useSrc
                    ? `'../src/pages${layoutPage}'`
                    : `'../pages${layoutPage}'`
                });`
              : `import ${layoutPage
                  .replace(/:/g, '_')
                  .replace(/\//g, '_')
                  .replace(/\[/g, '_')
                  .replace(/\]/g, '_')
                  .replace(/\.(js|ts)$/g, '___')
                  .replace(/\.(jsx|tsx)$/g, '____')
                  .toUpperCase()} from ${
                  useSrc
                    ? `'../src/pages${layoutPage}'`
                    : `'../pages${layoutPage}'`
                };`
          )
          .join('\n')}${routes.errorPages
          ?.map((errorPage: any) =>
            useLazy
              ? `const ${errorPage
                  .replace(/:/g, '_')
                  .replace(/\//g, '_')
                  .replace(/\[/g, '_')
                  .replace(/\]/g, '_')
                  .replace(/\.(js|ts)$/g, '___')
                  .replace(/\.(jsx|tsx)$/g, '____')
                  .toUpperCase()} = import(${
                  useSrc
                    ? `'../src/pages${errorPage}'`
                    : `'../pages${errorPage}'`
                });`
              : `import ${errorPage
                  .replace(/:/g, '_')
                  .replace(/\//g, '_')
                  .replace(/\[/g, '_')
                  .replace(/\]/g, '_')
                  .replace(/\.(js|ts)$/g, '___')
                  .replace(/\.(jsx|tsx)$/g, '____')
                  .toUpperCase()} from ${
                  useSrc
                    ? `'../src/pages${errorPage}'`
                    : `'../pages${errorPage}'`
                };`
          )
          .join('\n')}${routes.loadingPages
          ?.map((loadingPage: any) =>
            useLazy
              ? `const ${loadingPage
                  .replace(/:/g, '_')
                  .replace(/\//g, '_')
                  .replace(/\[/g, '_')
                  .replace(/\]/g, '_')
                  .replace(/\.(js|ts)$/g, '___')
                  .replace(/\.(jsx|tsx)$/g, '____')
                  .toUpperCase()} = import(${
                  useSrc
                    ? `'../src/pages${loadingPage}'`
                    : `'../pages${loadingPage}'`
                });`
              : `import ${loadingPage
                  .replace(/:/g, '_')
                  .replace(/\//g, '_')
                  .replace(/\[/g, '_')
                  .replace(/\]/g, '_')
                  .replace(/\.(js|ts)$/g, '___')
                  .replace(/\.(jsx|tsx)$/g, '____')
                  .toUpperCase()} from ${
                  useSrc
                    ? `'../src/pages${loadingPage}'`
                    : `'../pages${loadingPage}'`
                };`
          )
          .join('\n')}

${
  routes._404Page
    ? useLazy
      ? `const _404 = import(${
          useSrc
            ? `'./../src/pages${routes._404Page}'`
            : `'./../pages${routes._404Page}'`
        });`
      : `import _404 from ${
          useSrc
            ? `'./../src/pages${routes._404Page}'`
            : `'./../pages${routes._404Page}'`
        };`
    : ''
}

${
  useLazy
    ? `const Application = React.lazy(() => import(${
        useSrc ? `'./../src/pages/_app'` : `'./../pages/_app'`
      }));`
    : `import Application from ${
        useSrc ? `'./../src/pages/_app'` : `'./../pages/_app'`
      };`
}

ReactDOM.createRoot(document.getElementById('root')${
          typescript ? '!' : ''
        }).render(
  <React.StrictMode>
    <Application>
      {createRouter({
        useLazy: ${useLazy},
        usePageTransition: ${usePageTransition},
        mode: '${mode}',
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
                component: ${errorPage.replace(/:/g, '_')
                  .replace(/\//g, '_')
                  .replace(/\[/g, '_')
                  .replace(/\]/g, '_')
                  .replace(/\.(js|ts)$/g, '___')
                  .replace(/\.(jsx|tsx)$/g, '____')
                  .toUpperCase()},
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
                  .replace(/:/g, '_')
                  .replace(/\//g, '_')
                  .replace(/\[/g, '_')
                  .replace(/\]/g, '_')
                  .replace(/\.(js|ts)$/g, '___')
                  .replace(/\.(jsx|tsx)$/g, '____')
                  .toUpperCase()},
              },`
              )
              .join('\n')}
          ],
          layouts: [
            ${routes.layoutPages
              ?.map(
                (layoutPage: any) =>
                  `{
                file: '${layoutPage}',
                component: ${layoutPage
                  .replace(/:/g, '_')
                  .replace(/\//g, '_')
                  .replace(/\[/g, '_')
                  .replace(/\]/g, '_')
                  .replace(/\.(js|ts)$/g, '___')
                  .replace(/\.(jsx|tsx)$/g, '____')
                  .toUpperCase()},
              },`
              )
              .join('\n')}
          ],
          _404Page: ${
            routes._404Page
              ? `{ file: '${routes._404Page}', component: _404 }`
              : `{ file: undefined, component: undefined }`
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

    const compileRoutes: RouteCompiler = (dir = 'pages') => {
      const javascriptFiles: any = [];
      const loadingFiles: any = [];
      const layoutFiles: any = [];
      const errorFiles: any = [];

      const files = useSrc
        ? fs.readdirSync(path.resolve(root, 'src', dir), {
            withFileTypes: true,
          })
        : fs.readdirSync(path.resolve(root, dir), {
            withFileTypes: true,
          });

      for (const file of files) {
        if (file.isDirectory()) {
          const data = compileRoutes(`${dir}/${file.name}`);

          javascriptFiles.push(...data.javascriptFiles);
          loadingFiles.push(...data.loadingFiles);
          layoutFiles.push(...data.layoutFiles);
          errorFiles.push(...data.errorFiles);
        } else {
          const _pages = `${dir}/${file.name}`.replace('pages', '');

          javascriptFiles.push(_pages);
          loadingFiles.push(_pages);
          layoutFiles.push(_pages);
          errorFiles.push(_pages);
        }
      }

      return {
        javascriptFiles: javascriptFiles.filter(isNotHanaFile),
        loadingFiles: loadingFiles.filter(isLoadingFile),
        layoutFiles: layoutFiles.filter(isLayoutFile),
        errorFiles: errorFiles.filter(isErrorPage),
        _404Page: javascriptFiles.find((file: string) =>
          file.includes('/_404.')
        ),
      };
    };

    const routes: any = [];
    const appFiles = compileRoutes();
    const _404Page = appFiles._404Page;
    const errorPages = appFiles.errorFiles;
    const layoutPages = appFiles.layoutFiles;
    const appRoutes = appFiles.javascriptFiles;
    const loadingPages = appFiles.loadingFiles;

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

    fs.mkdirSync(path.resolve(root, '.hana'), { recursive: true });
    fs.writeFileSync(
      path.resolve(root, '.hana/routes.json'),
      JSON.stringify({
        routes,
        errorPages,
        loadingPages,
        layoutPages,
        _404Page,
      })
    );

    setupAppFile({ routes, errorPages, loadingPages, layoutPages, _404Page });
  };

  return {
    name: 'hana',

    configResolved(config) {
      if (fs.existsSync(path.resolve(root, '.hana'))) {
        console.log('Cleaning up previous build...');

        fs.rmSync(path.resolve(root, '.hana'), {
          recursive: true,
        });
      }

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
        if (fs.existsSync(path.resolve(root, '.hana'))) {
          console.log('Cleaning up previous build...');

          fs.rmSync(path.resolve(root, '.hana'), {
            recursive: true,
          });
        }

        buildRoutes();
      }
    },
  };
}
