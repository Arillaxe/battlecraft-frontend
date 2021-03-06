import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import './footer.sass';

const Footer = () => (
  <footer>
    <Container>
      <Link to="/" className="logo">
        <img src="/images/ico.png" alt="" />
      </Link>
      <div className="footer-categories">
        <div className="footer-category">
          <div className="footer-title">Стоит ознокомиться</div>
            <ul>
              <li>
                <a target="_blank" href="https://kodji.ru/start.html">Shambala Minecraft</a>
              </li>
              <li>
                <a target="_blank" href="https://www.wynncraft.com/">Wynncraft</a>
              </li>
              <li>
                <a target="_blank" href="http://minecraft.rekryt.ru/">Rekryt Project</a>
              </li>
            </ul>
        </div>
      </div>
    </Container>
  </footer>
);

export default Footer;
