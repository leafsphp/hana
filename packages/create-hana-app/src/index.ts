import fs from 'fs';
import path from 'path';
import execa from 'execa';
import chalk from 'chalk';
import prompts from 'prompts';
import minimist from 'minimist';

import { copyDir, pkgFromUserAgent } from './utils';

const __dirname = path.resolve();

const cwd = process.cwd();
const argv = minimist<{
  template?: string;
}>(process.argv.slice(2));

const templates = [
  {
    name: 'javascript',
    color: chalk.yellow,
    display: 'JavaScript',
    value: 'js',
  },
  {
    name: 'typescript',
    color: chalk.blue,
    display: 'TypeScript',
    value: 'ts',
  },
];

const searchableTemplates = templates.map((template) => {
  return template.value;
});

const main = async () => {
  const targetDirectory = argv._[0];
  let results: prompts.Answers<'directory' | 'template'>;

  try {
    results = await prompts(
      [
        {
          type: !targetDirectory && 'text',
          name: 'directory',
          message: 'Project name:',
          initial: 'my-hana-app',
          validate: (dir) => {
            if (dir.trim().length === 0) {
              return 'Project name must not be empty';
            }

            if (
              !/^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
                dir
              )
            ) {
              return 'Invalid project name';
            }

            return true;
          },
        },
        {
          type: searchableTemplates.includes(argv.template!) ? null : 'select',
          name: 'template',
          initial: 0,
          message: 'Select a template:',
          choices: templates.map((template) => {
            const templateColor = template.color;

            return {
              title: templateColor(template.display || template.name),
              value: template,
            };
          }),
        },
        {
          type: null,
          // type: 'confirm',
          name: 'leaf',
          message: 'Setup SSR with Leaf PHP? ',
        },
      ],
      {
        onCancel: () => {
          throw new Error(chalk.red('✖') + ' Setup cancelled');
        },
      }
    );
  } catch (error: any) {
    console.log(error.message);
    return;
  }

  const { directory, template } = results;
  const appRoot = path.join(cwd, directory?.trim().replace(/\/+$/g, ''));

  if (fs.existsSync(appRoot)) {
    console.log(chalk.red('✖') + ` Directory ${appRoot} already exists`);
    return;
  }

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm';
  const isYarn = pkgManager === 'yarn';

  const selectedTemplate = path.join(
    __dirname,
    '..',
    'templates',
    template.name
  );

  try {
    copyDir(selectedTemplate, appRoot);
  } catch (err) {
    console.log(chalk.red('✖') + ' Could not scaffold project');
  }

  console.log(chalk.green('✔') + ' Project scaffolded successfully');

  const packageJsonPath = path.join(appRoot, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  packageJson.name = directory;
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2) + '\n'
  );

  console.log(chalk.green('✔') + ' Package.json updated');

  const installArgs = isYarn ? '' : 'install';
  const installOptions: any = {
    cwd: appRoot,
    stdio: 'inherit',
  };

  await execa.$(installOptions)`${pkgManager} ${installArgs}`;

  console.log(chalk.green('✔') + ' Dependencies installed');
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
