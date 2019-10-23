const fs = require("fs");
const path = require("path");

const parseLockfile = require("./parse-lockfile");

const readLockfile = lockfile =>
  fs.readFileSync(path.join(__dirname, "/test-data/", lockfile)).toString();

describe("parseLockfile", () => {
  const expectedStandard = [
    { name: "foo", requested: ["^1.2.3"], resolved: "1.2.4" },
    { name: "bar", requested: ["^2.2.3"], resolved: "2.2.4" },
    { name: "baz", requested: ["^3.2.3"], resolved: "3.2.4" }
  ];

  const expectedCustom = [
    { name: "@foo/foo", requested: ["^1.2.3"], resolved: "1.2.4" },
    { name: "@bar/bar", requested: ["^2.2.3"], resolved: "2.2.4" },
    { name: "@baz/baz", requested: ["^3.2.3"], resolved: "3.2.4" }
  ];

  const expectedMultiStandard = [
    { name: "foo", requested: ["^1.2.3", "^1.2.4"], resolved: "1.2.5" },
    { name: "bar", requested: ["^2.2.3", "^2.2.4"], resolved: "2.2.5" },
    { name: "baz", requested: ["^3.2.3", "^3.2.4"], resolved: "3.2.5" }
  ];

  const expectedMultiCustom = [
    { name: "@foo/foo", requested: ["^1.2.3", "^1.2.4"], resolved: "1.2.5" },
    { name: "@bar/bar", requested: ["^2.2.3", "^2.2.4"], resolved: "2.2.5" },
    { name: "@baz/baz", requested: ["^3.2.3", "^3.2.4"], resolved: "3.2.5" }
  ];

  it.each`
    file                | expected
    ${"standard"}       | ${expectedStandard}
    ${"custom"}         | ${expectedCustom}
    ${"multi-standard"} | ${expectedMultiStandard}
    ${"multi-custom"}   | ${expectedMultiCustom}
  `("should parse $file char packages", ({ file, expected }) => {
    const lockfile = readLockfile(`${file}.lock`);
    const actual = parseLockfile(lockfile);

    expect(actual).toEqual(expected);
  });
});
