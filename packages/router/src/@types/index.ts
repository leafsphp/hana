export interface HanaOptions {
  root: string;
  typescript?: boolean;
}

export interface RouterOptions {
  usePageTransition?: boolean;
  mode: 'history' | 'hash';
  root: string;
  routes: {
    routes: any[];
    errorPages: string[];
    loadingPages: string[];
    _404Page: string;
  };
}
