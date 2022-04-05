import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


import Image from 'next/image'


export default function TourCarousel() {
  return (
    <div className="p-5">
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        showArrows={false}
        interval={3000}
        autoPlay={true}
        swipeable={true}  
        
      >
        <div>
          <Image src="/images/purple/undraw_air_support.svg" alt="DAO Drops" height={250} width={200}/>
          <div className="mt-1">
            <p className="font-bold mt-5">Build a quality community</p>
            <p>Targeted airdrops &amp; campaigns</p>
          </div>
        </div>
        <div>
          <Image src="/images/purple/undraw_developer_activity.svg" alt="DAO Drops" height={250} width={200}/>
          <p className="font-bold mt-5">Grow your web3 CV </p>
          <p>We enrich your CV with on &amp; offchain data</p>     
        </div>
        <div>
          <Image src="/images/purple/undraw_my_notifications.svg" alt="DAO Drops" height={250} width={200}/>
          <p className="font-bold mt-5">Start working at a DAO</p>
          <p>Get daily offers for Web3 jobs &amp; gigs </p>     
        </div>
      </Carousel>
    </div>
  )
}
