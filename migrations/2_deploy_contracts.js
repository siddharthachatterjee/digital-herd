const AnimalsCollectible = artifacts.require("AnimalsCollectible");

module.exports = function (deployer) {
  deployer.deploy(AnimalsCollectible);
};