module.exports = contents =>
  contents.match(/^\S.*\:\n\s\sversion.*$/gm).reduce((acc, pkg) => {
    const parsed = /^\"?(?<name>.+)@(?<requested>\^?\d\.\d\.\d)\"?\:\n\s\s.+\"(?<resolved>.+)\"/gm.exec(
      pkg
    );

    if (parsed && parsed.groups)
      acc.push({ ...parsed.groups, requested: [parsed.groups.requested] });

    return acc;
  }, []);
