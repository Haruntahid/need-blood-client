import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

function Banner() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-5 lg:gap-10 justify-between mt-10 px-3">
      <div className="w-full lg:w-1/2">
        <p className="text-5xl lg:text-7xl text-red-500 font-bold">
          Save Lives, Donate Blood
        </p>
        <p className="text-gray-600 mt-5 lg:mt-10 lg:text-xl">
          Donating blood is a simple, yet incredibly impactful way to contribute
          to the health and well-being of others. Every donation can help save
          up to three lives, providing essential support for patients undergoing
          surgery, cancer treatment, chronic illnesses, and traumatic injuries.
          Blood donations are always in high demand, and your contribution can
          make a significant difference in your community.
        </p>
        <div className="mt-10 flex gap-6">
          <Link to={"/register"} className="btn bg-red-500 text-white">
            Join as a donor
          </Link>
          <Link
            to={"/search"}
            className="border-red-500 btn bg-transparent border text-red-500"
          >
            Search Donors
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex justify-end lg:max-w-[500px]">
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
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              className="w-full object-cover h-full"
              src="https://i.ibb.co/h9VwvPJ/xco2-8jtl-220606.jpg"
              alt="Slide 1"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-full object-cover h-full"
              src="https://i.ibb.co/Hdb5P5G/depositphotos-8140291-stock-photo-blood-is-taken.webp"
              alt="Slide 2"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-full object-cover h-full"
              src="https://swiperjs.com/demos/images/nature-3.jpg"
              alt="Slide 3"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-full object-cover h-full"
              src="https://swiperjs.com/demos/images/nature-4.jpg"
              alt="Slide 4"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Banner;
