import { Suspense, createElement, lazy } from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from 'react-router-dom';

import type { RouteItem, RouterOptions } from '../@types';

export function createRouter({
  usePageTransition = false,
  mode = 'history',
  routes: appRoutes,
  root,
}: RouterOptions): React.ReactNode {
  const routes: any = [];

  for (const r of appRoutes.routes) {
    let closestErrorPage: RouteItem | null = null;
    let closestLoadingPage: RouteItem | null = null;

    let closestErrorMatchLength = 0;
    let closestLoadingMatchLength = 0;

    appRoutes.errorPages.forEach((errorPage) => {
      const routeFile = r.file.toLowerCase();
      const errorPageFile = errorPage.file
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
      const loadingPageFile = loadingPage.file
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

    const Component = lazy(() => r.component);

    if (closestErrorPage) {
      ErrorComponent = lazy(() => closestErrorPage!.component);
    }

    if (closestLoadingPage) {
      LoadingComponent = lazy(() => closestLoadingPage!.component);
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

  if (appRoutes._404Page.file) {
    routes.push({
      path: '*',
      element: createElement(lazy(() => appRoutes._404Page!.component!)),
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
