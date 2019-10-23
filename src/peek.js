const readLockfile = require("./utils/read-lockfile");
const parseLockfile = require("./utils/parse-lockfile");

module.exports = lockfile => {
  const contents = readLockfile(lockfile);
  const parsedFile = parseLockfile(contents);

  console.table(parsedFile);
};
