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

export type RouteItem = {
  path?: string;
  file: string;
  component: Promise<any> | React.ReactNode;
};

export interface HanaOptions extends Omit<RouterOptions, 'routes'> {
  typescript?: boolean;
}

export type RouteCompiler = (dir?: string) => {
  javascriptFiles: any[];
  loadingFiles: any[];
  layoutFiles: any[];
  errorFiles: any[];
  _404Page: string;
};
