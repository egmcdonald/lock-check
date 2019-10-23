module.exports = contents => {
  return contents
    .match(/^\S.*\:\n\s\sversion.*$/gm)
    .map(
      pkg =>
        /^\"?(?<name>.+)@(?<requested>\^?\d\.\d\.\d)\"?\:\n\s\s.+\"(?<resolved>.+)\"/gm.exec(
          pkg
        ).groups
    );
};
