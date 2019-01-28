import CONFIG from '@/utils/config';
import axios from 'axios';
import querystring from 'querystring';
import { Base64 } from 'js-base64';

const CLIENT_ID = process.env.CLIENT_ID;
const SECRET = process.env.SECRET;

const login = (username, password) => axios.post(CONFIG.api.userLogin, querystring.stringify({
  username:username,
  password:password,
  grant_type:'password'
}),{
    headers: {
    'Authorization': `Basic ${Base64.encode(CLIENT_ID+':'+SECRET)}`
}});

const getUserInfo = () => axios.post(CONFIG.api.userInfo);
export default {
  login, getUserInfo
};
