const fs = require('fs');
const path = require('path');
const chainStepper = require('./chainstepper');

const AES = require("crypto-js/aes");

async function encrypt(file, password) {

  const data = fs.readFileSync(file).toString();
  let cipher = await AES.encrypt(data, password).toString();

  fs.rmSync(file);
  fs.writeFileSync(file, cipher);
  console.log(`Encrypted: ${file}`)

}

async function encryptor(file, opts) {

  let directory = process.cwd();

  // File collection
  if (file === '.') {
    chainStepper(directory, opts, encrypt);
    return;
  }

  // Single file
  await fs.readdir(directory, async (err, files) => {

    if (err) {
      console.log(err.message);
      return;
    }

    if (!files.includes(file))
      console.log('ERR: File not found in current directory')
    else
      await encrypt(path.join(directory, file), opts.password);

  });

}

module.exports = encryptor;
