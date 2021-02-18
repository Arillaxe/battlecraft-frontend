import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './footer.sass';

const Footer = () => (
  <footer>
    <Container>
      <Row>
        <Col sm={2} className="logo">
          <Link to="/">
            <img src="/images/ico.png" alt="" />
          </Link>
        </Col>
        <Col lg={5}>
          <Row className="links">
            <Col md={6} className="projects">
              <div className="title">Стоит играть</div>
              <ul>
                <li>
                  <a target="_blank" href="https://kodji.ru/start.html"
                    >Shambala Minecraft</a
                  >
                </li>
                <li>
                  <a target="_blank" href="https://www.wynncraft.com/"
                    >Wynncraft</a
                  >
                </li>
                <li>
                  <a target="_blank" href="http://minecraft.rekryt.ru/"
                    >Rekryt Project</a
                  >
                </li>
              </ul>
            </Col>
            <Col md={6} className="projects">
              <div className="title">Соц. сети</div>
              <ul>
                <li>
                  <a href="#">ВКонтакте</a>
                </li>
                <li>
                  <a href="#">YouTube</a>
                </li>
                <li>
                  <a href="#">Twitch</a>
                </li>
              </ul>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
