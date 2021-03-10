import axios from 'axios';

class API {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async register(params) {
    const { data } = await axios.post(`${this.baseURL}/auth/signup`, params);

    return data;
  }

  async login(params) {
    const { data } = await axios.post(`${this.baseURL}/auth/signin`, params);

    return data;
  }

  async getUser(token) {
    const { data } = await axios.get(`${this.baseURL}/auth/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return data.user;
  }

  async changePassword(token, params) {
    const { data } = await axios.post(`${this.baseURL}/user/change/password`, params, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return data;
  }
}

const APISingleton = new API('http://localhost:4000');

export default APISingleton;
