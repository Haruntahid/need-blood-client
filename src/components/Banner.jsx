import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";

function Banner() {
  return (
    <>
      <div className="flex items-center gap-10 justify-between mt-10">
        <div className="w-1/2">
          <p className="text-7xl text-red-500 font-bold">
            Save Lives,Donate Blood
          </p>
          <p className="text-gray-600 mt-10 text-xl">
            Donating blood is a simple, yet incredibly impactful way to
            contribute to the health and well-being of others. Every donation
            can help save up to three lives, providing essential support for
            patients undergoing surgery, cancer treatment, chronic illnesses,
            and traumatic injuries. Blood donations are always in high demand,
            and your contribution can make a significant difference in your
            community.
          </p>
          <div className="mt-10 flex gap-6">
            <Link to={"/register"} className="btn bg-red-500 text-white">
              Join as a donor
            </Link>
            <Link
              to={""}
              className="border-red-500 btn bg-transparent border text-red-500"
            >
              Search Donors
            </Link>
          </div>
        </div>
        <div className="w-1/2 flex justify-end max-w-[500px]">
          {/* <img
            className="w-full"
            src="https://i.ibb.co/h9VwvPJ/xco2-8jtl-220606.jpg"
            alt=""
          /> */}
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src="https://i.ibb.co/h9VwvPJ/xco2-8jtl-220606.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default Banner;
