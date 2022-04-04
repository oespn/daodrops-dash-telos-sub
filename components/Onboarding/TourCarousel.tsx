import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function TourCarousel() {
  return (
    <div className="p-5">
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        showArrows={false}
      >
        <div>
          <img src="/images/purple/undraw_my_notifications.svg" />
          <p className="font-bold mt-5">Telos is carbon neutral</p>
          <p>This means each time you transact you are helping the environment not causing more harm.</p>
        </div>
        <div>
          <img src="/images/purple/undraw_my_notifications.svg" />
          <p className="font-bold mt-5">Telos is carbon neutral</p>
          <p>This means each time you transact you are helping the environment not causing more harm.</p>     
        </div>
      </Carousel>
    </div>
  )
}
