export interface RouterOptions {
  usePageTransition?: boolean;
  mode?: 'history' | 'hash';
  root: string;
  routes: {
    routes: any[];
    errorPages: string[];
    loadingPages: string[];
    _404Page: string;
  };
}

export interface HanaOptions extends Omit<RouterOptions, 'routes'> {
  typescript?: boolean;
}
