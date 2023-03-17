const assert = require('assert');
const fs = require('fs');
const path = require('path');

// test function
const srcFile = 'index.js';
function testFromLocation(dest, moduleName) {
  // console.log('Test: move the script to', dest);
  const destModFolder = path.join(dest, 'node_modules-path');
  const destFile = path.join(destModFolder, srcFile);
  try {
    fs.mkdirSync(destModFolder);
    fs.copyFileSync(srcFile, destFile);
  }
  catch(e) {}
  const node_modules = require(destFile);
  return node_modules(moduleName);
}

// init folders
const testsFolder = path.resolve(__dirname, 'tests');
const node_modules0 = path.resolve(__dirname, 'tests/node_modules');
const node_modules1 = path.resolve(__dirname, 'tests/node_modules/module1/node_modules');
const node_modules2 = path.resolve(__dirname, 'tests/node_modules/module1/node_modules/module2/node_modules');
fs.mkdirSync(testsFolder);
fs.mkdirSync(node_modules0);
fs.mkdirSync(path.resolve(node_modules0, 'module1'));
fs.mkdirSync(node_modules1);
fs.mkdirSync(path.resolve(node_modules1, 'module2'));
fs.mkdirSync(node_modules2);

// tests
try {
  assert.equal(node_modules0, testFromLocation(node_modules0, 'module1'));
  assert.equal(node_modules0, testFromLocation(node_modules1, 'module1'));
  assert.equal(node_modules1, testFromLocation(node_modules1, 'module2'));
  assert.equal(node_modules0, testFromLocation(node_modules2, 'module1'));
  assert.equal(node_modules1, testFromLocation(node_modules2, 'module2'));
}
catch(e) {
  console.error(e.message);
  console.error('-------------');
  cleanup();
  throw e;
}
console.log('Test success');

// cleanup
function rmdir(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        rmdir(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};
function cleanup() {
  console.log('Cleanup: remove tests/');
  rmdir(path.resolve(__dirname, 'tests'));
  console.log('Done');
}
cleanup();
