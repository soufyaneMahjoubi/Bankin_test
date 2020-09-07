const axios = require('axios');
const qs = require('qs');

class AuthController {
    /**
     * Function to get refresh Token with User information
     * @returns {object} refreshToken
     */
    async getRefreshToken() {
        const userInformation = JSON.stringify({ user: 'BankinUser', password: '12345678' });
        let refreshToken = {};
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

    /**
     * Function to get accessToken with refreshToken
     * @returns {object} accessToken
     */
    async getAccessToken() {
        const { refresh_token: refreshToken } = await this.getRefreshToken();
        let accessToken = {};
        const data = qs.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        });
        const config = {
            method: 'post',
            url: 'http://localhost:3000/token',
            headers: {
                Authorization: 'Basic QmFua2luVXNlcjoxMjM0NTY3OA==',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data,
        };

        await axios(config)
            .then((objAccessToken) => {
                accessToken = objAccessToken.data;
            })
            .catch((error) => {
                console.log(error);
            });
        return accessToken;
    }
}

module.exports = new AuthController();
