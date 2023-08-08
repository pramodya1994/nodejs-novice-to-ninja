#!/usr/bin/env node

// fetch name from command or fallback
const nameArg = (process.argv[2] || process.env.USER || 'world');

// output message
console.log(`Hello ${ nameArg }!`);