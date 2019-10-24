# lock-check

[![npm version](https://badge.fury.io/js/lock-check.svg)](https://www.npmjs.com/package/lock-check)
[![build status](https://travis-ci.org/egmcdonald/lock-check.svg?branch=master)](https://travis-ci.org/egmcdonald/lock-check)

A tool to peek at and compare yarn lockfiles.

---

## Installation

This package is available [via `npm`](https://www.npmjs.com/package/lock-check). To install globally, run the following command:

```bash
npm install -g lock-check
```

Note that [`node`](https://nodejs.org/en/download/) and [`npm`](https://www.npmjs.com/get-npm) must be installed prior to the command being run. The recommended minimum `node` version is `v10`.

## Usage

There are a number of commands available for the `lock-check` tool:

- [`peek`](#peek): Peek at the requested vs resolved versions of packages within a single lockfile
- [`compare`](#compare): Compare the requested vs resolved versions of packages between two lockfiles

A list of currently available commands can also be fetched from the tool by running the `help` command:

```bash
lock-check help
```

### Peek

The `peek` command takes a single relative path to a `yarn` lockfile, and performs a simple transform. The transform will output a table to the console window, outlining the requested vs resolved versions of `yarn` packages that have been included in the specified lockfile.

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

### Compare

The `compare` command takes a two relative paths to two separate `yarn` lockfiles, and performs a comparison. The comparison will output a table to the console window, outlining the requested vs resolved versions of `yarn` packages that have been included across the two specified lockfiles.

Here is the API for the `compare` command:

```bash
compare <first-lockfile> <second-lockfile>
```

Here is an example usage of the `compare` command:

```bash
lock-check compare ./project-1/yarn.lock ./project-2/yarn.lock
```

Here is an example of the output for the `compare` command:

```
┌─────────┬───────┬──────────────────────────┬─────────────────────────┬───────────────────────────┬──────────────────────────┐
│ (index) │ name  │ first lockfile requested │ first lockfile resolved │ second lockfile requested │ second lockfile resolved │
├─────────┼───────┼──────────────────────────┼─────────────────────────┼───────────────────────────┼──────────────────────────┤
│    0    │ 'bar' │      [ '^2.20.3' ]       │      [ '2.20.4' ]       │ [ '^2.20.3', '^2.20.4' ]  │       [ '2.20.5' ]       │
│    1    │ 'baz' │      [ '^3.2.30' ]       │      [ '3.2.40' ]       │ [ '^3.2.30', '~3.2.40' ]  │       [ '3.2.50' ]       │
│    2    │ 'foo' │      [ '^10.2.3' ]       │      [ '10.2.4' ]       │ [ '^10.2.3', '^10.2.4' ]  │       [ '10.2.5' ]       │
└─────────┴───────┴──────────────────────────┴─────────────────────────┴───────────────────────────┴──────────────────────────┘
```
