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

  async getNews(page) {
    const { data } = await axios.get(`${this.baseURL}/news?page=${page}`);

    return data;
  }

  async getNewsById(id) {
    const { data } = await axios.get(`${this.baseURL}/news/${id}`);

    return data;
  }

  async getStreams() {
    const { data } = await axios.get(`${this.baseURL}/streams`);

    return data;
  }

  async getShopItemsByServer(page, server) {
    const { data } = await axios.get(`${this.baseURL}/shop?page=${page}&server=${server}`);

    return data;
  }

  async getServers() {
    const { data } = await axios.get(`${this.baseURL}/servers`);

    return data;
  }

  async uploadSkin(token, params) {
    const { data } = await axios.post(`${this.baseURL}/user/change/skin`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });

    return data;
  }
}

const APISingleton = new API(process.env.REACT_APP_SERVER_HOST);

export default APISingleton;
