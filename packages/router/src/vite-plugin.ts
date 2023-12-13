import fs from 'fs';
import path from 'path';
import { Plugin } from 'vite';

import type { AppRoutes, HanaOptions, RouteCompiler } from './@types';
import {
  componentify,
  importify,
  isErrorPage,
  isJavascriptFile,
  isLayoutFile,
  isLoadingFile,
  isNotHanaFile,
} from './router/utils';

export default function hana({
  root,
  useSrc = true,
  useLazy = true,
  mode = 'history',
  typescript = false,
  usePageTransition = true,
}: HanaOptions): Plugin {
  const setupAppFile = (routes: AppRoutes) => {
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

${importify(routes.routes, { useLazy, useSrc })}
${importify(routes.errorPages, { useLazy, useSrc })}
${importify(routes.layoutPages, { useLazy, useSrc })}
${importify(routes.loadingPages, { useLazy, useSrc })}
${importify(routes._404Page, { useLazy, useSrc })}
${
  useLazy
    ? `const Application = React.lazy(() => import(${
        useSrc ? `'../src/pages/_app'` : `'../pages/_app'`
      }));`
    : `import Application from ${
        useSrc ? `'../src/pages/_app'` : `'../pages/_app'`
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
            ${routes.routes.map(
              (route) =>
                `{ path: '${route.path}', component: ${route.component}, file: '${route.file}' }`
            )}
          ],
          errorPages: [
            ${routes.errorPages.map(
              (route) =>
                `{ component: ${route.component}, file: '${route.file}' }`
            )}
          ],
          loadingPages: [
            ${routes.loadingPages.map(
              (route) =>
                `{ component: ${route.component}, file: '${route.file}' }`
            )}
          ],
          layouts: [
            ${routes.layoutPages.map(
              (route) =>
                `{ component: ${route.component}, file: '${route.file}' }`
            )}
          ],
          _404Page: ${
            routes._404Page.length > 0
              ? `{ component: ${routes._404Page[0].component}, file: '${routes._404Page[0].file}' }`
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
      const javascriptFiles: string[] = [];
      const loadingFiles: string[] = [];
      const layoutFiles: string[] = [];
      const errorFiles: string[] = [];

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

    const appFiles = compileRoutes();
    const errorPages = componentify(appFiles.errorFiles);
    const routes = componentify(appFiles.javascriptFiles);
    const layoutPages = componentify(appFiles.layoutFiles);
    const loadingPages = componentify(appFiles.loadingFiles);
    const _404Page = appFiles._404Page ? componentify([appFiles._404Page]) : [];

    console.log('Routes built successfully!');

    fs.mkdirSync(path.resolve(root, '.hana'), { recursive: true });
    fs.writeFileSync(
      path.resolve(root, '.hana/routes.json'),
      JSON.stringify({
        routes,
        errorPages,
        loadingPages,
        layoutPages,
        _404Page: _404Page[0] ?? {},
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
      if (isJavascriptFile(file)) {
        if ((await read()).indexOf('export default') > -1) {
          buildRoutes();
        }

        // TODO: Handle page deletion
      }
    },
  };
}
