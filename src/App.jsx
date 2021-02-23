import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {
  Aside,
  Footer,
  Header,
  Slider,
} from './components';
import {
  Home,
  Play,
} from './pages';
import store from './lib/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.sass';

const App = () => {
  const news = [
    {
      id: '1',
      title: 'Test news title 1312',
      shortText: '      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla doloribus repellendus quae amet voluptate, laudantium ipsam fugiat ullam voluptatibus autem officia repellat consequatur ducimus tenetur nobis in, accusamus hic delectus.',
      url: 'news/1',
      image: 'https://sun9-75.userapi.com/impg/iOg_WA-s_L22Xke0zPJuDb4jkX7JhhKPWGQpTQ/Zddb-qSqRcc.jpg?size=1280x799&quality=96&sign=3405542bae9addc2248c29c3be479efd&type=album',
      createdAt: Date.now(),
    },
    {
      id: '2',
      title: 'Test news title 1312',
      shortText: '      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla doloribus repellendus quae amet voluptate, laudantium ipsam fugiat ullam voluptatibus autem officia repellat consequatur ducimus tenetur nobis in, accusamus hic delectus.',
      url: 'news/1',
      image: 'https://sun9-75.userapi.com/impg/iOg_WA-s_L22Xke0zPJuDb4jkX7JhhKPWGQpTQ/Zddb-qSqRcc.jpg?size=1280x799&quality=96&sign=3405542bae9addc2248c29c3be479efd&type=album',
      createdAt: Date.now(),
    },
    {
      id: '3',
      title: 'Test news title 1312',
      shortText: '      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla doloribus repellendus quae amet voluptate, laudantium ipsam fugiat ullam voluptatibus autem officia repellat consequatur ducimus tenetur nobis in, accusamus hic delectus.',
      url: 'news/1',
      image: 'https://sun9-75.userapi.com/impg/iOg_WA-s_L22Xke0zPJuDb4jkX7JhhKPWGQpTQ/Zddb-qSqRcc.jpg?size=1280x799&quality=96&sign=3405542bae9addc2248c29c3be479efd&type=album',
      createdAt: Date.now(),
    },
    {
      id: '4',
      title: 'Test news title 1312',
      shortText: '      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla doloribus repellendus quae amet voluptate, laudantium ipsam fugiat ullam voluptatibus autem officia repellat consequatur ducimus tenetur nobis in, accusamus hic delectus.',
      url: 'news/1',
      image: 'https://sun9-75.userapi.com/impg/iOg_WA-s_L22Xke0zPJuDb4jkX7JhhKPWGQpTQ/Zddb-qSqRcc.jpg?size=1280x799&quality=96&sign=3405542bae9addc2248c29c3be479efd&type=album',
      createdAt: Date.now(),
    },
  ];

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Slider />
          <Container>
            <Row>
              <Col lg={8} className="content">
                <Switch>
                  <Route path="/" exact>
                    <Home news={news} />
                  </Route>
                  <Route path="/play" component={Play} />
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
                      <a className="btn_link" href=""
                        >Подписаться <img src="/images/more.png" alt=""
                      /></a>
                    </div>
                  </Col>
                  <Col md={6} xl={3}>
                    <div className="socialBlock youtube">
                      <img src="/images/youtube.png" alt="" className="logo_social" />
                      <a className="btn_link" href=""
                        >Подписаться <img src="/images/more.png" alt=""
                      /></a>
                    </div>
                  </Col>
                  <Col md={6} xl={3}>
                    <div className="socialBlock vk">
                      <img src="/images/vk.png" alt="" className="logo_social" />
                      <a className="btn_link" href=""
                        >Подписаться <img src="/images/more.png" alt=""
                      /></a>
                    </div>
                  </Col>
                  <Col md={6} xl={3}>
                    <div className="socialBlock instagram">
                      <img src="/images/instagram.png" alt="" className="logo_social" />
                      <a className="btn_link" href=""
                        >Подписаться <img src="/images/more.png" alt=""
                      /></a>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
