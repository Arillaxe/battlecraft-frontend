import { useEffect, useState, useRef, useDebugValue } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
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
  const theme = useSelector(({ app }) => app.theme);
  const [refs, setRefs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [current2fa, setCurrent2fa] = useState(user.tfaType);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [qrImage, setQrImage] = useState('');

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

      const fetchRefs = async () => {
        const refs = await API.getRefs(user.token);

        setRefs(refs);
      };

      fetchRefs();
    }

    setCurrent2fa(user.tfaType);
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

    const formData = new FormData();
    formData.append('skin', file);
    try {
      const { skin } = await API.uploadSkin(user.token, formData);

      dispatch(userSlice.actions.setData({ skin }));
      NotificationManager.success('Скин успешно изменен!');
    } catch (e) {
      console.log(e);
      NotificationManager.error(e.response.data.message);
    }

    setLoading(false);
  };

  const change2fa = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const {
        qrcode,
        token,
        user: rUser,
      } = await API.change2fa(user.token, current2fa);

      if (qrcode) {
        setQrImage(qrcode);
        setShowGoogleModal(true);
      } else if (token) {
        NotificationManager.success('2-х факторная аутентификации успешно отключена!');
        dispatch(userSlice.actions.setData({ ...rUser, token }));
      }

      setPasswordError('');
    } catch (e) {
      console.log(e);
      setPasswordError(e.response.data.message);
    }

    setLoading(false);
  };

  const confirm2fa = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.target);
    try {
      const { token, user: rUser } = await API.confirm2fa(user.token, Array.from(formData.keys()).reduce((acc, key) => ({ ...acc, [key]: formData.get(key) }), {}));

      dispatch(userSlice.actions.setData({ ...rUser, token }));

      setPasswordError('');
      setShowGoogleModal(false);
      NotificationManager.success('Способ 2-х факторной аутентификации успешно изменен!');
    } catch (e) {
      setPasswordError(e.response.data.message);
    }

    setLoading(false);
  }

  const copyRefCode = async () => {
    try {
      navigator.clipboard.writeText(`http://localhost:3000/register?ref=${user.ref_code}`);

      NotificationManager.success('Ссылка скопированна!');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="content-lk">
      <Modal show={showGoogleModal} onHide={() => setShowGoogleModal(false)} className={`login_modal${theme === 'dark' ? ' dark' : ''}`}>
      <Modal.Header closeButton>
        <Modal.Title>QR код для Google Authenticator</Modal.Title>
      </Modal.Header>
      <Modal.Body className="lk-qr-image">
        <img src={qrImage} />
        <Form onSubmit={confirm2fa}>
          <Form.Group controlId="formBasic2faConfirm">
            <Form.Label>Активация двухфакторной аунтентификации</Form.Label>
            <Form.Control placeholder="Введите код 2-х факторной аутентификации" type="password" name="code" />
            {passwordError && (
              <div className="error-message">
                {passwordError}
              </div>
            )}
          </Form.Group>
          <button>Подтвердить 2-х факторную аутентификацию</button>
        </Form>
      </Modal.Body>
    </Modal>
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
                  {refs.length ? refs.map((ref, idx) => (
                    <div key={`lk-ref-${idx}`} className="lk-ref-row">
                      <div className="lk-ref-login">{ref.login}</div>
                      <div className="lk-ref-earned">{ref.earned}</div>
                    </div>
                  )) : (
                    <div className="text-danger">Вы еще не привели друга</div>
                  )}
                </div>
                <div className="block">
                  <div className="title">Ваша реферальная ссылка</div>
                  <div className="text-info">https://batlecraft.top/register?ref={user.ref_code}</div>
                  <button className="btn_skin btn_ref" onClick={copyRefCode}>Скопировать</button>
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
                    <div className="subBlock1">
                      <button>Проголосовать</button>
                    </div>
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
              <Col md="12">
                <div className="block">
                  <div className="title">Двухфакторная аунтентификация</div>
                  <Form onSubmit={change2fa}>
                    <Form.Group controlId="formBasic2fa">
                      <Form.Label>Выберите способ двухфакторной аунтентификации</Form.Label>
                      <Form.Control as="select" value={current2fa} name="2fa" onChange={(e) => setCurrent2fa(e.target.value)}>
                        <option value="none">Отключена</option>
                        <option value="google">Google Authenticator</option>
                        <option value="email">Почта</option>
                      </Form.Control>
                      {passwordError && (
                        <div className="error-message">
                          {passwordError}
                        </div>
                      )}
                    </Form.Group>
                    <button>Изменить способ</button>
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
