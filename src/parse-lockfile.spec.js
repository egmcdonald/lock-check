const fs = require("fs");
const path = require("path");

const parseLockfile = require("./parse-lockfile");

const readLockfile = lockfile =>
  fs.readFileSync(path.join(__dirname, "/test-data/", lockfile)).toString();

describe("parseLockfile", () => {
  it("should parse standard char packages", () => {
    const standardLock = readLockfile("standard.lock");

    const expected = [
      { name: "foo", requested: "^1.2.3", resolved: "1.2.4" },
      { name: "bar", requested: "^2.2.3", resolved: "2.2.4" },
      { name: "baz", requested: "^3.2.3", resolved: "3.2.4" }
    ];
    const actual = parseLockfile(standardLock);

    expect(actual).toEqual(expected);
  });

  it("should parse custom char packages", () => {
    const customLock = readLockfile("custom.lock");

    const expected = [
      { name: "@foo/foo", requested: "^1.2.3", resolved: "1.2.4" },
      { name: "@bar/bar", requested: "^2.2.3", resolved: "2.2.4" },
      { name: "@baz/baz", requested: "^3.2.3", resolved: "3.2.4" }
    ];
    const actual = parseLockfile(customLock);

    expect(actual).toEqual(expected);
  });
});
