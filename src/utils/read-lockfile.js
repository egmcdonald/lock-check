const fs = require("fs");
const path = require("path");

module.exports = lockfile => {
  if (!lockfile.endsWith(".lock"))
    throw new Error(`File ${lockfile} is not a valid lockfile`);

  const fullPath = path.join(process.cwd(), lockfile);

  if (!fs.existsSync(fullPath))
    throw new Error(`File ${fullPath} does not exist`);

  return fs.readFileSync(fullPath).toString();
};
