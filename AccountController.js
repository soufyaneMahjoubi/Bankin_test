const axios = require('axios');
const AuthController = require('./AuthController');
const transactionHydrator = require('./transactionHydrator');

class AccountController {
    /**
     * return all user accounts
     * @param {string} accessToken
     */
    async getAccount(accessToken) {
        let account = {};
        const config = {
            method: 'get',
            url: 'http://localhost:3000/accounts',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        await axios(config)
            .then((objAccount) => {
                account = objAccount.data;
            })
            .catch((error) => {
                console.log(error);
            });
        return account;
    }

    /**
     * return all transaction from account number
     * @param {string} accessToken
     * @param {string} AccountNumber
     */
    async getTransactionFromAccount(accessToken, AccountNumber) {
        let transaction = {};
        const config = {
            method: 'get',
            url: `http://localhost:3000/accounts/${AccountNumber}/transactions`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        await axios(config)
            .then((objTransaction) => {
                transaction = objTransaction.data;
            })
            .catch((error) => {
                console.log(error);
            });
        return transaction;
    }

    /**
     * @returns {object} formated account information
     */
    async getBankinInformation() {
        const { access_token: accessToken } = await AuthController.getAccessToken();
        const account = await this.getAccount(accessToken);
        const arrayAccount = account.account;
        const allAccountInformation = Promise.all(arrayAccount.map(async (accountInformation) => {
            // eslint-disable-next-line camelcase
            const { acc_number, amount } = accountInformation;
            const { transactions } = await this.getTransactionFromAccount(accessToken, acc_number);
            const formatedTransaction = await transactions
                .map((transaction) => transactionHydrator(transaction));
            const obj = {
                acc_number,
                amount,
                transactions: formatedTransaction,
            };
            return obj;
        }));
        return allAccountInformation;
    }
}

module.exports = new AccountController();
