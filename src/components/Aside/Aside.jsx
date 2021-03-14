import { useState, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import API from '../../lib/api.js';
import './aside.sass';

const Aside = () => {
  const [streams, setStreams] = useState([]);

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
  }, []);

  return (
    <div className="info_block">
      <div className="online_block" data-aos="slide-up" data-aos-delay="200">
        <div className="title">Игровые сервера</div>
        <div className="server_block server_one">
          <div className="info_server">
            <div className="number">1</div>
            <div className="name_server">
              BattleCraft PVP
              <div className="spinner spinner-green"></div>
            </div>
            <div className="online_status online"></div>
          </div>
          <div className="progress_bar">
            <div className="value" style={{ width: '20%' }}></div>
          </div>
          <div className="server_players">1000</div>
        </div>
        <div className="server_block server_two">
          <div className="info_server">
            <div className="number">2</div>
            <div className="name_server">
              BattleCraft RPG
              <div className="spinner spinner-green"></div>
            </div>
            <div className="online_status online"></div>
          </div>
          <div className="progress_bar">
            <div className="value" style={{ width: '70%' }}></div>
          </div>
          <div className="server_players">1000</div>
        </div>
        <div className="server_block server_two">
          <div className="info_server">
            <div className="number">3</div>
            <div className="name_server">
              BattleCraft RPG
              <div className="spinner spinner-green"></div>
            </div>
            <div className="online_status online"></div>
          </div>
          <div className="progress_bar">
            <div className="value" style={{ width: '45%' }}></div>
          </div>
          <div className="server_players">1000</div>
        </div>
      </div>
      <div className="stream_block" data-aos="slide-up">
        <div className="title">
          Прямая трансляция
          <div className="spinner spinner-red"></div>
        </div>
        {streams.map(({ id, channel }) => (
          <iframe
            key={`streams-channel-${id}`}
            src={`https://player.twitch.tv/?channel=${channel}&parent=localhost&autoplay=false`}
            frameBorder="0"
            allowFullScreen={true}
            scrolling="no"
          />
        ))}
        {/* <div className="no_stream">Нет трансляций</div>
        <div className="no_stream">Нет трансляций</div> */}
      </div>
    </div>
  );
};

export default Aside;
