export interface HanaOptions {
  root: string;
  typescript?: boolean;
}

export interface RouterOptions {
  root: string;
  _404: string[];
  errorPages: string[];
  loadingPages: string[];
  routes: any[];
}
