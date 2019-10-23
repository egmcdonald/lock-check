#!/usr/bin/env node

const program = require("commander");

const peek = require("../src/peek");

program
  .command("peek <lockfile>")
  .description(
    "Peek at the requested vs resolved versions of packages within a single lockfile"
  )
  .action(peek);

program.parse(process.argv);
