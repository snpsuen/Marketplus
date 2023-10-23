const Marketplus = artifacts.require("Marketplus");

module.exports = function(deployer) {
  deployer.deploy(Marketplus);
};
