import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function LearnCarousel( {orgData} ) {
  return (
    <div className="p-5">
      <Carousel
        showThumbs={false}
        showStatus={true}
        showIndicators={false}
        showArrows={true}
      >

        {orgData.slides.map((slide, index) => {
          return (
            <div key={index}> 
              <img src={slide.image} />
              <p className="font-bold mt-5">{slide.title}</p>
              <p>{slide.subtitle}</p>
            </div>
          );
        })}
      </Carousel>
    </div>
  )
}
