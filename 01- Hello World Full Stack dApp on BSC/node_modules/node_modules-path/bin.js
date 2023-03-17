#!/usr/bin/env node

const getPath = require("./index.js");
const result = getPath(process.argv[2]);

// set an env var - avail to the current process, not in the global shell process
process.env.NODE_MODULES = result;

// return the node_module path
console.log(result);
