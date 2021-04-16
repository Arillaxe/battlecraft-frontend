import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Spinner from 'react-bootstrap/Spinner';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import API from '../../lib/api.js';
import { ItemModal } from './components';
import './shop.sass';

const types = {
  item: 'Предмет',
  privilege: 'Привелегия',
};

const Shop = () => {
  const history = useHistory();

  const [items, setItems] = useState([]);
  const [servers, setServers] = useState([]);
  const [currentServer, setCurrentServer] = useState({});
  const [currentType, setCurrentType] = useState(Object.keys(types)[0]);
  const [loading, setLoading] = useState(false);
  const [itemModalVisible, setItemModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  const fetchItems = async () => {
    setLoading(true);

    const items = await API.getShopItems(currentServer.id, currentType);

    setItems(items);
    setLoading(false);
  }

  useEffect(() => {
    const fetchServers = async () => {
      setLoading(true);

      const servers = await API.getServers();

      setServers(servers);
      setCurrentServer(servers[0]);
      setLoading(false);
    };

    fetchServers();
  }, []);

  useEffect(() => {
    fetchItems();
  }, [currentServer, currentType]);

  const openItemModal = (id) => {
    const item = items.find(({ id: itemId }) => itemId === id);

    setCurrentItem(item);
    setItemModalVisible(true);
  };

  const buyItem = async (item) => {
    if (!localStorage.getItem('token')) {
      NotificationManager.warning(`Войдите прежде чем совершать покупки`);

      return history.push('/login');
    }

    try {
      setLoading(true);

      await API.buyItem(localStorage.getItem('token'), item.id);

      NotificationManager.success(`${item.title} успешно куплен`);

      setItemModalVisible(false);
    } catch (e) {
      NotificationManager.error(e.response.data.message);
    }

    setLoading(false);
  };

  return (
    <div className="shop">
      {loading && (
        <div className="spinner-wrapper">
          <Spinner animation="border" role="status" variant="light" />
        </div>
      )}
      <h2>Донат</h2>
      <div className="shop-controls">
        <div className="shop-controls-title">Выберите сервер:</div>
        <DropdownButton className="shop-dropdown" id="dropdown-basic-button" title={currentServer.name || 'Загрузка...'}>
          {servers.map((server) => (
            <Dropdown.Item key={server.id} onClick={() => setCurrentServer(server)}>{server.name}</Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
      <div className="shop-tabs">
      <Tabs defaultActiveKey={currentType} id="shop-tabs" onSelect={(type) => setCurrentType(type)}>
        {Object.keys(types).map((type) => (
          <Tab eventKey={type} key={`shop-tab-${type}`} title={types[type]}>
            <div className="shop-items">
              {items.filter(({ type }) => type === currentType).map(({ id, title, image, price }) => (
                <div key={id} className="shop-item" onClick={() => openItemModal(id)}>
                  <div className="shop-image-wrapper">
                    <img src={`${process.env.REACT_APP_SERVER_HOST}/images/${image}`} alt="" />
                  </div>
                  <div className="shop-item-info">
                    <div className="shop-item-title">{title}</div>
                    <div className="shop-item-price">{price}</div>
                  </div>
                </div>
              ))}
            </div>
          </Tab>
        ))}
      </Tabs>
      </div>
      <ItemModal
        visible={itemModalVisible}
        onClose={() => setItemModalVisible(false)}
        item={currentItem}
        buyItem={buyItem}
      />
    </div>
  );
};

export default Shop;
