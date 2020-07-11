var Token = artifacts.require("./Token.sol");

contract('Token', function (accounts) {
    var tokenInstance;
    it('allocates the initial supply upon deployment', function () {
        return Token.deployed().then(function (instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function (totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000000, 'sets the total supply to 1,000,000');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function (adminBalance) {
            assert.equal(adminBalance.toNumber(), 1000000000, 'it allocates the initial supply to the admin account');
            return tokenInstance.transfer(accounts[1], 250000, { from: accounts[0] });
        }).then(function (receipt) {
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
            assert.equal(receipt.logs[0].args.from, accounts[0], 'logs the account the tokens are transferred from');
            assert.equal(receipt.logs[0].args.to, accounts[1], 'logs the account the tokens are transferred to');
            assert.equal(receipt.logs[0].args.tokens, 250000, 'logs the transfer amount');
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function (balance) {
            assert.equal(balance.toNumber(), 250000, 'adds the amount to the receiving account');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function (balance) {
            assert.equal(balance.toNumber(), 999750000, 'deducts the amount from the sending account');
        });
    });

});