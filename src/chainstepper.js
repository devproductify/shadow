const fs = require('fs');
const path = require('path');

async function chainStepper(directory, opts, callback) {
  await fs.readdir(directory, async (err, files) => {

    if (err) {
      console.log(err.message);
      return;
    }

    for (let it = 0; it < files.length; it++) {

      const file = files[it];
      let objectPath = path.join(directory, file);

      await fs.lstat(objectPath, async (err, res) => {

        if (err)
          console.log(err);

        if (res.isDirectory()) {
          if (opts?.recursive)
            await chainStepper(objectPath, opts, callback);
          else
            console.log(`Skipped: ${objectPath} (dir)`);
        }

        else if (String(opts.include).length !== 0) {
          if (file.endsWith(`.${opts.include}`))
            await callback(objectPath, opts.password);
          else
            console.log(`Skipped: ${objectPath} (rule)`)
        }

        else if (String(opts.exclude).length !== 0) {
          if (!file.endsWith(`.${opts.exclude}`))
            await callback(objectPath, opts.password);
          else
            console.log(`Skipped: ${objectPath} (rule)`)
        }

        else
          await callback(objectPath, opts.password);
      })
    }
  })
}

module.exports = chainStepper;