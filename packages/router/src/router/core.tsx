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
  useLazy = true,
}: Omit<RouterOptions, 'root' | 'useSrc'>): React.ReactNode {
  const routes: any = [];

  for (const r of appRoutes.routes) {
    let closestErrorPage: RouteItem | null = null;
    let closestLayoutPage: RouteItem | null = null;
    let closestLoadingPage: RouteItem | null = null;

    let closestErrorMatchLength = 0;
    let closestLayoutMatchLength = 0;
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

    appRoutes.layouts.forEach((layout) => {
      const routeFile = r.file.toLowerCase();
      const layoutFile = layout.file
        .replace(/\_layout.(jsx|tsx|js|ts)/, '')
        .toLowerCase();

      if (routeFile.startsWith(layoutFile)) {
        const matchLength = layoutFile.length;

        if (matchLength > closestLayoutMatchLength) {
          closestLayoutPage = layout;
          closestLayoutMatchLength = matchLength;
        }
      }
    });

    let ErrorComponent: any;
    let LayoutComponent: any;
    let LoadingComponent: any;

    const Component = useLazy
      ? lazy(() => r.component as Promise<any>)
      : (r.component as any);

    if (closestErrorPage) {
      ErrorComponent = useLazy
        ? lazy(() => closestErrorPage!.component as Promise<any>)
        : (closestErrorPage as RouteItem).component;
    }

    if (closestLoadingPage) {
      LoadingComponent = useLazy
        ? lazy(() => closestLoadingPage!.component as Promise<any>)
        : (closestLoadingPage as RouteItem).component;
    }

    if (closestLayoutPage) {
      LayoutComponent = useLazy
        ? lazy(() => closestLayoutPage!.component as Promise<any>)
        : (closestLayoutPage as RouteItem).component;
    }

    routes.push({
      path: r.path,
      errorElement: closestErrorPage ? createElement(ErrorComponent) : null,
      element: closestLoadingPage
        ? createElement(Suspense, {
            fallback: createElement(LoadingComponent),
            children: closestLayoutPage
              ? createElement(LayoutComponent, {}, createElement(Component))
              : createElement(Component),
          })
        : closestLayoutPage
        ? createElement(LayoutComponent, {}, createElement(Component))
        : createElement(Component),
    });
  }

  if (appRoutes._404Page.file) {
    routes.push({
      path: '*',
      element: createElement(
        useLazy
          ? lazy(() => appRoutes._404Page!.component! as Promise<any>)
          : (appRoutes._404Page.component as any)
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
