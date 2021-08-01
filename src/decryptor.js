const fs = require('fs');
const path = require('path');
const chainStepper = require('./chainstepper');

var CryptoJS = require("crypto-js");

async function decrypt(file, password) {

  const cipher = fs.readFileSync(file).toString();
  let data = await CryptoJS.AES.decrypt(cipher, password).toString(CryptoJS.enc.Utf8);

  fs.rmSync(file);
  fs.writeFileSync(file, data);
  console.log(`Decrypted: ${file}`);

}

async function decryptor(file, opts) {

  let directory = process.cwd();

  // File collection
  if (file === '.') {
    chainStepper(directory, opts, decrypt);
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

module.exports = decryptor;
