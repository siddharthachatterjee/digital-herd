const DigitalHerdToken = artifacts.require("DigitalHerdToken");

module.exports = function (deployer) {
    deployer.deploy(DigitalHerdToken);
};
