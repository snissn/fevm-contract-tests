require('dotenv').config()
require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-web3')
require('@nomicfoundation/hardhat-chai-matchers')

task("create-fund-accounts", "Create accounts and fund them with 100 coins each, distributed from the root account")
    .setAction(async (_, hre) => {
        const rootPrivateKey = hre.config.networks.local.accounts[0];
        const rootWallet = new ethers.Wallet(rootPrivateKey, hre.ethers.provider);
        const numAccounts = process.env.NUM_ACCOUNTS;

        const accounts = [];
        for (let i = 0; i < numAccounts; i++) {
            const account = ethers.Wallet.createRandom();
            accounts.push(account);
            console.log(`Account ${i + 1}: ${account.address} (private key: ${account.privateKey})`);
        }

        for (const account of accounts) {
            const tx = await rootWallet.sendTransaction({
                to: account.address,
                value: ethers.utils.parseEther("100"),
            });
            console.log(`Funded account ${account.address} with 100 coins (tx hash: ${tx.hash})`);
        }

        console.log("All accounts have been funded");

        if (process.env.GITHUB_ACTIONS) {
            const fs = require('fs');
            const path = process.env.GITHUB_ENV;
            const out = accounts.map((account, i) => `ACCOUNT${i + 1}_PRIVATE_KEY=${account.privateKey}`).join("\n");
            fs.appendFileSync(path, out);
        }
    });
