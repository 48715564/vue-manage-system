const API = process.env.BASE_URL;
const AUTH_URL = process.env.AUTH_URL;

module.exports = {
    api: {
        userLogin: `${AUTH_URL}/uaa/oauth/token`,
        userInfo : `${AUTH_URL}/uaa/api/getUserInfo`,
        menuInfo: `${API}/uaa/api/getUserMenus`,
    },
    BASE_URL: API,
    AUTH_URL: AUTH_URL,
};
