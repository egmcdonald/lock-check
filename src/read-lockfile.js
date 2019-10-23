const fs = require("fs");

module.exports = lockfile => {
  if (!lockfile.endsWith(".lock")) {
    throw new Error(`File ${lockfile} is not a valid lockfile`);
  }

  if (!fs.existsSync(lockfile)) {
    throw new Error(`File ${lockfile} does not exist`);
  }

  return fs.readFileSync(lockfile).toString();
};
