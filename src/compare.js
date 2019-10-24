const readLockfile = require("./utils/read-lockfile");
const parseLockfile = require("./utils/parse-lockfile");

const { unique, mapReduce } = require("./utils/array-utils");

module.exports = (firstLockfile, secondLockfile) => {
  const firstContents = readLockfile(firstLockfile);
  const firstParsedFile = parseLockfile(firstContents);

  const secondContents = readLockfile(secondLockfile);
  const secondParsedFile = parseLockfile(secondContents);

  const firstNames = firstParsedFile.map(content => content.name);
  const secondNames = secondParsedFile.map(content => content.name);
  const uniqueNames = unique(firstNames.concat(secondNames));

  const joinedPackages = uniqueNames.reduce((acc, name) => {
    const firstPackage = firstParsedFile.filter(parsed => parsed.name === name);
    const secondPackage = secondParsedFile.filter(
      parsed => parsed.name === name
    );

    return [
      ...acc,
      {
        name,
        "first lockfile requested": mapReduce(firstPackage, "requested"),
        "first lockfile resolved": mapReduce(firstPackage, "resolved"),
        "second lockfile requested": mapReduce(secondPackage, "requested"),
        "second lockfile resolved": mapReduce(secondPackage, "resolved")
      }
    ];
  }, []);

  console.table(joinedPackages);
};
