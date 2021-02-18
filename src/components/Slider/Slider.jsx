import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import './slider.sass';

const Slider = () => (
  <Container>
    <Carousel>
      <Carousel.Item>
        <img src="/images/slider.png" alt="First slide" className="d-block w-100" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img src="/images/slider_2.jpg" alt="Second slide" className="d-block w-100" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img src="/images/slider_3.jpg" alt="Second slide" className="d-block w-100" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </Container>
);

export default Slider;
