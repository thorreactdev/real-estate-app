import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import home1 from "../assets/home1.jpg";
import home2 from "../assets/home2.jpg";
import home5 from "../assets/home5.jpg";

export default function Slider() {
  SwiperCore.use([Navigation]);
  
   const imageArray = [
    {
        image : home1,
        id : 1
    },{
        image : home2,
        id : 2
    },{
        image : home5,
        id : 3
    }
   ]
 

  return (
    <Swiper navigation className="mb-3 mt-3">
      {imageArray?.map((item) => (
        <SwiperSlide key={item.id}>
          <div
            className="h-[500px] border-none outline-none"
            style={{
              background: `url(${item?.image}) center no-repeat`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
