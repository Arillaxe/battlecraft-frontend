import { io } from 'socket.io-client';

class SocketIO {
  constructor(hostURL) {
    this.hostURL = hostURL;
    this.client = io(hostURL);
  }

  getClient() {
    return this.client;
  }
}

const SocketIOSingleton = new SocketIO(process.env.REACT_APP_SERVER_HOST);

export default SocketIOSingleton;
