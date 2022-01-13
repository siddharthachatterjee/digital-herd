const DigitalHerdToken = artifacts.require("DigitalHerdToken");

module.exports = function (deployer) {
    deployer.deploy(DigitalHerdToken, 10000 * Math.pow(10, 18));
};
