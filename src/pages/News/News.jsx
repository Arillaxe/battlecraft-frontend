import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import API from '../../lib/api.js';
import './news.sass';

const News = () => {
  const { id } = useParams();

  const [news, setNews] = useState({});

  useEffect(() => {
    const fetchNews = async () => {
      const news = await API.getNewsById(id);

      setNews(news);
    };

    fetchNews();
  }, []);

  return (
    <div className="news">
      <img classnName="news-image" src={`${process.env.REACT_APP_SERVER_HOST}/images/${news.img_url || 'news_no_image.png'}`} alt="" />
      <div className="news-head">
        <div className="news-title">{news.title}</div>
        <Link to="/">
          <div className="news-back">
            <span className="material-icons">keyboard_backspace</span>
            <div>Назад</div>
          </div>
        </Link>
        <div className="news-date">{moment(news.createdAt).format('LL')}</div>
      </div>
      <div className="news-text">
        <ReactMarkdown>{news.text}</ReactMarkdown>
      </div>
    </div>
  );
};

export default News;
