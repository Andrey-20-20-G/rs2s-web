// testimonial data
const testimonialData = [
  {
    image: '/t-avt-1.png',
    name: 'Anne Smith',
    position: 'Customer',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum expedita odit beatae, cupiditate saepe quam officia aut placeat quas neque!',
  },
  {
    image: '/t-avt-2.png',
    name: 'Jane Doe',
    position: 'Customer',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum expedita odit beatae, cupiditate saepe quam officia aut placeat quas neque!',
  },
  {
    image: '/t-avt-3.png',
    name: 'Jhon Doe',
    position: 'Customer',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum expedita odit beatae, cupiditate saepe quam officia aut placeat quas neque!',
  },
];

import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import {Pagination} from 'swiper';

import {BsArrowRight} from 'react-icons/bs';
import Image from "next/image";

const TestimonialSlider = () => {
  return (
    <Swiper
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      modules={{
        Pagination
      }}
      className="h-[280px] sm:h-[480px]">
      {testimonialSlides.slides.map((person, index) => {
        return (
          <SwiperSlide key={index}>
            <div>
              <div>
                <div>
                  <div>Avatar Image</div>
                  <div>name</div>
                  <div>position</div>
                </div>

              </div>
              <div>quote&message</div>
            </div>            
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default TestimonialSlider;

