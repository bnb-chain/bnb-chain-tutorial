var HelloWorld = artifacts.require('HelloWorld');
 
module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(HelloWorld);
};