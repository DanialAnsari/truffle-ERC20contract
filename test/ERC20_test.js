const ERC20 = artifacts.require("./ERC20");

contract("ERC20", accounts => {
  it("should put 10000 Tokens in the first account", async () => {
    let instance = await ERC20.deployed();
    let balance = await instance.balanceOf.call(accounts[0]);
    console.log(balance);
    assert.equal(
      Number(balance) / 1000000000000000000,
      10000,
      "10000 wasn't in the first account"
    );
  });

  it("Account should recieve same amount as Transfered", async () => {
    let instance = await ERC20.deployed();
    await instance.transfer(accounts[2], "1000000000000000000", {
      from: accounts[0]
    });
    let balance = await instance.balanceOf.call(accounts[2]);
    // console.log(Num/ber(balance));
    assert.equal(
      Number(balance) / 1000000000000000000,
      1,
      "Account did not recieve amount which was transfered transfered"
    );
  });

  it("Account should be approved same amount as assigned", async () => {
    let instance = await ERC20.deployed();
    await instance.approve(accounts[2], "2000000000000000000", {
      from: accounts[0]
    });
    let approved_amount = await instance.allowance(accounts[0], accounts[2]);
    console.log("The amount is " + Number(approved_amount));
    assert.equal(
      Number(approved_amount) / 1000000000000000000,
      2,
      "Account was not approved amount inputted"
    );
  });

  //   it("should call a function that depends on a linked library", () => {
  //     let meta;
  //     let metaCoinBalance;
  //     let metaCoinEthBalance;

  //     return MetaCoin.deployed()
  //       .then(instance => {
  //         meta = instance;
  //         return meta.getBalance.call(accounts[0]);
  //       })
  //       .then(outCoinBalance => {
  //         metaCoinBalance = outCoinBalance.toNumber();
  //         return meta.getBalanceInEth.call(accounts[0]);
  //       })
  //       .then(outCoinBalanceEth => {
  //         metaCoinEthBalance = outCoinBalanceEth.toNumber();
  //       })
  //       .then(() => {
  //         assert.equal(
  //           metaCoinEthBalance,
  //           2 * metaCoinBalance,
  //           "Library function returned unexpected function, linkage may be broken"
  //         );
  //       });
  //   });

  //   it("should send coin correctly", () => {
  //     let meta;

  //     // Get initial balances of first and second account.
  //     const account_one = accounts[0];
  //     const account_two = accounts[1];

  //     let account_one_starting_balance;
  //     let account_two_starting_balance;
  //     let account_one_ending_balance;
  //     let account_two_ending_balance;

  //     const amount = 10;

  //     return MetaCoin.deployed()
  //       .then(instance => {
  //         meta = instance;
  //         return meta.getBalance.call(account_one);
  //       })
  //       .then(balance => {
  //         account_one_starting_balance = balance.toNumber();
  //         return meta.getBalance.call(account_two);
  //       })
  //       .then(balance => {
  //         account_two_starting_balance = balance.toNumber();
  //         return meta.sendCoin(account_two, amount, { from: account_one });
  //       })
  //       .then(() => meta.getBalance.call(account_one))
  //       .then(balance => {
  //         account_one_ending_balance = balance.toNumber();
  //         return meta.getBalance.call(account_two);
  //       })
  //       .then(balance => {
  //         account_two_ending_balance = balance.toNumber();

  //         assert.equal(
  //           account_one_ending_balance,
  //           account_one_starting_balance - amount,
  //           "Amount wasn't correctly taken from the sender"
  //         );
  //         assert.equal(
  //           account_two_ending_balance,
  //           account_two_starting_balance + amount,
  //           "Amount wasn't correctly sent to the receiver"
  //         );
  //       });
  //   });
});
