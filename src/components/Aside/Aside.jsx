import { useState, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import API from '../../lib/api.js';
import SocketIO from '../../lib/socketIO.js';
import './aside.sass';

const Aside = () => {
  const [streams, setStreams] = useState([]);
  const [servers, setServers] = useState([]);

  const fetchStreams = async () => {
    try {
      const streams = await API.getStreams(localStorage.getItem('token'));

      setStreams(streams);
    } catch (e) {
      NotificationManager.error(e.response.data.message);
    }
  };

  useEffect(() => {
    fetchStreams();

    SocketIO.getClient().on('get_servers_info', (serversInfo) => {
      setServers(serversInfo);
    });
    SocketIO.getClient().emit('get_servers_info');
  }, []);

  return (
    <div className="info_block">
      <div className="online_block" data-aos="slide-up" data-aos-delay="200">
        <div className="title">Игровые сервера</div>
        {servers.map((server, idx) => (
          <div key={`server-info-${idx}`} className={`server_block ${server.inactive && 'server_inactive'}`}>
            <div className="info_server">
              <div className="number">{idx + 1}</div>
              <div className="name_server">{server.name}</div>
              <div className="online_status online"></div>
            </div>
            <div className="progress_bar">
              <div className="value" style={{ width: `${server.players / server.max_players * 100}%` }}></div>
            </div>
            <div className="server_players">{server.players || 0}</div>
          </div>
        ))}
      </div>
      <div className="stream_block" data-aos="slide-up">
        <div className="title">
          Прямые трансляции
        </div>
        {streams.length > 0 && streams.map(({ id, channel }) => (
          <iframe
            key={`streams-channel-${id}`}
            src={`https://player.twitch.tv/?channel=${channel}&parent=localhost&autoplay=false`}
            frameBorder="0"
            allowFullScreen={true}
            scrolling="no"
          />
        ))}
        {streams.length === 0 && (
          <div className="no_stream">Нет трансляций</div>
        )}
      </div>
    </div>
  );
};

export default Aside;
