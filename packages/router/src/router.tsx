import { Suspense, createElement, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RouterOptions } from './@types';

export function createRouter({
  routes: appRoutes,
  root
}: RouterOptions) {
  const routes: any = [];

  for (const r of appRoutes) {
    const Component = lazy(() => import(`${root.replace('_app.tsx', r.file)}`));

    routes.push({
      path: r.path,
      element: createElement(Suspense, {
        fallback: 'Loading...',
        children: createElement(Component),
      }),
    });
  }

  return createElement(RouterProvider, { router: createBrowserRouter(routes) });
}
