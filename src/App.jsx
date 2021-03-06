import { useState, useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import 'moment/locale/ru';
import moment from 'moment';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {
  Aside,
  Footer,
  Header,
  ScrollToTop,
  Slider,
} from './components';
import {
  Home,
  Lk,
  News,
  Play,
  Servers,
  Shop,
  Rules,
} from './pages';
import store from './lib/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import './App.sass';
import './dark.sass';

moment.locale('ru');

const App = () => {
  const theme = useSelector(({ app }) => app.theme);

  return (
    <Router>
      <div className={`App${theme === 'dark' ? ' dark' : ''}`}>
        <ScrollToTop />
        <Header theme={theme} />
        <Switch>
          <Route path="/" exact component={Slider} />
          <Route path="/register" exact component={Slider} />
          <Route path="/login" exact component={Slider} />
        </Switch>
        <Container>
          <Row>
            <Col lg={8} className="content">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/register" exact component={Home} />
                <Route path="/login" exact component={Home} />
                <Route path="/lk" component={Lk} />
                <Route path="/news/:id" component={News} />
                <Route path="/play" component={Play} />
                <Route path="/shop" component={Shop} />
                <Route path="/rules" component={Rules} />
                <Route path="/server/:id" component={Servers} />
              </Switch>
            </Col>
            <Col lg={4}>
              <Aside/>
            </Col>
            <Col md={12} className="social_list">
              <Row>
                <Col md={6} xl={3}>
                  <div className="socialBlock twitch">
                    <img src="/images/twitch.png" alt="" className="logo_social" />
                    <a className="btn_link" href="https://www.twitch.tv/battlecrafttop" target="_blank"
                      >Подписаться <img src="/images/more.png" alt=""
                    /></a>
                  </div>
                </Col>
                <Col md={6} xl={3}>
                  <div className="socialBlock youtube">
                    <img src={`/images/youtube${theme === 'dark' ? '_dark' : ''}.png`} alt="" className="logo_social" />
                    <a className="btn_link" href="https://www.youtube.com/channel/UCaIGh_a4LoEHXv5YujlZsiw" target="_blank"
                      >Подписаться <img src="/images/more.png" alt=""
                    /></a>
                  </div>
                </Col>
                <Col md={6} xl={3}>
                  <div className="socialBlock vk">
                    <img src="/images/vk.png" alt="" className="logo_social" />
                    <a className="btn_link" href="https://vk.com/battlecraft" target="_blank"
                      >Подписаться <img src="/images/more.png" alt=""
                    /></a>
                  </div>
                </Col>
                <Col md={6} xl={3}>
                  <div className="socialBlock instagram">
                    <img src="/images/instagram.png" alt="" className="logo_social" />
                    <a className="btn_link" href="https://www.instagram.com/battlecrafttop/" target="_blank"
                      >Подписаться <img src="/images/more.png" alt=""
                    /></a>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Footer />
        
        <NotificationContainer />
      </div>
    </Router>
  );
};

const AppRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppRedux;
