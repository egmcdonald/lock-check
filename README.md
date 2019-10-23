# lock-check

A tool to peek at and compare yarn lockfiles

## Installation

This package is available [via `npm`](https://www.npmjs.com/package/lock-check). To install globally, run the following command:

```bash
npm install -g lock-check
```

Note that [`node`](https://nodejs.org/en/download/) and [`npm`](https://www.npmjs.com/get-npm) must be installed prior to the command being run. The recommended minimum `node` version is `v10`.

## Usage

There are a number of commands available for the `lock-check` tool:

- [`peek`](#peek): Peek at the requested vs resolved versions of packages within a single lockfile

A list of currently available commands can also be fetched from the tool by running the `help` command:

```bash
lock-check help
```

### Peek

The peek command takes a single relative path to a `yarn` lockfile, and performs a simple transform. The transform will output a table to the console window, outlining the requested vs resolved versions of `yarn` packages that have been included in the specified lockfile.

Here is the API for the `peek` command:

```bash
peek <lockfile>
```

Here is an example usage of the `peek` command:

```bash
lock-check peek ./yarn.lock
```

Here is an example of the output for the `peek` command:

```
┌─────────┬───────┬───────────────┬──────────┐
│ (index) │ name  │   requested   │ resolved │
├─────────┼───────┼───────────────┼──────────┤
│    0    │ 'foo' │ [ '^10.2.3' ] │ '10.2.4' │
│    1    │ 'bar' │ [ '^2.20.3' ] │ '2.20.4' │
│    2    │ 'baz' │ [ '^3.2.30' ] │ '3.2.40' │
└─────────┴───────┴───────────────┴──────────┘
```
