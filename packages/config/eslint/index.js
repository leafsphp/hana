module.exports = {
  extends: ['next', 'eslint:recommended', 'turbo', 'prettier'],
  plugins: [
    '@typescript-eslint',
    'tailwindcss',
    'simple-import-sort',
    'prettier',
  ],
  settings: {
    tailwindcss: {
      callees: ['classNames'],
      officialSorting: true,
    },
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
    },
  },
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'error',
    'react/react-in-jsx-scope': 'off',
    'prefer-const': 'error',
    'no-console': 1,
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-use-before-define': 'error',
    'max-depth': ['error', 5],
    'max-nested-callbacks': ['error', 4],
    'max-len': [
      'error',
      {
        code: 100,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'react/no-danger': 0,
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'react/jsx-curly-brace-presence': [
      'error',
      {
        props: 'never',
        children: 'never',
      },
    ],
    'space-in-parens': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react/jsx-sort-props': [
      2,
      {
        shorthandFirst: true,
        multiline: 'last',
        reservedFirst: ['key'],
        callbacksLast: true,
      },
    ],
    'tailwindcss/classnames-order': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/no-contradicting-classname': 'error',
  },
  overrides: [
    {
      files: ['*.test.ts', '*.test.tsx'],
      rules: {
        'max-nested-callbacks': ['error', 5],
      },
    },
  ],
};
