import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import './header.sass';

const Header = (props) => {
  const { authed = false } = props;

  return (
    <div>
    <header>
      <Container>
        <Row>
          <Col md={2} className="logo">
            <Link to="/"><img src="/images/full.png" /></Link>
          </Col>
          <Col md={7} xl={8} className="menu">
            <div className="nav_menu">
              <Link to="/play">Начать играть</Link>
              <Link to="#">Форум</Link>
              <Dropdown>
                <Dropdown.Toggle className="menu_link" variant="secondary" id="dropdown-basic">
                  Сервера
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">Сервер 1</Dropdown.Item>
                  <Dropdown.Item href="#">Сервер 2</Dropdown.Item>
                  <Dropdown.Item href="#">Сервер 3</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Link to="/shop">Донат</Link>
              <Link to="/in-dev">В разработке</Link>
            </div>
          </Col>
          <Col md={3} xl={2} className="user_block">
            {authed && (
              <Link to="/lk" className="btn_login">Личный кабинет</Link>
            )}
            {!authed && (
              <Link to="/lk" className="btn_login">Войти</Link>
            )}
          </Col>
          <Col className="mobile_logo">
            <Link to="/"><img src="/images/full.png" alt="" /></Link>
          </Col>
          <div className="col btn_aside">
            <Button variant="link">
              <svg
                width="3em"
                height="3em"
                viewBox="0 0 16 16"
                fill="var(--yellow)"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </Button>
          </div>
        </Row>
      </Container>
    </header>
    <div className="sidebar">
      <ul>
        <li><Link to="/play">Начать играть</Link></li>
        <li><Link to="#">Форум</Link></li>
        <li><Link to="/shop">Магазин</Link></li>
        <li>Сервера
          <div id="servers">
            <ul class="pl-2">
              <li><Link to="/server/1">Сервер 1</Link></li>
              <li><Link to="/server/1">Сервер 2</Link></li>
              <li><Link to="/server/1">Сервер 3</Link></li>
            </ul>
          </div>
        </li>
        <li><Link to="/in-dev">В разработке</Link></li>
        <li><Link to="/lk">Личный кабинет</Link></li>
      </ul>
    </div>
  </div>
  );
};

export default Header;
