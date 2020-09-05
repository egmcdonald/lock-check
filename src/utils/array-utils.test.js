const { unique, flattened, mapReduce } = require("./array-utils");

describe.each`
  name           | fn           | input                     | expected
  ${"unique"}    | ${unique}    | ${[]}                     | ${[]}
  ${"unique"}    | ${unique}    | ${[1, 2, 3]}              | ${[1, 2, 3]}
  ${"unique"}    | ${unique}    | ${[1, 2, 3, 2, 1]}        | ${[1, 2, 3]}
  ${"flattened"} | ${flattened} | ${[]}                     | ${[]}
  ${"flattened"} | ${flattened} | ${[1, 2, 3]}              | ${[1, 2, 3]}
  ${"flattened"} | ${flattened} | ${[[1, 2], 3, [4, 5, 6]]} | ${[1, 2, 3, 4, 5, 6]}
`("$name", ({ fn, input, expected }) => {
  it(`should output ${JSON.stringify(expected)} when given ${JSON.stringify(
    input
  )}`, () => {
    const actual = fn(input);
    expect(actual).toEqual(expected);
  });
});

describe("mapReduce", () => {
  it.each`
    input                                                                               | expected
    ${[]}                                                                               | ${[]}
    ${[{ foo: "foo1", bar: "bar1" }, { foo: "foo2", bar: "bar2" }]}                     | ${["foo1", "foo2"]}
    ${[{ foo: ["foo1", "foo2"], bar: "bar1" }, { foo: "foo3", bar: "bar2" }]}           | ${["foo1", "foo2", "foo3"]}
    ${[{ foo: ["foo1", "foo2"], bar: "bar1" }, { foo: ["foo3", "foo4"], bar: "bar2" }]} | ${["foo1", "foo2", "foo3", "foo4"]}
  `("should output $expected when given $input", ({ input, expected }) => {
    const actual = mapReduce(input, "foo");
    expect(actual).toEqual(expected);
  });
});
