import { Suspense, createElement, lazy } from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from 'react-router-dom';

import type { RouterOptions } from '../@types';

export function createRouter({
  usePageTransition = false,
  mode = 'history',
  routes: appRoutes,
  root,
}: RouterOptions) {
  const routes: any = [];

  for (const r of appRoutes.routes) {
    let closestErrorPage: any = null;
    let closestLoadingPage: any = null;

    let closestErrorMatchLength = 0;
    let closestLoadingMatchLength = 0;

    appRoutes.errorPages.forEach((errorPage) => {
      const routeFile = r.file.toLowerCase();
      const errorPageFile = errorPage
        .replace(/\_error.(jsx|tsx|js|ts)/, '')
        .toLowerCase();

      if (routeFile.startsWith(errorPageFile)) {
        const matchLength = errorPageFile.length;

        if (matchLength > closestErrorMatchLength) {
          closestErrorPage = errorPage;
          closestErrorMatchLength = matchLength;
        }
      }
    });

    appRoutes.loadingPages.forEach((loadingPage) => {
      const routeFile = r.file.toLowerCase();
      const loadingPageFile = loadingPage
        .replace(/\_loading.(jsx|tsx|js|ts)/, '')
        .toLowerCase();

      if (routeFile.startsWith(loadingPageFile)) {
        const matchLength = loadingPageFile.length;

        if (matchLength > closestLoadingMatchLength) {
          closestLoadingPage = loadingPage;
          closestLoadingMatchLength = matchLength;
        }
      }
    });

    let ErrorComponent: any;
    let LoadingComponent: any;

    const Component = lazy(
      () =>
        import(
          /* @vite-ignore */ `${root.replace(
            '.hana/_app.tsx',
            `pages/${r.file}`
          )}`
        )
    );

    if (closestErrorPage) {
      ErrorComponent = lazy(
        () =>
          import(
            /* @vite-ignore */ `${root.replace(
              '.hana/_app.tsx',
              `pages/${closestErrorPage}`
            )}`
          )
      );
    }

    if (closestLoadingPage) {
      LoadingComponent = lazy(
        () =>
          import(
            /* @vite-ignore */ `${root.replace(
              '.hana/_app.tsx',
              `pages/${closestLoadingPage}`
            )}`
          )
      );
    }

    routes.push({
      path: r.path,
      errorElement: closestErrorPage ? createElement(ErrorComponent) : null,
      element: closestLoadingPage
        ? createElement(Suspense, {
            fallback: createElement(LoadingComponent),
            children: createElement(Component),
          })
        : createElement(Component),
    });
  }

  if (appRoutes._404Page) {
    routes.push({
      path: '*',
      element: createElement(
        lazy(
          () =>
            import(
              /* @vite-ignore */ `${root.replace(
                '_app.tsx',
                appRoutes._404Page[0]
              )}`
            )
        )
      ),
    });
  } else {
    routes.push({
      path: '*',
      element: createElement('div', null, '404'),
    });
  }

  return createElement(RouterProvider, {
    router:
      mode === 'hash' ? createHashRouter(routes) : createBrowserRouter(routes),
    future: {
      v7_startTransition: usePageTransition,
    },
  });
}
