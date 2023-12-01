export interface RouterOptions {
  usePageTransition?: boolean;
  mode?: 'history' | 'hash';
  root: string;
  routes: {
    routes: RouteItem[];
    errorPages: RouteItem[];
    loadingPages: RouteItem[];
    _404Page: Partial<RouteItem>;
  };
}

export type RouteItem = {
  path?: string;
  file: string;
  component: Promise<any>;
};

export interface HanaOptions extends Omit<RouterOptions, 'routes'> {
  typescript?: boolean;
}
