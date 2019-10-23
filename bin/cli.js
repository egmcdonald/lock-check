#!/usr/bin/env node

const program = require("commander");

const peek = require("../src/peek");

program.command("peek <lockfile>").action(peek);

program.parse(process.argv);
