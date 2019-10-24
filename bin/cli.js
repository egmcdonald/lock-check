#!/usr/bin/env node

const program = require("commander");

const peek = require("../src/peek");
const compare = require("../src/compare");

program
  .command("peek <lockfile>")
  .description(
    "Peek at the requested vs resolved versions of packages within a single lockfile"
  )
  .action(peek);

program
  .command("compare <first-lockfile> <second-lockfile>")
  .description(
    "Compare the requested vs resolved versions of packages between two lockfiles"
  )
  .action(compare);

program.parse(process.argv);
