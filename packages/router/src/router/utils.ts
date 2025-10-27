import { RouteImportOptions, RouteItem } from '../@types';

export const isJavascriptFile = (file: string) =>
  (file.endsWith('.js') ||
    file.endsWith('.jsx') ||
    file.endsWith('.ts') ||
    file.endsWith('.tsx')) &&
  !file.endsWith('.d.ts') &&
  !file.endsWith('.test.js') &&
  !file.endsWith('.test.jsx') &&
  !file.endsWith('.test.ts') &&
  !file.endsWith('.test.tsx');

export const isNotHanaFile = (file: string) =>
  isJavascriptFile(file) && !file.includes('/_');

export const isErrorPage = (file: string) =>
  isJavascriptFile(file) && file.includes('/_error.');

export const isLayoutFile = (file: string) =>
  isJavascriptFile(file) && file.includes('/_layout.');

export const isLoadingFile = (file: string) =>
  isJavascriptFile(file) && file.includes('/_loading.');

export const componentify = (files: string[]) => {
  return files.map((file: string) => {
    const routePath = file
      .replace(/\[\[(.*?)\]\]/g, ':$1?')
      .replace(/\[(.*?)\]/g, ':$1')
      .replace(/\$/g, '')
      .replace(/\.(js|jsx|ts|tsx)$/g, '')
      .replace(/\/index$/g, '')
      .replace(/\/_/g, '/:')
      .replace(/\/\//g, '/')
      .replace(/\s+/g, '_')
      .toLowerCase();

    return {
      file,
      path: routePath,
      component: file
        .replace(/:/g, '_')
        .replace(/\?/g, '_')
        .replace(/\*/g, '_')
        .replace(/\//g, '_')
        .replace(/\*/g, '_')
        .replace(/\[/g, '_')
        .replace(/\]/g, '_')
        .replace(/-/g, '_')
        .replace(/\.(js|ts)$/g, '___')
        .replace(/\.(jsx|tsx)$/g, '____')
        .replace(/\s+/g, '_')
        .replace(/-/g, '_')
        .toUpperCase(),
    };
  });
};

export const importify = (
  pages: RouteItem[],
  { useLazy, useSrc }: RouteImportOptions
) => {
  return pages
    .map((page) =>
      useLazy
        ? `const ${page.component} = import(${
            useSrc ? `'../src/pages${page.file}'` : `'../pages${page.file}'`
          });`
        : `import ${page.component} from ${
            useSrc ? `'../src/pages${page.file}'` : `'../pages${page.file}'`
          };`
    )
    .join('\n');
};
