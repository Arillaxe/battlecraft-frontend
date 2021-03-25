import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Spinner from 'react-bootstrap/Spinner';
import {
  SkinViewer,
  createOrbitControls,
  WalkingAnimation,
} from 'skinview3d';
import { UploadImage } from '../../components';
import { userSlice } from '../../slices';
import API from '../../lib/api.js';
import './lk.sass';

const Lk = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const imageRef = useRef();

  const user = useSelector(({ user }) => user);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (!user.token) {
      history.push('/');
    } else {
      const skinViewer = new SkinViewer({
        canvas: document.getElementById('skin_container'),
        width: 300,
        height: 400,
        skin: `/images/${user.skin}`,
      });
  
      createOrbitControls(skinViewer);
      skinViewer.animations.add(WalkingAnimation);
    }
  }, [user]);

  const changePassword = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.target);
    try {
      const { token } = await API.changePassword(user.token, Array.from(formData.keys()).reduce((acc, key) => ({ ...acc, [key]: formData.get(key) }), {}));

      dispatch(userSlice.actions.setData({ token }));
      setPasswordError('');
      NotificationManager.success('Пароль успешно изменен!');
      e.target.reset();
    } catch (e) {
      setPasswordError(e.response.data.message);
    }

    setLoading(false);
  };

  const uploadSkin = async (file) => {
    setLoading(true);

    console.log(File);

    const formData = new FormData();
    formData.append('skin', file);
    try {
      const { skin } = await API.uploadSkin(user.token, formData);

      dispatch(userSlice.actions.setData({ skin }));
      NotificationManager.success('Пароль успешно изменен!');
    } catch (e) {
      NotificationManager.error(e.response.data.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="content-lk">
        {loading && (
          <div className="spinner-wrapper">
            <Spinner animation="border" role="status" variant="light" />
          </div>
        )}
        <div className="user-header">
          <div className="bg-blur"></div>
          <div className="avatar"></div>
          <div className="username">{user.login}</div>
        </div>
        <Tabs className="tabs" defaultActiveKey="main">
          <Tab title="Основное" eventKey="main">
            <Row>
              <Col md="6">
                <div className="block">
                <div className="title">Скин</div>
                  <canvas id="skin_container"></canvas>
                  <div className="buttons">
                    <UploadImage ref={imageRef} id="skin-upload" label="Загрузить скин" onChange={uploadSkin} className="btn_skin" />
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="block">
                  <div className="title">Ваши привелегии</div>
                  <div className="text-danger">Отсутствуют</div>
                </div>
                <div className="block">
                  <div className="title">Статистика ваших рефералов</div>
                  <div className="text-danger">Вы еще не привели друга</div>
                </div>
                <div className="block">
                  <div className="title">Ваш реферальный код</div>
                  <div className="text-info">{user.ref_code}</div>
                </div>
              </Col>
            </Row>
          </Tab>
          <Tab title="Баланс" eventKey="balance">
            <Row>
              <Col md="12">
                <div className="block">
                  <div className="title">Ваш баланс</div>
                  <div className="lk-balance">
                    <span className="material-icons">paid</span>
                    {user.crystals} монет
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="block">
                <div className="title">Покупка монет</div>
                  <Form>
                    <Form.Group controlId="formBasicBuy">
                      <Form.Label>Количество</Form.Label>
                      <Form.Control type="text" placeholder="100" />
                    </Form.Group>
                    <button>Купить</button>
                  </Form>
                </div>
              </Col>
              <Col md="6">
                <div className="block">
                  <div className="title">Перевод монет другому игроку</div>
                  <Form>
                    <Form.Group controlId="formBasicPlayerName">
                      <Form.Label>Ник игрока</Form.Label>
                      <Form.Control type="text" placeholder="Введите ник игрока" />
                    </Form.Group>
                    <Form.Group controlId="formBasicSum">
                      <Form.Label>Сумма</Form.Label>
                      <Form.Control type="text" placeholder="Введите сумму" />
                    </Form.Group>
                    <button>Отправить</button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Tab>
          <Tab title="Голосование" eventKey="vote">
            <Row>
              <Col md="6">
                <div className="block">
                <div className="title">Голосование</div>
                  <Form>
                    <Form.Group controlId="formBasicSite">
                      <Form.Label>Рейтинг</Form.Label>
                      <Form.Control as="select">
                        <option value="MMC">MMC</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicServer">
                      <Form.Label>Сервер</Form.Label>
                      <Form.Control as="select">
                        <option value="BattleCraft PVP">BattleCraft PVP</option>
                        <option value="BattleCraft RPG">BattleCraft RPG</option>
                      </Form.Control>
                    </Form.Group>
                    <button>Проголосовать</button>
                  </Form>
                  <div className="subBlock">
                    <button>Рейтинг голосующих</button>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="block">
                  <div className="title">Обмен голосов на бонусы</div>
                  <Form>
                    <Form.Group controlId="formBasicServer2">
                      <Form.Label>Сервер</Form.Label>
                      <Form.Control as="select">
                        <option value="BattleCraft PVP">BattleCraft PVP</option>
                        <option value="BattleCraft RPG">BattleCraft RPG</option>
                      </Form.Control>
                    </Form.Group>
                    <button>Получить бонусы</button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Tab>
          <Tab title="Управление" eventKey="settings">
            <Row>
              <Col md="6">
                <div className="block">
                  <div className="title">Изменить email</div>
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Старый email</Form.Label>
                      <Form.Control type="email" placeholder="Введите старый email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicNewEmail">
                      <Form.Label>Новый email</Form.Label>
                      <Form.Control type="email" placeholder="Введите новый email" />
                    </Form.Group>
                    <button>Изменить email</button>
                  </Form>
                </div>
              </Col>
              <Col md="6">
                <div className="block">
                  <div className="title">Изменить пароль</div>
                  <Form onSubmit={changePassword}>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Старый пароль</Form.Label>
                      <Form.Control type="password" placeholder="Введите старый пароль" name="password"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicNewPassword">
                      <Form.Label>Новый пароль</Form.Label>
                      <Form.Control type="password" placeholder="Введите новый пароль" name="new_password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicNewPasswordConfirm">
                      <Form.Label>Подтвердите новый пароль</Form.Label>
                      <Form.Control type="password" placeholder="Подтвердите новый пароль" name="new_password_accept" />
                      {passwordError && (
                        <div className="error-message">
                          {passwordError}
                        </div>
                      )}
                    </Form.Group>
                    <button>Изменить пароль</button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Lk;
