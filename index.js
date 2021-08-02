#!/usr/bin/env node

const { program } = require('commander');
const encryptor = require('./src/encryptor');
const decryptor = require('./src/decryptor');

let command = '';
async function main(cmd, opts) {

  if (cmd.file === undefined)
    cmd.file = '.';

  if ((cmd.file !== '.') && ((opts.include !== '') || (opts.exclude !== ''))) {
    console.log('ERR: parameters (-i|-e) are not applicable for single file');
    return;
  }

  switch (cmd.type) {

    case 'encrypt':
      await encryptor(cmd.file, opts);
      break;

    case 'decrypt':
      await decryptor(cmd.file, opts);
      break;

    default:
      console.log('Invalid option');
  }
}


// Metadata
program
  .name('shadow')
  .version('1.0.2');

// Argument(s)
program
  .option('-r, --recursive', 'recursive operation inside child directories')
  .option('-i, --include <type>', 'specify the file extension allowed for processing', '')
  .option('-e, --exclude <type>', 'specify the file extension to exclude for processing', '')
  .requiredOption('-p, --password <password>', 'secret key to encrypt/decrypt file(s)')

// Command(s)
program
  .command('encrypt [file]')
  .description('Encrypt the specified file, otherwise collection of files')
  .action(file => (command = { type: 'encrypt', file }));

program
  .command('decrypt [file]')
  .description('Decrypt the specified file, otherwise collection of files')
  .action(file => (command = { type: 'decrypt', file }));


program.parse(process.argv);
const options = program.opts();

main(command, options);


