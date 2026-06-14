#!/usr/bin/env node
import { render } from 'ink';
import meow from 'meow';
import { CreateCommand } from './commands/create.js';
import { UpdateCommand } from './commands/update.js';

const cli = meow(
  `
  Usage
    $ xebon create <project-name>
    $ xebon update

  Commands
    create <name>   Scaffold a new blog from the xebon template
    update          Sync framework files with upstream

  Options
    --help     Show help
    --version  Show version

  Examples
    $ xebon create my-blog
    $ xebon update
`,
  { importMeta: import.meta },
);

const [first, second] = cli.input;

if (first === 'update') {
  render(<UpdateCommand />);
} else if (first === 'create') {
  render(<CreateCommand initialName={second} />);
} else {
  // xebon <name> or xebon with no args
  render(<CreateCommand initialName={first} />);
}
