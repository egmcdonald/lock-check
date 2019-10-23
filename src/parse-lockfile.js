module.exports = contents =>
  contents.match(/^\S.*\:\n\s\sversion.*$/gm).reduce((acc, pkg) => {
    const parsed = /^\"?(?<name>.+)@(?<requested>\^?\d\.\d\.\d)\"?\:\n\s\s.+\"(?<resolved>.+)\"/gm.exec(
      pkg
    );
    return parsed && parsed.groups ? [...acc, parsed.groups] : acc;
  }, []);
