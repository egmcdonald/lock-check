module.exports = contents =>
  contents
    .match(/^\S.*\:\n\s\sversion.*$/gm)
    .reduce((accumulatedPackages, pkg) => {
      const [requestedLine, versionLine] = pkg.split("\n");

      let name;

      const requestedPackages = requestedLine.split(",");
      const listOfRequestedPackages =
        requestedPackages &&
        requestedPackages.reduce(
          (accumulatedRequestedPackages, requestedPackage) => {
            const parsed = /^\"?(?<name>.+)@(?<requested>((\^|\~)?\d+(\.\d+){0,2}|\*))\"?/gm.exec(
              requestedPackage
            );
            if (parsed && parsed.groups) {
              if (!name) name = parsed.groups.name.trim();
              accumulatedRequestedPackages.push(parsed.groups.requested);
            }

            return accumulatedRequestedPackages;
          },
          []
        );

      const parsedVersion = /^.+\"(?<version>.+)\"$/.exec(versionLine);
      const resolvedVersion =
        parsedVersion && parsedVersion.groups && parsedVersion.groups.version;

      if (listOfRequestedPackages && resolvedVersion)
        accumulatedPackages.push({
          name,
          requested: listOfRequestedPackages,
          resolved: resolvedVersion
        });

      return accumulatedPackages;
    }, []);
