import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Switch from 'react-switch';
import { SkinViewer } from 'skinview3d';
import {
  LoginModal,
  RegisterModal,
} from './components';
import { userSlice } from '../../slices';
import API from '../../lib/api.js';
import './header.sass';

const Header = (props) => {
  const { theme, setTheme } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const user = useSelector(({ user }) => user);

  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [servers, setServers] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState('');

  const handleLoginClose = () => { 
    setLoginModalVisible(false);
    setModalError('');
  };
  const handleLoginShow = () => setLoginModalVisible(true);

  const handleRegisterClose = () => {
    setRegisterModalVisible(false);
    setModalError('');
  };
  const handleRegisterShow = () => setRegisterModalVisible(true);

  useEffect(() => {
    const fetchServers = async () => {
      const servers = await API.getServers();

      setServers(servers);
    };

    fetchServers();
  }, []);

  useEffect(() => {
    setRegisterModalVisible(location.pathname === '/register' || registerModalVisible);
  }, [location]);

  useEffect(async () => {
    if (user.token) {
      const userData = await API.getUser(user.token);

      dispatch(userSlice.actions.setData({ ...userData }));
    }

    if (user.token) {
      new SkinViewer({
        canvas: document.getElementById('skin_container1'),
        width: 100,
        height: 150,
        skin: `/images/steve.png`,
      });
    }
  }, [user.token]);

  const logout = () => {
    dispatch(userSlice.actions.clearData());
    localStorage.clear();
    history.push('/');
  }

  const onRegisterSubmit = async (e, captchaToken) => {
    e.preventDefault();

    setModalLoading(true);

    const formData = new FormData(e.target);
    try {
      const { token } = await API.register(
        Array.from(formData.keys()).reduce((acc, key) => ({ ...acc, [key]: formData.get(key) }), { captchaToken })
      );

      dispatch(userSlice.actions.setData({ token }));
      setModalError('');
      setRegisterModalVisible(false);
    } catch (e) {
      setModalError(e.response.data.message);
    }

    setModalLoading(false);
  }

  const onLoginSubmit = async (e, rememberMe) => {
    e.preventDefault();

    setModalLoading(true);

    const formData = new FormData(e.target);
    try {
      const { token } = await API.login(
        Array.from(formData.keys()).reduce((acc, key) => ({ ...acc, [key]: formData.get(key) }), {})
      );

      if (rememberMe) {
        localStorage.setItem('token', token);
      }

      dispatch(userSlice.actions.setData({ token }));
      setModalError('');
      setLoginModalVisible(false);
      history.push('/lk');
    } catch (e) {
      setModalError(e.response.data.message);
    }

    setModalLoading(false);
  }

  return (
    <div>
    <header>
      <Container>
        <Navbar collapseOnSelect expand="lg">
          <Navbar.Brand >
           <Link to="/"><img src="/images/full.png" className="logo" /></Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav">
            <svg
              height="2em"
              viewBox="0 0 16 16"
              fill="var(--yellow)"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Item>
                <Link to="/play" className="nav_link">Начать играть</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/forum" className="nav_link">Форум</Link>
              </Nav.Item>
              <NavDropdown title="Сервера" id="collasible-nav-dropdown" className="nav_dropdown">
                {servers.map((server) => (
                  <NavDropdown.ItemText key={`server-${server.id}`}>
                    <Link to={`/server/${server.id}`}>{server.name}</Link>
                  </NavDropdown.ItemText>
                ))}
              </NavDropdown>
              <Nav.Item>
                <Link to="/shop" className="nav_link">Донат</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/rules" className="nav_link">Правила</Link>
              </Nav.Item>
            </Nav>
            <Switch
              onColor="#0d1117"
              offColor="#c2c4c7"
              onHandleColor="#ff9b00"
              offHandleColor="#ff9b00"
              uncheckedIcon={<span className="material-icons switch-icon dark-icon">dark_mode</span>}
              checkedIcon={<span className="material-icons switch-icon light-icon">light_mode</span>}
              className="dark-theme-switcher"
              checked={theme === 'dark'}
              onChange={() => setTheme(theme === 'light' ? 'dark' : 'light' )}
            />
            <Nav>
              <Nav.Item>
                {user.login && (
                  <div className="profile-dropdown-wrapper">
                    <div className="btn_login">Профиль</div>
                    <div className="profile-dropdown">
                      <div className="profile-skin">
                        <canvas id="skin_container1"></canvas>
                      </div>
                      <div className="profile-info">
                        <div className="profile-info-left">
                          <div className="profile-info-login">{user.login}</div>
                          <div className="profile-info-balanceTitle">Баланс:</div>
                          <div className="profile-info-balance">
                            <span className="material-icons">paid</span>
                            {user.crystals} монет
                          </div>
                        </div>
                        <div className="profile-info-right">
                          <Link to="/lk" className="profile-info-link">
                            <span className="material-icons">account_circle</span>
                            <div>Личный кабинет</div>
                          </Link>
                          {user.role === 'admin' && (
                            <a href={`${process.env.REACT_APP_ADMIN_HOST}/auth?token=${localStorage.getItem('token')}`} className="profile-info-link" target="_blank">
                              <span className="material-icons">admin_panel_settings</span>
                              <div>Панель управления</div>
                            </a>
                          )}
                          <button className="btn-logout" onClick={logout}>
                            <span className="material-icons">logout</span>
                            <div>Выйти</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {!user.login && (
                  <div className="btn_login" onClick={handleLoginShow}>Войти</div>
                )}
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
      <LoginModal
        visible={loginModalVisible}
        onClose={handleLoginClose}
        onClickRegister={handleRegisterShow}
        onSubmit={onLoginSubmit}
        loading={modalLoading}
        errorMessage={modalError}
      />
      <RegisterModal
        visible={registerModalVisible}
        onClose={handleRegisterClose}
        onSubmit={onRegisterSubmit}
        loading={modalLoading}
        errorMessage={modalError}
      />
    </header>
  </div>
  );
};

export default Header;
