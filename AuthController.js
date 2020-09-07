const axios = require('axios');

class AuthController {
    /**
     * Function to get refresh Token with User information
     * @returns {object} refreshToken
     */
    async getRefreshToken() {
        const userInformation = JSON.stringify({ user: 'BankinUser', password: '12345678' });
        let refreshToken = '';
        const config = {
            method: 'post',
            url: 'http://localhost:3000/login',
            headers: {
                Authorization: 'Basic QmFua2luQ2xpZW50SWQ6c2VjcmV0',
                'Content-Type': 'application/json',
            },
            data: userInformation,
        };

        await axios(config)
            .then((objRefreshToken) => {
                refreshToken = objRefreshToken.data;
            })
            .catch((error) => {
                console.log(error);
            });
        return refreshToken;
    }
}

module.exports = new AuthController();
