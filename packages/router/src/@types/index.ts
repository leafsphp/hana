export interface HanaOptions {
  root: string;
  typescript?: boolean;
}

export interface RouterOptions {
  root: string;
  routes: {
    routes: any[];
    errorPages: string[];
    loadingPages: string[];
    _404Page: string;
  };
}
