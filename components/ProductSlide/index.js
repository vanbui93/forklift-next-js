import React, { useState } from 'react'
import { FreeMode, Navigation, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'

export default function ProductSlide(props) {
  const { productImages } = props
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  return (
    <div className='product-slide'>
      <Swiper
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='productSwiper2'
      >
        {productImages?.map((img, idx) => {
          return (
            <SwiperSlide key={idx}>
              <img src={img} alt='' />
            </SwiperSlide>
          )
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        slidesPerView={5}
        spaceBetween={10}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='productSwiper'
      >
        {productImages?.map((img, idx) => {
          return (
            <SwiperSlide key={idx}>
              <img src={img} alt='' />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
