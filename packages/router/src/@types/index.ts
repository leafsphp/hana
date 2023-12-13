export interface RouterOptions {
  usePageTransition?: boolean;
  mode?: 'history' | 'hash';
  root: string;
  useLazy?: boolean;
  useSrc?: boolean;
  routes: {
    routes: RouteItem[];
    layouts: RouteItem[];
    errorPages: RouteItem[];
    loadingPages: RouteItem[];
    _404Page: Partial<RouteItem>;
  };
}

export interface RouteImportOptions {
  useLazy?: boolean;
  useSrc?: boolean;
}

export interface AppRoutes {
  routes: RouteItem[];
  errorPages: RouteItem[];
  loadingPages: RouteItem[];
  layoutPages: RouteItem[];
  _404Page: RouteItem[];
}

export type RouteItem = {
  path?: string;
  file: string;
  component: Promise<any> | React.ReactNode;
};

export interface HanaOptions extends Omit<RouterOptions, 'routes'> {
  typescript?: boolean;
}

export type RouteCompiler = (dir?: string) => {
  javascriptFiles: string[];
  loadingFiles: string[];
  layoutFiles: string[];
  errorFiles: string[];
  _404Page?: string;
};
