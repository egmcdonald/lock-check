const readLockfile = require("./read-lockfile");
const parseLockfile = require("./parse-lockfile");

module.exports = lockfile => {
  const contents = readLockfile(lockfile);
  const parsedFile = parseLockfile(contents);

  console.table(parsedFile);
};
