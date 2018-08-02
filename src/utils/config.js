const API = process.env.BASE_URL;

module.exports = {
  api: {
    userLogin: `${API}/auth`,
  },
  BASE_URL: API
};
