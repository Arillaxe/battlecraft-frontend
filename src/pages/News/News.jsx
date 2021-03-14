import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
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
      <img src={`https://api-battlecraft.loca.lt/images/${news.img_url || 'news_no_image.png'}`} alt="" />
      <div className="news-head">
        <div className="news-title">{news.title}</div>
        <div className="news-date">{moment(news.createdAt).format('LL')}</div>
      </div>
      <div className="news-text">{news.text}</div>
    </div>
  );
};

export default News;
