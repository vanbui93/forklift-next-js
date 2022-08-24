import parse from 'html-react-parser'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { getPageDetail } from '../../store/actions/page'

export default function AboutUs(props) {
    const data = useSelector(state => state.page.data)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPageDetail())
    }, [])

    const aboutData = data !== null && data !== undefined && Object.values(data)?.find(page => page.slug === 'about-us')

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (data && Object.keys(data)?.length > 0) {
            setLoading(false)
        }
    }, [data])

    return (
        aboutData && (
            <div className='container'>
                <div className='aboutus'>
                    <h2 className='page-title'>{aboutData?.name}</h2>
                    <div className='aboutus__inner'>
                        <div
                            className='aboutus__img'
                            style={{
                                backgroundImage: `url(../../assets/img/@temp/aboutus.jpg)`,
                            }}
                        ></div>
                        <div className='aboutus__text'>
                            <div className='aboutus__text-inner'>
                                <div>{parse(aboutData?.content?.split('|||')[0])}</div>
                                <div className='btn_more'>
                                    <Link href='/page/about-us'>
                                        <a>— ดูเพิ่มเติม</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}
