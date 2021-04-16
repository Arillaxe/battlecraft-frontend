import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import API from '../../lib/api.js';
import './slider.sass';

const Slider = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchSliderNews = async () => {
      const news = await API.getNewsSlider();

      setNews(news);
    }

    fetchSliderNews();
  }, []);

  return (
    <Container>
      <Carousel>
        {news.map(({ id, title, preview, img_url }) => (
          <Carousel.Item key={`jumbotron-news-${id}`}>
            <Link to={`/news/${id}`}>
              <img src={`${process.env.REACT_APP_SERVER_HOST}/images/${img_url}`} alt={preview} className="d-block w-100" />
              <Carousel.Caption>
                <h3>{title}</h3>
                <p>{preview}</p>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default Slider;
