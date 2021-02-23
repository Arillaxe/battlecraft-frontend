import axios from 'axios';

class API {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async register(params) {
    const { data } = await axios.post(`${this.baseUrl}/auth/signup`, params);

    return data;
  }

  async login(params) {
    const { data } = await axios.post(`${this.baseUrl}/auth/signin`, params);

    return data;
  }
}

const APISingleton = new API('http://localhost:4000');

export default APISingleton;
