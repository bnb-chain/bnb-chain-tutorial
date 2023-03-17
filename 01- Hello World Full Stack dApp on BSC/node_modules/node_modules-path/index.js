// get our parent folder path
const path = require("path");
const fs = require("fs");

const pwd = __dirname.split(path.sep);

module.exports = function getPath(moduleName, folder = pwd) {
  if (folder.length < 1) {
    logError(moduleName, folder);
    return null;
  }
  const nodeModulesPath = folder.concat(["node_modules"]).join(path.sep);
  const p = moduleName
    ? path.join(nodeModulesPath, moduleName)
    : nodeModulesPath;
  if (fs.existsSync(p)) {
    return nodeModulesPath;
  }
  res = getPath(moduleName, folder.slice(0, -1));
  if (!res) logError(moduleName, folder);
  return res;
};

function logError(moduleName, folder) {
  console.error(
    `Could not find the node_modules folder ${
      moduleName ? "which contains " + moduleName : ""
    } in ${folder.join(path.sep)}`
  );
}
