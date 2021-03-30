import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import API from '../../lib/api.js';
import './servers.sass';

const Servers = () => {
  const { id } = useParams();

  const [server, setServer] = useState({ main_info: {}, features: [], mods: [], screenshots: [] });

  useEffect(() => {
    const fetchServers = async () => {
      const servers = await API.getServers();

      setServer(servers.find(({ id: serverId }) => serverId === id ));
    };

    fetchServers();
  }, [id]);

  console.log(server);

  return (
    <div className="servers">
      <h2>{server.name}</h2>
      <div className="blocks">
        <div className="block">
          <div className="title">ОСНОВНЫЕ ХАРАКТЕРИСТИКИ</div>
          <div className="servers-mainInfo">
            <div className="servers-mainInfo-section">
              <div className="servers-mainInfo-title">Версия игры</div>
              <div className="servers-mainInfo-text">{server.main_info.game_version}</div>
            </div>
            <div className="servers-mainInfo-section">
              <div className="servers-mainInfo-title">PvP режим</div>
              <div className="servers-mainInfo-text">{server.main_info.pvp ? 'Включен' : 'Выключен'}</div>
            </div>
            <div className="servers-mainInfo-section">
              <div className="servers-mainInfo-title">Экономика</div>
              <div className="servers-mainInfo-text">{server.main_info.economy ? 'Присутствует' : 'Отсутствует'}</div>
            </div>
            <div className="servers-mainInfo-section">
              <div className="servers-mainInfo-title">Генерация карты</div>
              <div className="servers-mainInfo-text">{server.main_info.map_generation}</div>
            </div>
            <div className="servers-mainInfo-section">
              <div className="servers-mainInfo-title">Последний вайп</div>
              <div className="servers-mainInfo-text">{server.main_info.last_wipe}</div>
            </div>
          </div>
        </div>
        <div className="block">
          <div className="title">ОСОБЕННОСТИ СЕРВЕРА</div>
          <div className="servers-featuresList">
            {server.features.map((feature, idx) => (
              <div key={`server-feature-${idx}`} className="servers-featuresList-feature">
                <span className="material-icons">keyboard_backspace</span>
                <div>{feature}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="block">
          <div className="title">КЛИЕНТСКИЕ МОДЫ</div>
          <div className="servers-mods">
            {server.mods.map((mod, idx) => (
              <div key={`server-mod-${idx}`} className="servers-mods-mod">{mod}</div>
            ))}
          </div>
        </div>
        <div className="block">
          <div className="title">СКРИНШОТЫ СЕРВЕРА</div>
          <div className="servers-screenshots">
            <Container>
              <Carousel>
                {server.screenshots && server.screenshots.map((url, idx) => (
                  <Carousel.Item key={`server-screenshot-${idx}`}>
                    <img src={url} alt="F" className="d-block w-100" />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servers;
