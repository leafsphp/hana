module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `@hanabira/config`
  extends: ["hana"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
