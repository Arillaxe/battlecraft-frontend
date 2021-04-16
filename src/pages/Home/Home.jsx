import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import API from '../../lib/api.js';
import { appSlice } from '../../slices';
import news_no_image from './news_no_image.png';
import './home.sass';

const Home = () => {
  const dispatch = useDispatch();

  const news = useSelector(({ app }) => app.news);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      const news = await API.getNews(currentPage);

      dispatch(appSlice.actions.setNews(news.data));

      setMaxPages(news.page_count);
    };

    fetchNews();
  }, [currentPage]);

  return (
    <div>
      {news.map((newsItem) => {
        const {
          id,
          img_url,
          title,
          preview,
          createdAt,
        } = newsItem;

        return (
          <div key={id} className="news_block aos-init aos-animate">
            <div className="content_news">
              <div className="row">
                <Col xl={4} className="picture_block">
                  <img src={img_url ? `${process.env.REACT_APP_SERVER_HOST}/images/${img_url}` : news_no_image} alt="" />
                </Col>
                <Col xl={8} className="info_news">
                  <div>
                    <div className="title_news">{title}</div>
                    <div className="desc_news">
                      <ReactMarkdown allowedTypes={['root', 'text', 'paragraph', 'strong', 'image']}>{preview}</ReactMarkdown>
                    </div>
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
      {maxPages > 1 && (
        <div className="news-pagination">
          <Pagination size="lg">
          {Array(maxPages).fill(0).map((_, idx) => (
            <Pagination.Item onClick={() => setCurrentPage(idx + 1)} key={`home-pagination-${idx}`} active={idx + 1 === currentPage}>{idx + 1}</Pagination.Item>
          ))}
          </Pagination>
        </div>
      )}
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
