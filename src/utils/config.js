const API = process.env.BASE_URL;
const AUTH_URL = process.env.AUTH_URL;

module.exports = {
    api: {
        userLogin: `${AUTH_URL}/oauth/token`,
        userInfo : `${AUTH_URL}/api/user`,
    },
    BASE_URL: API,
    AUTH_URL: AUTH_URL,
};
