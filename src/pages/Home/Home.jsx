import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import './home.sass';

const Home = (props) => {
  const { news = [] } = props;

  return (
    <div>
      {news.map((newsItem) => {
        const {
          id,
          url,
          image = '/images/news_no_image.png',
          title,
          shortText,
          createdAt,
        } = newsItem;

        return (
          <div key={id} className="news_block aos-init aos-animate">
            <div className="content_news">
              <div className="row">
                <Col xl={4} className="picture_block">
                  <img src={image} alt="" />
                </Col>
                <Col xl={8} className="info_news">
                  <div>
                    <div className="title_news">{title}</div>
                    <div className="desc_news">{shortText}</div>
                  </div>
                  <div className="news_footer">
                    <Link className="btn_link" to={`/news/${url}`}>
                      Читать <img src="/images/more.png" alt=""/>
                    </Link>
                    <div className="data">{moment(createdAt).format('LL')}</div>
                  </div>
                </Col>
              </div>
            </div>
            <div className="layer_1"></div>
            <div className="layer_2"></div>
          </div>
        );
      })}
      {news.length === 0 && (
        <div className="news_block aos-init aos-animate">
          <div className="content_news">
            <div className="info_news">
              <div className="title_news">Новостей нет</div>
              <div className="desc_news">
                Попробуйте зайти попозже, у нас обязательно будет что рассказать Вам
              </div>
            </div>
          </div>
          <div className="layer_1"></div>
          <div className="layer_2"></div>
        </div>
      )}
    </div>
  );
};

export default Home;
