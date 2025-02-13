import Carousel from "react-bootstrap/Carousel";
//import Footer from './Footer';
import frontposter from "../images/frontposter.jpg";
import img2 from "../images/img2.png";
import img3 from "../images/img3.jpg";
import img4 from "../images/img4.png";
function TopSlider() {
  return (
    <div>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100 h-30"
            src={frontposter}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100 h-30" src={img2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item interval={2500}>
          <img className="d-block w-100 h-30" src={img3} alt="third slide" />
        </Carousel.Item>
        <Carousel.Item interval={3500}>
          <img className="d-block w-100 h-30" src={img4} alt="fourth slide" />
        </Carousel.Item>
      </Carousel>
      {/* <Footer /> */}
    </div>
  );
}

export default TopSlider;
