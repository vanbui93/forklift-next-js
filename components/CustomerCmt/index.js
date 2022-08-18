import React, { useEffect, useState } from 'react'
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'swiper/css'

export default function CustomerCmt(props) {
    const { comments } = props

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (comments && Object.keys(comments)?.length > 0) {
            setLoading(false)
        }
    }, [comments])

    const params = {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 40,
        pagination: {
            clickable: true,
        },
        allowTouchMove: true,
        modules: [FreeMode, Pagination, Navigation, Thumbs],
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            1024: {
                slidesPerView: 2,
            },
        },
    }

    return (
        <div className='container'>
            <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                {loading && <Skeleton containerClassName='avatar-skeleton' className='page-title--seleketon' />}
            </SkeletonTheme>
            <div className='page-title' style={{ display: loading ? 'none' : undefined }}>
                <h3>Nhận xét của khách hàng</h3>
            </div>
            <div className='customerCmtWrap--seleketon'>
                <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                    {loading && <Skeleton containerClassName='avatar-skeleton' className='customerCmt--seleketon' />}
                </SkeletonTheme>
            </div>
            <section className='customerCmt' style={{ display: loading ? 'none' : undefined }}>
                <div className='customerCmt__swiper'>
                    <Swiper {...params} className='customerCmt__swiper-inner'>
                        {comments &&
                            Object.values(comments)?.map((cmt, idx) => {
                                return (
                                    <SwiperSlide key={idx}>
                                        <div className='customerCmt__item'>
                                            <div className='customerCmt__img'>
                                                <img src={cmt.image} alt='' />
                                            </div>
                                            <div
                                                className={
                                                    loading ? 'customerCmt__info--sekeleton' : 'customerCmt__info'
                                                }
                                            >
                                                <h3>{cmt.name}</h3>
                                                <h4>{cmt.position}</h4>
                                                <div className='customerCmt__note'>{cmt.content}</div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                    </Swiper>
                </div>
            </section>
        </div>
    )
}
