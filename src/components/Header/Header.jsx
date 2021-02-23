import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
  LoginModal,
  RegisterModal,
} from './components';
import API from '../../lib/api.js';
import './header.sass';

const Header = () => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);

  const handleLoginClose = () => setLoginModalVisible(false);
  const handleLoginShow = () => setLoginModalVisible(true);

  const handleRegisterClose = () => setRegisterModalVisible(false);
  const handleRegisterShow = () => setRegisterModalVisible(true);

  const onRegisterSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    try {
      const response = await API.register(Array.from(formData.keys()).reduce((acc, key) => ({ ...acc, [key]: formData.get(key) }), {}));

      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  const onLoginSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    try {
      const response = await API.login(Array.from(formData.keys()).reduce((acc, key) => ({ ...acc, [key]: formData.get(key) }), {}));

      console.log(response);
    } catch (e) {
      console.log(e);
    }
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
                <NavDropdown.ItemText>
                  <Link to="/server/1">Сервер 1</Link>
                </NavDropdown.ItemText>
                <NavDropdown.ItemText>
                  <Link to="/server/2">Сервер 2</Link>
                </NavDropdown.ItemText>
                <NavDropdown.ItemText>
                  <Link to="/server/3">Сервер 3</Link>
                </NavDropdown.ItemText>
              </NavDropdown>
              <Nav.Item>
                <Link to="/play" className="nav_link">Донат</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/play" className="nav_link">В разработке</Link>
              </Nav.Item>
            </Nav>
            <Nav>
              <Nav.Item>
                <div className="btn_login" onClick={handleLoginShow}>Войти</div>
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
      />
      <RegisterModal
        visible={registerModalVisible}
        onClose={handleRegisterClose}
        onSubmit={onRegisterSubmit}
      />
    </header>
  </div>
  );
};

export default Header;
