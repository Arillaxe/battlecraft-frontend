import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import API from '../../lib/api.js';
import './home.sass';

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const news = await API.getNews(1);

      setNews(news.data);
    };

    fetchNews();
  }, []);

  return (
    <div>
      {news.map((newsItem) => {
        const {
          id,
          img_url,
          title,
          text,
          createdAt,
        } = newsItem;

        return (
          <div key={id} className="news_block aos-init aos-animate">
            <div className="content_news">
              <div className="row">
                <Col xl={4} className="picture_block">
                  <img src={`https://api-battlecraft.loca.lt/images/${img_url || 'news_no_image.png'}`} alt="" />
                </Col>
                <Col xl={8} className="info_news">
                  <div>
                    <div className="title_news">{title}</div>
                    <div className="desc_news">{text}</div>
                  </div>
                  <div className="news_footer">
                    <Link className="btn_link" to={`/news/${id}`}>
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
