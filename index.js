const accountController = require('./AccountController');

async function runtest() {
    const allInformation = await accountController.getBankinInformation();
    console.log(JSON.stringify(allInformation));
}

runtest();
