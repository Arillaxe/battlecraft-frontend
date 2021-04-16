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

  async loginWith2fa(params) {
    const { data } = await axios.post(`${this.baseURL}/auth/2fa`, params);

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

  async getNewsSlider() {
    const { data } = await axios.get(`${this.baseURL}/news/slider`);

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

  async getShopItems(serverId, type) {
    const { data } = await axios.get(`${this.baseURL}/shop?server=${serverId}&type=${type}`);

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

  async buyItem(token, itemId) {
    const { data } = await axios.post(`${this.baseURL}/shop/buy`, {
      products: [itemId],
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return data;
  }

  async updateToken(token) {
    const { data } = await axios.post(`${this.baseURL}/auth/updateToken`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return data;
  }

  async getRefs(token) {
    const { data } = await axios.get(`${this.baseURL}/user/refs`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return data;
  }

  async change2fa(token, type) {
    const { data } = await axios.get(`${this.baseURL}/user/2fa?type=${type}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return data;
  }

  async confirm2fa(token, params) {
    const { data } = await axios.post(`${this.baseURL}/user/2fa/confirm`, params, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return data;
  }
}

const APISingleton = new API(process.env.REACT_APP_SERVER_HOST);

export default APISingleton;
